from flask import Flask, jsonify, session, request, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_bcrypt import Bcrypt
from models import User

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'your_strong_secret_key'
app.config["JWT_SECRET_KEY"] = 'your_jwt_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://webuser:IceCream*8@127.0.0.1:3306/tzedaka_tracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)

    
@app.route('/get_name', methods=['GET'])
@jwt_required()
def get_name():
  # Extract the user ID from the JWT
  user_id = get_jwt_identity()
  print('line 41 user_id',user_id)
  user = User.query.filter_by(id=user_id).first()
  
  # Check if user exists
  if user:
    return jsonify({'message': 'User found', 'name': user.name})
  else:
    return jsonify({'message': 'User not found'}), 404

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    useremail = data['useremail']
    password = data['password']
    print('line 53 Received data:', useremail , password)

    user = User.query.filter_by(user_email=useremail).first()
    print('line 56 user:', user.user_pswd,":password:",password)
    print('line 57 user', user)
    is_valid = (user.user_pswd == password) and (user.user_email == useremail)
    
    if is_valid:
        access_token = create_access_token(identity=user.user_id)
        print('access token', access_token)
        return jsonify({'message': 'Login Success', 'access_token': access_token})
    else:
        return jsonify({'message': 'Login Failed'}), 401

if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)