from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import re
from models import User


app = Flask(__name__)
CORS(app)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:Jerusalem_84@localhost/TRACKER'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#db = SQLAlchemy(app)


# Create the table initially
with app.app_context():
    db.create_all()

def invalid_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return not re.match(pattern, email)

@app.route('/get_a_user/<int:userid>', methods=['GET'])
def get_a_user(userid):
    user = User.query.get(userid)
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

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    if invalid_email(data.get('emailAdd')):
        return jsonify({"error": "Invalid email address"}), 400
    
    new_user = User(
        user_fname=data.get('firstname'),
        user_mi=data.get('mi'),
        user_lname=data.get('lastname'),
        emailAdd=data.get('emailAdd'),
        
    )
    try:
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User successfully added!"}), 201
    except Exception as e:
        db.session.rollback()


@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_list = [{
            "userid": user.userid,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "emailAdd": user.emailAdd
        } for user in users]
        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/routes', methods=['GET'])
def get_routes():
    return jsonify({rule.rule: rule.endpoint for rule in app.url_map.iter_rules()})

if __name__ == '__main__':
    app.run(port=5000)