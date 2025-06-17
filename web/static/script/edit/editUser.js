document.addEventListener('DOMContentLoaded', function() {
    // Configuração do preview do avatar
    const avatarPreview = document.getElementById('avatarPreview');
    const inputAvatar = document.getElementById('input-avatar');
    const btnChooseFile = document.getElementById('btn-choose-file');
    
    // Evento para abrir o seletor de arquivos ao clicar no botão da câmera
    if (btnChooseFile) {
        btnChooseFile.addEventListener('click', function() {
            inputAvatar.click();
        });
    }
    
    // Evento para mostrar o preview quando uma nova imagem for selecionada
    if (inputAvatar) {
        inputAvatar.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // Formatação do CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', formatCPF);
    }
    
    function formatCPF() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 3) value = value.replace(/^(\d{3})/, '$1.');
        if (value.length > 7) value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
        if (value.length > 11) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
        this.value = value.substring(0, 14);
    }
});