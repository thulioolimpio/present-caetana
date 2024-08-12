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

