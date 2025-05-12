from flask import Flask
import secrets
from controllers import routes

app = Flask(__name__, template_folder="views")

app.secret_key = secrets.token_urlsafe(16)  # gera ~22 caracteres seguros para URLs

routes.init_app(app)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
