from flask import render_template, request

def init_app(app):

    @app.route('/')
    def home():

        return render_template('index.html',)

    @app.route('/menu')
    def menu():
        return render_template('menu.html',)

    @app.route('/loginPage')
    def loginPage():

        return render_template('login.html',)

    @app.route('/registerPage', methods=['GET', 'POST'])
    def registerPage():
        if request.method == 'POST':
            # Processar dados do formulário
            # (Aqui deve-se validar e salvar o usuário no banco de dados)

            # Exemplo de armazenamento temporário na sessão
            # Substitua pelo ID real
            session['new_user_id'] = "id_do_usuario_criado"

            return render_template('register.html', show_modal=True)

        return render_template('register.html')
    @app.route('/newPasswordPage')
    def newPasswordPage():

        return render_template('newPassword.html',)
    @app.route('/userPage')
    def userPage():
        return render_template('user.html',)
    @app.route('/sensorsPage')
    def sensorsPage():

        return render_template('sensors.html',)