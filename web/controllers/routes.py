from flask import render_template, request

def init_app(app):

    @app.route('/')
     
    def home():

        return render_template('index.html',)
       