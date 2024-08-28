from flask import Flask, json, jsonify, session, request, redirect, url_for
#from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_sqlalchemy import SQLAlchemy
#from flask_jwt_extended import JWTManager, create_access_token, jwt_required
#from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
#from models import  Users


app = Flask(__name__)
CORS(app)

sql = "sql"

#bcrypt = Bcrypt(app)


cwd = os.getcwd()

with open(f'{cwd}/config.json', 'r', encoding='utf-8') as f:
    jconfig = json.load(f)

# Configuration
# app.config['SECRET_KEY'] = jconfig['secretkey']
# app.config["JWT_SECRET_KEY"] = jconfig['jwtsecretkey']
# app.config['JWT_TOKEN_LOCATION'] = ['headers']

app.config['SQLALCHEMY_DATABASE_URI'] = jconfig['db_link']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
#jwt = JWTManager(app)



    

# if __name__ == "__main__":
#     with app.app_context():
#         app.run(debug=True)