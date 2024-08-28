from flask import Flask, json
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS
import os



app = Flask(__name__)
CORS(app)

sql = "sql"

#bcrypt = Bcrypt(app)


cwd = os.getcwd()

with open(f'{cwd}/config.json', 'r', encoding='utf-8') as f:
    jconfig = json.load(f)


app.config['SQLALCHEMY_DATABASE_URI'] = jconfig['db_link']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)