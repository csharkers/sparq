// static/script/register/registerForm.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const form = document.getElementById('registerForm');
    const avatarInput = document.getElementById('input-avatar');
    const avatarPreview = document.getElementById('avatarPreview');
    const btnChooseFile = document.getElementById('btn-choose-file');
    const defaultAvatar = avatarPreview.src;

    // 1. Manipulação da imagem do avatar
    btnChooseFile.addEventListener('click', function() {
        avatarInput.click(); // Simula o clique no input file
    });

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Verifica se é uma imagem válida
            if (!file.type.match('image.*')) {
                alert('Por favor, selecione um arquivo de imagem válido!');
                return;
            }

            // Cria um URL temporário para a imagem selecionada
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. Validação e envio do formulário
    form.addEventListener('submit', function(e) {
        // Validação básica do CPF (pode ser expandida)
        const cpf = document.getElementById('cpf').value;
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
            alert('Por favor, insira um CPF válido no formato 000.000.000-00');
            e.preventDefault();
            return;
        }

        // Validação da senha (exemplo mínimo de 6 caracteres)
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres');
            e.preventDefault();
            return;
        }

        // Verifica se uma imagem foi selecionada
        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            
            if (!validTypes.includes(file.type)) {
                alert('Por favor, selecione uma imagem no formato JPEG, PNG ou GIF');
                e.preventDefault();
                return;
            }

            if (file.size > 2 * 1024 * 1024) { // 2MB
                alert('A imagem deve ter menos de 2MB');
                e.preventDefault();
                return;
            }
        }

        // Se todas as validações passarem, o formulário será enviado
        console.log('Formulário válido, enviando...');
    });

    // 3. Feedback visual durante o envio
    form.addEventListener('submit', function() {
        const submitBtn = document.getElementById('btn-register');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    });
});