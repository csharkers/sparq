from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, func
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    cpf = db.Column(db.String(14), nullable=False, unique=True)
    sexo = db.Column(Enum('masculino', 'feminino', 'outro', name='sexo'), nullable=False)
    parque = db.Column(db.Integer, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    cargo = db.Column(db.Integer, nullable=False)
    avatar = db.Column(db.String(200), nullable=False, server_default='avatar.png')
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=func.current_timestamp())

    def __init__(self, nome, email, cpf, sexo, parque, senha, cargo, avatar='avatar.png'):
        self.nome = nome
        self.email = email
        self.cpf = cpf
        self.sexo = sexo
        self.parque = parque
        self.senha = generate_password_hash(senha)  # Já faz o hash da senha
        self.cargo = cargo
        self.avatar = avatar

    def verify_password(self, senha):
        return check_password_hash(self.senha, senha)