import os
from flask import render_template, request, session, current_app, redirect, url_for, flash
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from models.database import db, Usuario
from controllers.sensorValues import dadosApi , mediaTemp, sensorInfo, mediaHumi, carbAlert
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
                    avatar=avatar,
                    ativo=True
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
        per_page = 5  # Itens por página
        
        # Adicione ordenação para consistência
        usuarios_paginados = Usuario.query.order_by(Usuario.nome.asc()).paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        usuarios_formatados = []
        for usuario in usuarios_paginados.items:
            usuarios_formatados.append({
                'id': usuario.id_usuario,
                'nome': usuario.nome,
                'cpf': usuario.cpf,
                'email': usuario.email,
                'sexo': usuario.sexo,
                'avatar': usuario.avatar,
                'cargo': usuario.cargo_nome(),
                'parque': usuario.parque_nome(),
                'ativo': usuario.status_ativo(),  
                'ativo_bool': usuario.ativo
            })
        
        return render_template('user.html', 
                            usuarios=usuarios_formatados,
                            pagination=usuarios_paginados)

    @app.route('/toggle_usuario_status/<int:id>', methods=['POST'])
    def toggle_usuario_status(id):
        usuario = Usuario.query.get(id)
        if usuario:
            try:
                # Inverte o status atual
                usuario.ativo = not usuario.ativo
                db.session.commit()
                
                acao = "ativado" if usuario.ativo else "desativado"
                flash(f'Usuário {acao} com sucesso!', 'success')
            except Exception as e:
                db.session.rollback()
                flash(f'Erro ao alterar status do usuário: {str(e)}', 'danger')
        else:
            flash('Usuário não encontrado!', 'danger')
        
        # Redireciona de volta para a página de usuários mantendo a paginação
        page = request.args.get('page', 1, type=int)
        return redirect(url_for('userPage', page=page))
    @app.route('/editUser/<int:id>', methods=['GET'])
    def editUser(id):
        usuario = Usuario.query.get(id)
        if not usuario:
            flash('Usuário não encontrado', 'danger')
            return redirect(url_for('userPage'))
        
        # Passe o usuário para o template de edição
        return render_template('editUser.html', usuario=usuario)

    @app.route('/updateUser/<int:id>', methods=['POST'])
    def updateUser(id):
        usuario = Usuario.query.get(id)
        if not usuario:
            flash('Usuário não encontrado', 'danger')
            return redirect(url_for('userPage'))
        
        try:
            # Obter dados do formulário
            usuario.nome = request.form.get('name')
            usuario.email = request.form.get('email')
            usuario.cpf = request.form.get('cpf')
            usuario.sexo = request.form.get('sexo')
            usuario.parque = int(request.form.get('parque'))
            usuario.cargo = int(request.form.get('cargo'))
            
            # Processar upload da imagem (se houver)
            avatar_file = request.files.get('avatar')
            if avatar_file and avatar_file.filename:
                saved_filename = save_uploaded_file(avatar_file)
                if saved_filename:
                    usuario.avatar = saved_filename
            
            # Atualizar senha (se fornecida)
            nova_senha = request.form.get('password')
            if nova_senha:
                usuario.senha = generate_password_hash(nova_senha)
            
            db.session.commit()
            flash('Usuário atualizado com sucesso!', 'success')
            return redirect(url_for('userPage'))
        
        except Exception as e:
            db.session.rollback()
            flash(f'Erro ao atualizar usuário: {str(e)}', 'danger')
            return redirect(url_for('editUser', id=id))
    
    @app.route('/sensorsPage')
    def sensorsPage():
        dados = dadosApi()
        
        return render_template('sensors.html', dados=dados)
    @app.route('/service', methods=['GET', 'POST'])
    def servicePage():

        dados = dadosApi()
        temp = mediaTemp()
        sensor = sensorInfo()
        humi = mediaHumi()
        carbRisc = carbAlert()
        
        return render_template('service.html',
                               dados=dados,
                               temp = temp, 
                               sensor = sensor,
                               humi = humi,
                               carbRisc = carbRisc)
    @app.route('/mapPage')
    def mapPage():
        return render_template('map.html')