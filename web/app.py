from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import secrets
from controllers import routes
from models.database import db

app = Flask(__name__, template_folder='views')
app.secret_key = secrets.token_hex(16)

# Configurações do banco de dados
DB_NAME = 'sparqbd'
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:@localhost/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa o SQLAlchemy com o app
db.init_app(app)

# Inicializa o LoginManager
login_manager = LoginManager()
login_manager.login_view = "loginPage"
login_manager.init_app(app)

# Função para carregar o usuário logado
from models.database import Usuario
@login_manager.user_loader
def load_user(user_id):
    return Usuario.query.get(int(user_id))

# Chamando as rotas
routes.init_app(app)

# Criação do banco de dados e tabelas
import pymysql
with app.app_context():
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            print(f"Banco de dados {DB_NAME} criado/verificado!")
    except Exception as e:
        print(f"Erro ao criar banco de dados: {e}")
    finally:
        connection.close()

    db.create_all()
    print("Tabelas criadas/verificadas!")

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)