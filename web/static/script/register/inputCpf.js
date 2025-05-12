const cpfInput = document.getElementById('cpf');

  cpfInput.addEventListener('input', function(e) {
    let v = e.target.value;
    // remove tudo que não for dígito
    v = v.replace(/\D/g, '');

    // aplica as pontuações
    if (v.length > 3) {
      v = v.replace(/^(\d{3})(\d+)/, '$1.$2');
    }
    if (v.length > 6) {
      v = v.replace(/^(\d{3})\.(\d{3})(\d+)/, '$1.$2.$3');
    }
    if (v.length > 9) {
      v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d+)/, '$1.$2.$3-$4');
    }
    // limita em 14 caracteres (11 dígitos + pontuação)
    e.target.value = v.slice(0, 14);
  });