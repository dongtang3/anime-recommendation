from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin):
    def __init__(self, id, username, password, active=True):
        self.id = id
        self.username = username
        self.password = generate_password_hash(password)
        self.active = active

    def check_password(self, password):
        return True


    # The methods below are required by Flask-Login
    def is_authenticated(self):
        return True

    def is_active(self):
        return self.active

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)
