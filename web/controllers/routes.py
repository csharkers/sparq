import os
from flask import render_template, request, session, current_app, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.utils import secure_filename
from models.database import db, Usuario
from controllers.sensorValues import dadosApi, mediaTemp, sensorInfo, mediaHumi, carbAlert

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_uploaded_file(file):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        upload_folder = os.path.join(current_app.root_path, 'static', 'uploads')
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
    @login_required
    def menu():
        return render_template('menu.html')

    @app.route("/loginPage", methods=["GET", "POST"])
    def loginPage():
        if request.method == "POST":
            email = request.form["email"]
            password = request.form["password"]

            usuario = Usuario.query.filter_by(email=email).first()

            if usuario and usuario.verify_password(password):
                if usuario.ativo:
                    login_user(usuario)
                    flash('Login realizado com sucesso!', 'success')
                    return redirect(url_for('menu'))
                else:
                    flash('Sua conta está desativada.', 'danger')
            else:
                flash('Email ou senha incorretos.', 'danger')

        return render_template("login.html")

    @app.route("/registerPage", methods=["GET", "POST"])
    def registerPage():
        if request.method == "POST":
            nome = request.form["nome"]
            email = request.form["email"]
            cpf = request.form["cpf"]
            sexo = request.form["sexo"]
            parque = int(request.form["parque"])
            senha = request.form["password"]
            cargo = int(request.form["cargo"])

            avatar_file = request.files.get('avatar')
            avatar = 'avatar.png'
            if avatar_file and avatar_file.filename:
                saved_filename = save_uploaded_file(avatar_file)
                if saved_filename:
                    avatar = saved_filename

            # Verificar se email ou CPF já existem
            if Usuario.query.filter_by(email=email).first():
                flash('Email já cadastrado', 'danger')
                return redirect(url_for('registerPage'))
            if Usuario.query.filter_by(cpf=cpf).first():
                flash('CPF já cadastrado', 'danger')
                return redirect(url_for('registerPage'))

            novo_usuario = Usuario(
                nome=nome,
                email=email,
                cpf=cpf,
                sexo=sexo,
                parque=parque,
                senha=senha,
                cargo=cargo,
                avatar=avatar,
                ativo=True
            )
            db.session.add(novo_usuario)
            db.session.commit()

            flash('Usuário registrado com sucesso! Faça login.', 'success')
            return redirect(url_for('loginPage'))

        return render_template("register.html")

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        flash('Você saiu do sistema.', 'info')
        return redirect(url_for('home'))

    @app.route('/newPasswordPage')
    def newPasswordPage():
        return render_template('newPassword.html')

    @app.route('/userPage')
    @app.route('/userPage/<int:page>')
    @login_required
    def userPage(page=1):
        if current_user.cargo != 1:
            flash('Acesso negado. Apenas administradores podem acessar esta página.', 'danger')
            return redirect(url_for('menu'))

        per_page = 5
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
    @login_required
    def toggle_usuario_status(id):
        if current_user.cargo != 1:
            flash('Acesso negado. Apenas administradores podem realizar esta ação.', 'danger')
            return redirect(url_for('menu'))

        usuario = Usuario.query.get(id)
        if usuario:
            try:
                usuario.ativo = not usuario.ativo
                db.session.commit()
                acao = "ativado" if usuario.ativo else "desativado"
                flash(f'Usuário {acao} com sucesso!', 'success')
            except Exception as e:
                db.session.rollback()
                flash(f'Erro ao alterar status do usuário: {str(e)}', 'danger')
        else:
            flash('Usuário não encontrado!', 'danger')

        page = request.args.get('page', 1, type=int)
        return redirect(url_for('userPage', page=page))

    @app.route('/editUser/<int:id>', methods=['GET'])
    @login_required
    def editUser(id):
        if current_user.cargo != 1:
            flash('Acesso negado. Apenas administradores podem acessar esta página.', 'danger')
            return redirect(url_for('menu'))

        usuario = Usuario.query.get(id)
        if not usuario:
            flash('Usuário não encontrado', 'danger')
            return redirect(url_for('userPage'))

        return render_template('editUser.html', usuario=usuario)

    @app.route('/updateUser/<int:id>', methods=['POST'])
    @login_required
    def updateUser(id):
        if current_user.cargo != 1:
            flash('Acesso negado. Apenas administradores podem realizar esta ação.', 'danger')
            return redirect(url_for('menu'))

        usuario = Usuario.query.get(id)
        if not usuario:
            flash('Usuário não encontrado', 'danger')
            return redirect(url_for('userPage'))

        try:
            usuario.nome = request.form.get('name')
            usuario.email = request.form.get('email')
            usuario.cpf = request.form.get('cpf')
            usuario.sexo = request.form.get('sexo')
            usuario.parque = int(request.form.get('parque'))
            usuario.cargo = int(request.form.get('cargo'))

            avatar_file = request.files.get('avatar')
            if avatar_file and avatar_file.filename:
                saved_filename = save_uploaded_file(avatar_file)
                if saved_filename:
                    usuario.avatar = saved_filename

            nova_senha = request.form.get('password')
            if nova_senha:
                usuario.senha = nova_senha  # texto puro

            db.session.commit()
            flash('Usuário atualizado com sucesso!', 'success')
            return redirect(url_for('userPage'))

        except Exception as e:
            db.session.rollback()
            flash(f'Erro ao atualizar usuário: {str(e)}', 'danger')
            return redirect(url_for('editUser', id=id))

    @app.route('/sensorsPage')
    @login_required
    def sensorsPage():
        dados = dadosApi()
        return render_template('sensors.html', dados=dados)

    @app.route('/service')
    @login_required
    def servicePage():
        dados = dadosApi()
        temp = mediaTemp()
        sensor = sensorInfo()
        humi = mediaHumi()
        carbRisc = carbAlert()

        return render_template('service.html',
                               dados=dados,
                               temp=temp,
                               sensor=sensor,
                               humi=humi,
                               carbRisc=carbRisc)
