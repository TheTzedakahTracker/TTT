from flask import Flask, json, jsonify, session, request, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_bcrypt import Bcrypt
from models import  Users
from config import app, jconfig

sql = "sql"

bcrypt = Bcrypt(app)


# Configuration
app.config['SECRET_KEY'] = jconfig['secretkey']
app.config["JWT_SECRET_KEY"] = jconfig['jwtsecretkey']
app.config['JWT_TOKEN_LOCATION'] = ['headers']

jwt = JWTManager(app)



    
@app.route('/get_name', methods=['GET'])
@jwt_required()
def get_name():
  # Extract the user ID from the JWT
  user_id = get_jwt_identity()
  user = Users.query.filter_by(id=user_id).first()
  
  # Check if user exists
  if user:
    return jsonify({'message': 'User found', 'name': user.name})
  else:
    return jsonify({'message': 'User not found'}), 404

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    print('line 53 Received data:', email , password)

    user = Users.query.filter_by(user_email=email).first()
    is_valid = (user.user_pswd == password) and (user.user_email == email)
    
    if is_valid:
        access_token = create_access_token(identity=user.user_id)
        return jsonify({'message': 'Login Success', 'access_token': access_token})
    else:
        return jsonify({'message': 'Login Failed'}), 401

if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)