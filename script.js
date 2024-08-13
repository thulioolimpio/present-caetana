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




document.getElementById('btn-acessar').addEventListener('click', function() {
    // Esconde o botão de acesso
    document.getElementById('acesso').style.display = 'none';
    
    // Mostra o conteúdo do site
    document.getElementById('conteudo').style.display = 'block';

    // Inicia as animações dos emojis
    animateEmojis(); 
});


document.addEventListener('DOMContentLoaded', function() {
    const btnSim = document.getElementById('btn-sim');
    const btnNao = document.getElementById('btn-nao'); // Certifique-se de que este ID está correto
    const formContainer = document.getElementById('form-container');
    const forcaContainer = document.getElementById('forca-container'); // Certifique-se de que este ID está correto

    // Adiciona um evento de movimento do mouse sobre o botão "Sim"
    btnSim.addEventListener('mouseover', function() {
        const containerRect = formContainer.getBoundingClientRect();
        const btnRect = btnSim.getBoundingClientRect();

        // Calcula novas posições aleatórias para o botão "Sim" dentro do container
        const offsetX = Math.random() * (containerRect.width - btnRect.width);
        const offsetY = Math.random() * (containerRect.height - btnRect.height);

        // Aplica as novas posições ao botão "Sim"
        btnSim.style.position = 'absolute';
        btnSim.style.left = `${Math.max(0, offsetX)}px`;
        btnSim.style.top = `${Math.max(0, offsetY)}px`;
    });

    // Quando o botão "Não" for clicado, exibe o jogo da forca
    btnNao.addEventListener('click', function() {
        formContainer.style.display = 'none';
        forcaContainer.style.display = 'block';
        iniciarJogoDaForca();
    });

    // Jogo da Forca
    const fraseInicial = "FELIZ ANIVERSÁRIO,";
    const palavraSecreta = "EU TE AMO";
    const simboloCoracao = "❤️"; // Símbolo de coração ao lado da palavra secreta
    let palavraAdivinhada = Array.from(palavraSecreta).map(char => char === ' ' ? ' ' : '_');
    let vidas = 6;

    function iniciarJogoDaForca() {
        // Atualiza a exibição da frase inicial
        atualizarPalavraNaTela();
        criarBotoes();
        atualizarVidas();
    }

    function atualizarPalavraNaTela() {
        const forcaPalavra = document.getElementById('forca-palavra');
        // Exibe a frase inicial + palavra adivinhada + coração
        forcaPalavra.textContent = fraseInicial + " " + palavraAdivinhada.join('') + " " + simboloCoracao;
    }

    function criarBotoes() {
        const forcaBotoes = document.getElementById('forca-botoes');
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

        forcaBotoes.innerHTML = ''; // Limpa os botões anteriores, se houver

        for (let letra of alfabeto ) {
            const btn = document.createElement('button');
            btn.textContent = letra;
            btn.addEventListener('click', function() {
                verificarLetra(letra, btn);
            });
            forcaBotoes.appendChild(btn);
        }
    }

    function verificarLetra(letra, btn) {
        let acertou = false;

        for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
                palavraAdivinhada[i] = letra;
                acertou = true;
            }
        }

        btn.disabled = true;

        if (!acertou) {
            vidas--;
            atualizarVidas();
            if (vidas > 0) {
                fornecerDica();
            } else {
                exibirResultado('Você perdeu! Mas não desista, tente novamente!');
            }
        } else {
            atualizarPalavraNaTela();
            if (!palavraAdivinhada.includes('_')) {
                exibirResultado('Sim! Eu posso falar isso, 1 ano não são dois dias né?');
                
            }
        }
    }

    function fornecerDica() {
        const dicas = [
            "Dica: É algo que se diz a alguém especial.",
            "Dica: É uma frase curta.",
            "Dica: Inclui um símbolo de amor.",
            "Dica: Expressa um sentimento profundo."
        ];
        const forcaStatus = document.getElementById('forca-status');
        forcaStatus.textContent = dicas[6 - vidas]; // Mostra a dica com base no número de vidas restantes
    }

    function atualizarVidas() {
        const forcaVidas = document.getElementById('forca-vidas-count');
        forcaVidas.textContent = vidas;
    }

    function exibirResultado(mensagem) {
        const forcaStatus = document.getElementById('forca-status');
        forcaStatus.textContent = mensagem;

        // Desabilitar todos os botões após o jogo terminar
        const botoes = document.querySelectorAll('#forca-botoes button');
        botoes.forEach(btn => btn.disabled = true);
    }
});


