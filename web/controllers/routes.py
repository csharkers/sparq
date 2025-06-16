import os
from flask import render_template, request, session, current_app, redirect, url_for, flash
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from models.database import db, Usuario
import hashlib

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_uploaded_file(file):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        upload_folder = os.path.join(
            current_app.root_path, 'static', 'uploads')

        # Cria o diretório se não existir
        os.makedirs(upload_folder, exist_ok=True)

        filepath = os.path.join(upload_folder, filename)
        file.save(filepath)
        return filename
    return None


def init_app(app):
    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/menu')
    def menu():
        return render_template('menu.html')

    @app.route('/loginPage')
    def loginPage():
        return render_template('login.html')

    @app.route('/registerPage', methods=['GET', 'POST'])
    def registerPage():
        if request.method == 'POST':
            # Obter dados do formulário
            nome = request.form.get('name')
            email = request.form.get('email')
            cpf = request.form.get('cpf')
            sexo = request.form.get('sexo')
            parque = int(request.form.get('parque'))
            cargo = int(request.form.get('cargo'))
            senha = request.form.get('password')

            # Processar upload da imagem
            avatar_file = request.files.get('avatar')
            avatar = 'avatar.png'  # Valor padrão
            if Usuario.query.filter_by(email=email).first():
                flash('Email já cadastrado', 'danger')
                return redirect(url_for('registerPage'))

            if Usuario.query.filter_by(cpf=cpf).first():
                flash('CPF já cadastrado', 'danger')
                return redirect(url_for('registerPage'))
            
            if avatar_file and avatar_file.filename:
                saved_filename = save_uploaded_file(avatar_file)
                if saved_filename:
                    avatar = saved_filename

            try:
                # Criar hash da senha
                senha_hash = generate_password_hash(senha)

                # Criar novo usuário
                novo_usuario = Usuario(
                    nome=nome,
                    email=email,
                    cpf=cpf,
                    sexo=sexo,
                    parque=parque,
                    senha=senha_hash,
                    cargo=cargo,
                    avatar=avatar
                )
                # Adicionar ao banco de dados
                db.session.add(novo_usuario)
                db.session.commit()

                flash('Usuário registrado com sucesso!', 'success')
                return redirect(url_for('userPage'))  # Alterado para redirecionar para userPage

            except Exception as e:
                db.session.rollback()
                flash(f'Erro ao registrar usuário: {str(e)}', 'danger')
                return render_template('register.html', show_modal=True)

        return render_template('register.html')

    @app.route('/newPasswordPage')
    def newPasswordPage():
        return render_template('newPassword.html')


    @app.route('/userPage')
    @app.route('/userPage/<int:page>')
    def userPage(page=1):
        per_page = 10  # Usuários por página
        usuarios_paginados = Usuario.query.paginate(page=page, per_page=per_page, error_out=False)
        
        usuarios_formatados = []
        for usuario in usuarios_paginados.items:
            usuarios_formatados.append({
                'id': usuario.id_usuario,
                'nome': usuario.nome,
                'cpf': usuario.cpf,
                'email': usuario.email,
                'sexo': usuario.sexo,
                'avatar': usuario.avatar,
                'cargo': usuario.cargo  # Adicionei o cargo para exibição
            })
        
        return render_template('user.html', 
                            usuarios=usuarios_formatados,
                            pagination=usuarios_paginados)

    @app.route('/sensorsPage')
    def sensorsPage():
        return render_template('sensors.html')
