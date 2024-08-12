const myObserver = new IntersectionObserver((entries) =>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }else{
            entry.target.classList.remove('show')
        }
    })})

    const elements = document.querySelectorAll('.hidden')

    elements.forEach((element) => myObserver.observe(element))

// Função para aplicar o efeito de atraso nos parágrafos
function applyDelayEffect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const paragraphs = entry.target.querySelectorAll('p');
            let delay = 2000; // 2 segundos para o primeiro parágrafo

            paragraphs.forEach(paragraph => {
                paragraph.style.opacity = 0;
                setTimeout(() => {
                    paragraph.style.transition = 'opacity 1s';
                    paragraph.style.opacity = 1;
                }, delay);
                delay += 1000; // 1 segundo de delay adicional para cada parágrafo
            });

            // Para que o efeito aconteça apenas uma vez, você pode "desregistrar" o observer
            
        }
    });
}

// Cria uma instância do Intersection Observer
const observer = new IntersectionObserver(applyDelayEffect, {
    threshold: 0.1 // Inicia o efeito quando 10% da div estiver visível
});

// Seleciona a div que você quer observar
const targetDiv = document.getElementById('acabou');

// Ativa o observador na div
observer.observe(targetDiv);


// Seleciona todos os elementos <p> dentro da div "festinha"
const emojis = document.querySelectorAll('#festinha p');

// Lista de animações disponíveis
const animations = ['moveAndFadeLinear', 'moveAndFadeDiagonal', 'moveAndFadeCurved'];

function animateEmojis() {
    let index = 0;

    function animateNextSet() {
        for (let i = 0; i < 5; i++) { // Anima 5 emojis por vez
            if (index < emojis.length) {
                const emoji = emojis[index];

                // Calcula posições aleatórias dentro da div
                const randomXStart = Math.random() * 90;
                const randomYStart = Math.random() * 90;
                const randomXEnd = (Math.random() * 300) - 150;
                const randomYEnd = (Math.random() * 300) - 150;

                // Define a posição inicial do emoji
                emoji.style.left = `${randomXStart}%`;
                emoji.style.top = `${randomYStart}%`;

                // Seleciona uma animação aleatória
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                emoji.style.animationName = randomAnimation;

                // Modifica a animação para usar as posições calculadas
                emoji.style.animation = `${randomAnimation} 4s ease-in-out forwards`;

                // Reinicia a animação
                emoji.style.animationName = 'none';
                emoji.offsetHeight; // Força o recálculo de layout
                emoji.style.animationName = randomAnimation;

                index++;
            } else {
                index = 0; // Reinicia o índice para começar de novo
            }
        }

        // Passa para o próximo conjunto de 5 emojis após o tempo da animação
        setTimeout(animateNextSet, 4000);
    }

    // Começa a animação do primeiro conjunto de emojis
    animateNextSet();
}

// Inicia a animação ao carregar a página
animateEmojis();


