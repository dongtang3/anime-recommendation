from flask import Flask, request
from flask_restful import Api
from flask_login import LoginManager, login_user, login_required, logout_user, current_user

from entity.User import User

app = Flask(__name__)
api = Api(app)

login_manager = LoginManager()
# login_manager.login_view = 'login'
login_manager.login_view = "users.login"

login_manager.init_app(app)


@app.route('/')
def index():
    return "Welcome to the Anime Recommendation System!"



users = {'username1': {'password': 'hashed_password', 'id': 1}}
@login_manager.user_loader
def load_user(user_id):
    return User(user_id, 'username1', 'hashed_password')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user_data = users.get(username)

        # Create an instance of the User class
        if user_data:
            # Correcting the argument name to match the User class definition
            # user = User(id=user_data['id'], username=username, password=user_data['password'])
            #
            # # Since you mentioned you want a fake login, we don't need to verify
            # login_user(user)
            return "Logged in successfully!"

    return '''
    <form method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username"><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password"><br><br>

        <input type="submit" value="Login">
    </form>
    '''


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return "Logged out!"


if __name__ == "__main__":
    app.run(debug=True)
