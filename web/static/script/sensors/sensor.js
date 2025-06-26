// No arquivo sensor.js (garanta que o caminho está correto)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.sensor-header').forEach(header => {
        header.addEventListener('click', () => {
            const panel = header.closest('.sensor-panel');
            panel.classList.toggle('open');
            
            // Atualizar a seta
            const arrow = header.querySelector('.arrow-icon');
            arrow.style.transform = panel.classList.contains('open') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        });
    });
});