from flask import Flask
import secrets
from controllers import routes
import pymysql
from models.database import db  # Importação adicionada

app = Flask(__name__, template_folder='views')
app.secret_key = secrets.token_hex(16)  # Chave secreta para sessões

# Configurações do banco de dados
DB_NAME = 'sparqbd'
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:@localhost/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa o SQLAlchemy com o app
db.init_app(app)

# Chamando as rotas
routes.init_app(app)

# Criação do banco de dados e tabelas
with app.app_context():
    # Verifica e cria o banco se não existir
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
    
    # Cria todas as tabelas definidas nos modelos
    db.create_all()
    print("Tabelas criadas/verificadas!")

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)