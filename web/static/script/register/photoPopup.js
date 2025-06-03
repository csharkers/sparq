// photoPopUp.js

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o formulário de registro pelo ID
  const form = document.getElementById('registerForm');
  // Overlay que exibe o popup de confirmação da foto
  const overlay = document.getElementById('popupOverlay');
  // Input do tipo file para seleção de avatar
  const avatarInput = document.getElementById('input-avatar');
  // Tag <img> para pré-visualização da imagem selecionada
  const avatarPreview = document.getElementById('avatarPreview');
  // Botão que dispara o diálogo de seleção de arquivo
  const chooseBtn = document.getElementById('btn-choose-file');
  // Botão de confirmação dentro do popup
  const confirmBtn = document.getElementById('btn-confirm');
  // Botão de voltar/fechar dentro do popup
  const backBtn = document.getElementById('btn-back');

  // Intercepta o evento de submit do formulário
  form.addEventListener('submit', e => {
    e.preventDefault(); // Evita o envio padrão para podermos validar antes
    if (form.checkValidity()) {
      // Se todos os campos forem válidos, mostra o overlay (popup)
      overlay.style.display = 'flex';
    } else {
      // Se algum campo inválido, exibe mensagens de validação
      form.reportValidity();
    }
  });

  // Ao clicar no botão de escolher arquivo, dispara o input file escondido
  chooseBtn.addEventListener('click', () => avatarInput.click());

  // Atualiza a pré-visualização quando o usuário seleciona um arquivo
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0]; // Pega o primeiro (e único) arquivo selecionado
    if (file) {
      // Cria uma URL temporária para exibir a imagem no <img>
      avatarPreview.src = URL.createObjectURL(file);
    }
  });

  // Botão "Voltar": fecha o popup apenas ajustando o estilo
  backBtn.addEventListener('click', () => overlay.style.display = 'none');

  // Botão "Confirmar": simula o envio e redireciona o usuário
  confirmBtn.addEventListener('click', () => {
    // Aqui irá ocorrer o upload real via fetch
    // Neste exemplo, apenas redireciona para a página de login
    window.location.href = '/menu';
  });
});
