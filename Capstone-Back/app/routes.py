from flask import request, jsonify

from sqlalchemy import func

from config import app, jconfig
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from models import  db, Users, Donations, AppliedFundsDonation, Organizations, UserFunds, UsersOrgPref
import logging, re, datetime

#for login
bcrypt = Bcrypt(app)
# Configuration
app.config['SECRET_KEY'] = jconfig['secretkey']
app.config["JWT_SECRET_KEY"] = jconfig['jwtsecretkey']
app.config['JWT_TOKEN_LOCATION'] = ['headers']

jwt = JWTManager(app)

logging.basicConfig(level=logging.DEBUG)
# Create the table initially
#with app.app_context():
    #db.create_all()
 
@app.route('/login', methods=['POST'])
def login():
    logging.info('in login')
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = Users.query.filter_by(user_email=email).first()
    is_valid = (user.user_pswd == password) and (user.user_email == email)
    
    if is_valid:
        access_token = create_access_token(identity=user.user_id)
        return jsonify({'message': 'Login Success', 'id': user.user_id, 'name': user.user_fname + ' ' + user.user_lname, 'access_token': access_token})
    else:
        return jsonify({'message': 'Login Failed'}), 401
    
#function that checks if an email entry is valid
def invalid_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return not re.match(pattern, email)

#function that checks if its a proper date
def is_date(date):
    if isinstance(date, str):
        try:
            #The first "datetime" refers to the module itself, while the second "datetime" is the class within the module that allows you to work with dates and times in Python
            datetime.datetime.strptime(date, '%m/%d/%Y')
            return True
        except ValueError:
            return False
    else:
        return False

#get total funds for a user
def funds_available (userid):
    return float(db.session.query(func.sum(UserFunds.uf_amount)).filter(UserFunds.user_id == userid).scalar() or 0)

#get total dinations for a user
def total_donations(userid):
    return float(db.session.query(func.sum(Donations.donation_amt)).filter(Donations.user_id == userid).scalar() or 0)
    
#function to check if email is in the database
def check_if_email_exists(email):
    user = Users.query.filter_by(user_email=email).first()
    if user:
        return True
    else:
        return False

 #route to get user info   
@app.route('/get_a_user/<int:userid>', methods=['GET'])
def get_a_user(userid):
    user = Users.query.get(userid)
    if user:
        return jsonify({
            "userid": user.user_id,
            "firstname": user.user_fname,
            "lastname": user.user_lname,
            "mi": user.user_mi,
            "img_link":user.user_img_link,
            "email": user.user_email,
            "ai":user.user_use_ai
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/get_profile/<int:userid>', methods=['GET'])
def get_profile(userid):
    user = Users.query.get(userid)
    if user:
        fundsavailable = (funds_available(user.user_id)-total_donations(user.user_id))

        #fundsavailable = 200.52
        return jsonify({
            "userid": user.user_id,
            "firstname": user.user_fname,
            "lastname": user.user_lname,
            "mi": user.user_mi,
            "availablefunds": fundsavailable
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404

#route to add new user
@app.route('/add_user', methods=['POST'])
def add_user():
    data = None
    try:
        data = request.get_json()
    except Exception as e:
        return ('there is erro:')

    if invalid_email(data.get('email')):
        return jsonify({"error": "Invalid email address"}), 400
    if check_if_email_exists(data.get('email')):
        return jsonify({"error": "Email address already exists"}), 400
    
    if not isinstance(data.get('firstName'), str):
        return jsonify({'error': 'Invalid first name'}), 400
    #if not isinstance(data.get('mi'), str):
        #return jsonify({'error': 'Invalid mid'}), 400
    if not isinstance(data.get('lastName'), str):
        return jsonify({'error': 'Invalid last name'}), 400
    if not isinstance(data.get('password'), str):
        return jsonify({'error': 'password'}), 400
    if not isinstance(data.get('aiAccepted'), bool):
        return jsonify({'error': 'ai_tag'}), 400

    new_user = Users(
        user_fname=data.get('firstName').strip(),
        #user_mi=data.get('mi').strip(),
        user_lname=data.get('lastName').strip(),
        user_email=data.get('email').strip(),
        user_pswd=data.get('password').strip(),
        #user_img_link=data.get('user_img'),
        user_use_ai=data.get('aiAccepted')        
    )
    try:
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User successfully added!"}), 201
    except Exception as e:
        db.session.rollback()
        #app.logger.info(e)
        return jsonify({"message": "issue adding user!"})


@app.route('/get_all_funds/<int:userid>', methods= ['GET'])
def get_total_funds_for_a_user(userid):
    return jsonify({db.session.query(func.sum(UserFunds.uf_amount)).filter(UserFunds.user_id == userid).scalar()})

#donation route and function
@app.route('/donate', methods=['POST'])
def donate():
    data = request.get_json()
    thisDonation = Donations()
    
    if isinstance(data.get('userid'), int) or data.get('userid').isdigit():
        thisDonation.user_id = int(data.get('userid'))
    else:
        return jsonify({'error': 'Invalid userid'}), 400
    if isinstance(data.get('orgid'), int) or data.get('orgid').isdigit():
        thisDonation.org_id = int(data.get('orgid'))
    else:
        return jsonify({'error': 'Invalid organizationid'}), 400

        
    if isinstance(data.get('amount'), int) or isinstance(data.get('amount'), float) or data.get('amount').replace('.', '', 1).isdigit():
        thisDonation.donation_amt = float(data.get('amount'))
    else:
        return jsonify({'error': 'Invalid Amount'}), 400
    if isinstance(data.get('note'), str):
        thisDonation.donation_sh_note = data.get('note')  
    
    
    if is_date(data.get('dDate')):
        thisDonation.donation_date = datetime.datetime.strptime(data.get('dDate'), '%m/%d/%Y').date()
    else:
        thisDonation.donation_date = datetime.datetime.now().date()
        
    #check if there are funds available for this transaction
    # funds_available = db.session.query(func.sum(UserFunds.uf_amount)).filter(UserFunds.user_id == thisDonation.user_id).scalar() 
    # total_donations = db.session.query(func.sum(Donations.donation_amt)).filter(Donations.user_id == thisDonation.user_id).scalar()   
    logging.info(thisDonation.donation_amt)
    logging.info(total_donations(thisDonation.user_id))
    logging.info(funds_available(thisDonation.user_id))
    # if(thisDonation.donation_amt + total_donations(thisDonation.user_id) > funds_available(thisDonation.user_id)):
    #     return jsonify({'Not enough funds available to make this donation'})
    if(thisDonation.donation_amt + total_donations(thisDonation.user_id) > funds_available(thisDonation.user_id)):
        return jsonify({"message": "Not enough funds available to make this donation"})

    #insert into donation table
    try:
        db.session.add(thisDonation)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "error adding organization data"})
    
    
    if (data.get('fund_id')):
        thisafd = AppliedFundsDonation(
            donation_id = thisDonation.donation_id,
            uf_id = data.get('fundid')
        )
        
        #insert into applied_funds_donation table - apply this donation to a specific fund entry
        try:
            db.session.add(thisafd)
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({"error": "adding org to fund"})
    return jsonify({"message": "Donation Successfully added"})
@app.route('/add_organization', methods=['POST'])
def add_organization():
    logging.info('in org func')
    data = None
    try:
         data = request.get_json()
    except Exception as e:
         return ('there is error in adding org:')
    
    if not isinstance(data.get('oName'),str) or len(data.get('oName')) < 0:
         return jsonify({'error': 'organization name invalid'})
    if not isinstance(data.get('oDesc'),str):
        return jsonify({'error': 'description invalid'})
    
    new_org = Organizations(
         org_name = data.get('oName'),
         org_description = data.get('oDesc')   
     )
    if isinstance(data.get('oZip'),str):
         new_org.org_zip = data.get('oZip')
    if isinstance(data.get('oCategory'),str):
         new_org.org_category = data.get('oCategory')
    
    try:
        db.session.add(new_org)
        db.session.commit()
        logging.info(new_org.org_id)
    except Exception as e:
        db.session.rollback()
        return("error: ", e)
    # # if you want to assosiate this organization with a specific user
    
    if 'userid' in data:
        thispref = UsersOrgPref(
        user_id = data.get('userid'),
        org_id = new_org.org_id
       )
        try:
            db.session.add(thispref)
            db.session.commit()
        except Exception as e:
            db.rollback()
            return jsonify({"error": "issue adding organization preference"})

    return jsonify({'message':'organization added'})
                
@app.route('/add_funds', methods=['POST'])          
def add_userfunds():
    data = None
    new_funds = UserFunds()
    try:
         data = request.get_json()
    except Exception as e:
         return ('there is error in adding funds:')   
    logging.info('got here1')
    if isinstance(data.get('userid'), int) or data.get('userid').isdigit():
        new_funds.user_id = int(data.get('userid'))
    else:
        return jsonify({'error': 'Invalid userid'}), 400
    if isinstance(data.get('fAmount'), int) or isinstance(data.get('amount'), float) or data.get('fAmount').replace('.', '', 1).isdigit():
        new_funds.uf_amount = float(data.get('fAmount'))
    else:
        return jsonify({'error': 'Invalid Amount'}), 400
    if isinstance(data.get('fDesc'), str):
        new_funds.uf_description = data.get('fDesc')
    else:
        return jsonify({'error':'Invalid Description'})
    logging.info('got here2')
    
    if (is_date(data.get('fDate'))):
        new_funds.uf_date_added = datetime.datetime.strptime(data.get('fDate'), '%m/%d/%Y').date()
    else:
        new_funds.uf_date_added = datetime.datetime.now().date()
    logging.info('got here3')
    try:
        db.session.add(new_funds)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
    return jsonify({'message':'funds added'})

#route to get organizations
@app.route('/get__all_organizations/<int:userid>', methods= ['GET'])
def get_organization_list(userid):
    try:
        result = (
            db.session.query(
                Organizations.org_id,
                Organizations.org_name,
                UsersOrgPref.user_org_id,
                UsersOrgPref.user_id
            )
            .outerjoin(UsersOrgPref, Organizations.org_id == UsersOrgPref.org_id)
            .filter(
                (UsersOrgPref.user_id == userid) | (UsersOrgPref.user_org_id == None)
            )
            .all()
        )
        
        # Converting the result to a list of dictionaries
        result_list = []
        for row in result:
            result_list.append({
                'org_id': row[0],
                'org_name': row[1],
                'user_org_id': row[2],
                'user_id': row[3],
            })
        
        return jsonify(result_list)
    except Exception as e:
        return jsonify({'error':' getting data for oganizations'})
#@app.route('/get__donations/<int:userid>', methods= ['GET'])
#def get_organization_list(userid):    
    #user_id = request.args.get('user_id')
    # organization = request.args.get('organization')
    # start_date = request.args.get('startDate')
    # end_date = request.args.get('endDate')
    # try:
    #      users = Users.query.all()
    #      users_list = [{
    #          "userid": user.userid,
    #          "firstname": user.firstname,
    #          "lastname": user.lastname,
    #          "emailAdd": user.emailAdd
    #      } for user in users]
    #      return jsonify(users_list), 200
    # except Exception as e:
    #      return jsonify({"error": str(e)}), 500


@app.route('/routes', methods=['GET'])
def get_routes():
    return jsonify({rule.rule: rule.endpoint for rule in app.url_map.iter_rules()})

if __name__ == '__main__':
    app.run(debug=True)