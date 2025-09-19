from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, func
from flask_login import UserMixin

db = SQLAlchemy()

class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    cpf = db.Column(db.String(14), nullable=False, unique=True)
    sexo = db.Column(Enum('masculino', 'feminino', 'outro', name='sexo'), nullable=False)
    parque = db.Column(db.Integer, nullable=False)
    senha = db.Column(db.String(255), nullable=False)  # texto puro
    cargo = db.Column(db.Integer, nullable=False)
    avatar = db.Column(db.String(200), nullable=False, server_default='avatar.png')
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=func.current_timestamp())
    ativo = db.Column(db.Boolean, nullable=False, default=True)

    def get_id(self):
        return str(self.id_usuario)

    def __init__(self, nome, email, cpf, sexo, parque, senha, cargo, avatar='avatar.png', ativo=True):
        self.nome = nome
        self.email = email
        self.cpf = cpf
        self.sexo = sexo
        self.parque = parque
        self.senha = senha  
        self.cargo = cargo
        self.avatar = avatar
        self.ativo = ativo

    def verify_password(self, senha):
        return self.senha == senha

    def cargo_nome(self):
        cargos = {
            1: "Administrador",
            2: "Suporte", 
            3: "Funcionário"
        }
        return cargos.get(self.cargo, "Desconhecido")

    def parque_nome(self):
        parques = {
            1: "Parque 1",
            2: "Parque 2"
        }
        return parques.get(self.parque, "Desconhecido")

    def status_ativo(self):
        return "Ativo" if self.ativo else "Inativo"
    
    def is_active(self):
        return self.ativo
