from flask import render_template, request

def init_app(app):

    @app.route('/')
     
    def home():

        return render_template('index.html',)
    
<<<<<<< HEAD
    @app.route('/menu')
    def menu():

        return render_template('menu.html',)
=======
    @app.route('/loginPage')
    def loginPage():

        return render_template('login.html',)
>>>>>>> feature/login-page
       