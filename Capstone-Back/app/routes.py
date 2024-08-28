from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_cors import CORS
import re
import datetime
from auth import db, app
# Correct import path if 'models.py' is in the 'app' package
from models import  Users, Donations, AppliedFundsDonation, Organizations, UserFunds, UsersOrgPref
import logging
# from flask_bcrypt import Bcrypt


# app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:Jerusalem_84@localhost/tzedaka_tracker'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://webuser:IceCream*8@localhost/tzedaka_tracker'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#db = SQLAlchemy(app)

logging.basicConfig(level=logging.DEBUG)
# Create the table initially
#with app.app_context():
    #db.create_all()
#function that checks if an email entry is valid
def invalid_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return not re.match(pattern, email)

#function that checks if its a proper date
def is_date(date):
    try:
        #The first "datetime" refers to the module itself, while the second "datetime" is the class within the module that allows you to work with dates and times in Python
        datetime.datetime.strptime(date, '%m-%d-%Y')
        return True
    except ValueError:
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
    
    if not isinstance(data.get('firstName'), str):
        return jsonify({'error': 'Invalid first name'}), 400
    # if not isinstance(data.get('mi'), str):
    #     return jsonify({'error': 'Invalid mid'}), 400
    if not isinstance(data.get('lastName'), str):
        return jsonify({'error': 'Invalid last name'}), 400
    if not isinstance(data.get('password'), str):
        return jsonify({'error': 'pass'}), 400
    #if not isinstance(data.get('ai'), bool):
        #return jsonify({'error': 'ai_tag'}), 400
    ai_accepted = data.get('aiAccepted', False)


    new_user = Users(
        user_fname=data.get('firstName'),
        # user_mi=data.get('mi'),
        user_lname=data.get('lastName'),
        user_email=data.get('email'),
        user_pswd=data.get('password'),
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
    
    
    if not isinstance(data.get('userid'), int):
        return jsonify({'error': 'Invalid userid'}), 400
    if not isinstance(data.get('orgid'), int):
        return jsonify({'error': 'Invalid organizationid'}), 400
    if not isinstance(data.get('amount'), float):
        return jsonify({'error': 'Invalid Amount'}), 400
    if not isinstance(data.get('note'), str):
        return jsonify({'error': 'Invalid Note'}), 400
    
    thisDonation = Donations(
        user_id = data.get('userid'),
        org_id = data.get('orgid'),
        donation_amt = data.get('amount'),
        donation_sh_note = data.get('note')        
    )
    
    if is_date(data.get('date')):
        thisDonation.donation_date = datetime.strptime(data.get('date'), '%m-%d-%Y').date()
        
    #check if there are funds available for this transaction
    funds_available = db.session.query(func.sum(UserFunds.uf_amount)).filter(UserFunds.user_id == thisDonation.user_id).scalar() 
    total_donations = db.session.query(func.sum(Donations.donation_amt)).filter(Donations.user_id == thisDonation.user_id).scalar()   
    if(thisDonation.donation_amt + total_donations > funds_available):
        return jsonify({'Not enough funds available to make this donation'})
    
    #insert into donation table
    try:
        db.session.add(thisDonation)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify("error: error adding organization data")
    
    
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
        return jsonify({"error: adding org to fund"})
    
@app.route('/add_organization', methods=['POST'])
def add_organization():
    logging.info('in org func')
    data = None
    try:
        data = request.get_json()
    except Exception as e:
        return ('there is erroi in adding org:')
    if not isinstance(data.get('oName'),str) or len(data.get('oName')) > 0:
        return jsonify({'error: organization name invalid'})
    if not isinstance(data.get('oDesc'),str):
        return jsonify({'error: description invalid'})
    
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
        logging.info("idid:" + new_org.org_id)
    except Exception as e:
        db.session.rollback()
        return("error: ", e)
    #if you want to assosiate this organization with a specific user
    if data.hasOwnProperty('userid'):
        thispref = UsersOrgPref(
            user_id = data.get('userid'),
            org_id = new_org.org_id
        )
        try:
            db.session.add(thispref)
            db.session.commit()
        except Exception as e:
            db.rollback()
            return jsonify({"error: issue adding organization preference"})
                
@app.route('/add_funds', methods=['POST'])          
def add_userfunds():
    data = request.json()    
    
    if not isinstance(data.get('userid'), int):
        return jsonify({'Invalid user'})
    if not isinstance(data.get('fAmount'), float):
        return jsonify({'Invalid fund amount'})
    if not isinstance(data.get('fDesc'), str):
        return jsonify({'Invalid Description'})
    
    new_funds = UserFunds(
        user_id = data.get('userid'),
        uf_description = data.get('fDesc'),
        uf_amount = data.get('fAmount')        
    )
    if is_date(data.get('fDdate')):
        new_funds.uf_date_added = datetime.strptime(data.get('fDate'), '%m-%d-%Y').date()
          
    try:
        db.session.add(new_funds)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
    
    # try:
    #     users = User.query.all()
    #     users_list = [{
    #         "userid": user.userid,
    #         "firstname": user.firstname,
    #         "lastname": user.lastname,
    #         "emailAdd": user.emailAdd
    #     } for user in users]
    #     return jsonify(users_list), 200
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500

@app.route('/get_routes', methods=['GET'])
def get_routes():
    return jsonify({rule.rule: rule.endpoint for rule in app.url_map.iter_rules()})

if __name__ == '__main__':
    app.run(debug=True)