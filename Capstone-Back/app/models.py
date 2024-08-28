from auth import db

class Users(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    user_fname = db.Column(db.String(50), nullable=False)
    user_lname = db.Column(db.String(50), nullable=False)
    user_mi = db.Column(db.String(10))
    user_img_link =  db.Column(db.String(100))
    user_email = db.Column(db.String(100), unique=True, nullable=False)
    user_pswd  = db.Column(db.String(100), nullable=False)
    user_isactive = db.Column(db.Boolean(), default=True)
    user_use_ai = db.Column(db.Boolean(), default=False)

    
    def __repr__(self):
        return f'<User {self.user_email}>'
    
    
class Organizations(db.Model):
    __tablename__ = 'organizations'
    
    org_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    org_name = db.Column(db.String(100), nullable=False)
    org_description = db.Column(db.String(255), nullable=False)
    org_zip = db.Column(db.String(20))
    org_category = db.Column(db.String(30))
    
    
class UsersOrgPref(db.Model):
    __tablename__ = 'users_org_pref'

    user_org_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.org_id'), nullable=False)

class UserFunds(db.Model):
    __tablename__ = 'user_funds'
    
    uf_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    uf_description = db.Column(db.String(255))
    uf_amount = db.Column(db.Numeric)
    uf_date_added = db.Column(db.Date)

class Donations(db.Model):
    __tablename__ = 'donations'
    
    donation_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    donation_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.org_id'), nullable=False)
    donation_amt = db.Column(db.Numeric, nullable=False)
    donation_sh_note = db.Column(db.String(255))

class AppliedFundsDonation(db.Model):
    __tablename__ = 'applied_funds_donation'

    afd_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    donation_id = db.Column(db.Integer, db.ForeignKey('donations.donation_id'), nullable=False)
    uf_id = db.Column(db.Integer, db.ForeignKey('user_funds.uf_id'), nullable=False)