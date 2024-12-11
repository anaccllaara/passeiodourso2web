const urso = document.getElementById("urso");
let posição = 50;
let passo = 0;
let alturaOriginal = 0;
let pulando = false;
let indoSubir = false;

const imagensurso = ["urso-1.png", "urso-2.png", "urso-3.png"];
const gravidade = 3;
const alturaPulo = 150;
const velocidadeMovimento = 5;

function moveLeft() {posição -= velocidadeMovimento;
                     urso.style.left = `${posição}px`;}

function moveRight() {posição += velocidadeMovimento;
                      urso.style.left = `${posição}px`;}

function move(event) {
    if (event.key === 'd' || event.key === 'D') {moveRight();}
    else if (event.key === 'a' || event.key === 'A') {moveLeft();}
    else if (event.key === 'w' || event.key === 'W') {
        if (!pulando) {pulando = true;
                       alturaOriginal = urso.offsetTop; 
                       indoSubir = true; 
                       pular();}
    }

    urso.src = imagensurso[passo];
    passo = (passo + 1) % imagensurso.length;
}

function pular() {
    let alturaAtual = urso.offsetTop;

    if (pulando && indoSubir && alturaAtual > alturaOriginal - alturaPulo) {
        urso.style.top = `${alturaAtual - gravidade}px`;
        requestAnimationFrame(pular);
    }
    
    else if (pulando && indoSubir) {
        indoSubir = false;
        requestAnimationFrame(pular);
    }
    
    else if (pulando && !indoSubir && alturaAtual < alturaOriginal) {
        urso.style.top = `${alturaAtual + gravidade}px`;
        requestAnimationFrame(pular);
    }
    
    else {
        pulando = false;
        urso.style.top = `${alturaOriginal}px`;
    }
}

window.addEventListener('keydown', move);