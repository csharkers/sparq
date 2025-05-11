from flask import Flask

from controllers import routes

app = Flask(__name__, template_folder="views")

app.secret_key = 'sua_chave_secreta' # Mudar o mais cedo possível

routes.init_app(app)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
