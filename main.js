// O tempo total da animação (em milissegundos)
const ANIMATION_DURATION = 1000; // 1 segundos representação em milissegundos

function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    
    // Alterna o estado 'open' (para saber se o menu deve abrir ou fechar)
    menuMobile.classList.toggle('open');
    
    // Verifica se o menu está fechado ou se ele está abrindo
    const isOpening = menuMobile.classList.contains('open');
    
    // Reseta qualquer altura definida anteriormente para garantir que a animação comece do zero
    menuMobile.style.height = null;

    if (isOpening) {
        // Se estiver abrindo:
        
        // Define display: block (necessário para que o menu seja renderizado)
        menuMobile.style.display = 'block';

        // Pega a altura real do conteúdo
        // scrollHeight retorna a altura que o conteúdo precisa, mesmo que esteja escondido
        let contentHeight = menuMobile.scrollHeight;

        // Prepara o estado inicial (altura 0) e inicia a animação
        menuMobile.style.overflow = 'hidden';
        
        animateMenu(menuMobile, 0, contentHeight, ANIMATION_DURATION);
    } else {
        // Se estiver fechando:
        
        // Pega a altura atual do menu como ponto de partida
        let startHeight = menuMobile.scrollHeight;

        // Inicia a animação de fechar (da altura atual para 0)
        animateMenu(menuMobile, startHeight, 0, ANIMATION_DURATION, () => {
            // Callback: Depois de fechar, esconde o menu
            menuMobile.style.display = 'none';
        });
    }
}


function animateMenu(element, start, end, duration, callback = () => {}) {
    const startTime = performance.now();

    function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        let progress = Math.min(1, elapsedTime / duration);
        
        // Função de timing (ease-out) para um movimento mais suave
        // Fórmula Cubic Bezier (0.23, 1, 0.32, 1) é similar ao 'ease-out' no CSS
        let timingProgress = progress * (2 - progress); 
        
        const newHeight = start + (end - start) * timingProgress;

        element.style.height = newHeight + 'px';

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            //Garante que a altura final seja exata (para abrir completamente)
            if (end > 0) {
                 element.style.height = 'auto'; // Volta para 'auto' para se adaptar ao conteúdo
            } else {
                 element.style.height = '0px'; 
            }
            callback();
        }
    }

    // Inicia o loop de animação
    requestAnimationFrame(step);
}