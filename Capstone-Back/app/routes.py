from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:Jerusalem_84@localhost/TRACKER'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):

    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    email_address = db.Column(db.String(30), nullable=False)
    userName = db.Column(db.String(18), nullable=False)
    userPassword = db.Column(db.String(22), nullable=False)

    __table_args__ = (
        CheckConstraint('LENGTH(userName) >= 7 AND LENGTH(userName) <= 18', name='username_length_check'),
        CheckConstraint('LENGTH(userPassword) >= 7 AND LENGTH(userPassword) <= 22', name='userpassword_length_check'),
    )

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
            "userid": user.userid,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.emailAdd
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    if invalid_email(data.get('emailAdd')):
        return jsonify({"error": "Invalid email address"}), 400
    
    new_user = User(
        firstname=data.get('firstname'),
        lastname=data.get('lastname'),
        emailAdd=data.get('emailAdd')
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