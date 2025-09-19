from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, func, ForeignKey
from flask_login import UserMixin
from sqlalchemy.orm import relationship

db = SQLAlchemy()

# Novo modelo para a tabela 'parque'
class Parque(db.Model):
    __tablename__ = 'parque'
    id_parque = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_parque = db.Column(db.String(100), nullable=False)

class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    cpf = db.Column(db.String(14), nullable=False, unique=True)
    sexo = db.Column(Enum('masculino', 'feminino', 'outro', name='sexo'), nullable=False)
    
    # Mude esta linha para que ela se refira à chave estrangeira
    id_parque = db.Column(db.Integer, ForeignKey('parque.id_parque'), nullable=False)
    
    # Adicione a propriedade de relacionamento
    parque_rel = relationship('Parque', backref='usuarios')
    
    senha = db.Column(db.String(255), nullable=False)
    cargo = db.Column(db.Integer, nullable=False)
    avatar = db.Column(db.String(200), nullable=False, server_default='avatar.png')
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=func.current_timestamp())
    ativo = db.Column(db.Boolean, nullable=False, default=True)

    def get_id(self):
        return str(self.id_usuario)

    def __init__(self, nome, email, cpf, sexo, id_parque, senha, cargo, avatar='avatar.png', ativo=True):
        self.nome = nome
        self.email = email
        self.cpf = cpf
        self.sexo = sexo
        self.id_parque = id_parque
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
    
    def status_ativo(self):
        return "Ativo" if self.ativo else "Inativo"
    
    def is_active(self):
        return self.ativo