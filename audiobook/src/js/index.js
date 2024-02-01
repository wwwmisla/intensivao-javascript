const nomeFaixa = document.getElementById("capitulo");
const audioFaixa = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximaFaixa = document.getElementById("proximo");
const botaoFaixaAnterior = document.getElementById("anterior");

const numeroFaixas = 6;
let taTocando = 0;
let faixaAtual = 1;

function tocarFaixa() {
    botaoPlayPause.classList.remove("bi-play-circle-fill");
    botaoPlayPause.classList.add("bi-pause-circle-fill");
    audioFaixa.play();
    taTocando = 1;
}

function pausarFaixa() {
    botaoPlayPause.classList.add("bi-play-circle-fill");
    botaoPlayPause.classList.remove("bi-pause-circle-fill");
    audioFaixa.pause();
    taTocando = 0;
}

function tocarOuPausarFaixa() {
    if (taTocando === 0) {
        tocarFaixa();
        taTocando = 1;
    } else {
        pausarFaixa();
        taTocando = 0;
    }
}

function proximaFaixa() {
    if (faixaAtual === numeroFaixas) {
        faixaAtual = 1;
        nomeFaixa.innerText = "Introdução";
    } else {
        faixaAtual = faixaAtual + 1;
        nomeFaixa.innerText = "Ato " + faixaAtual;
    }
    audioFaixa.src = "./src/books/hamlet/" + faixaAtual + ".mp3";
    tocarFaixa();
}

function faixaAnterior() {
    if (faixaAtual === 1) {
        faixaAtual = numeroFaixas;
        nomeFaixa.innerText = "Ato " + faixaAtual;
    } else {
        faixaAtual = faixaAtual - 1;
        if (faixaAtual === 1) {
            nomeFaixa.innerText = "Introdução";
        } else {
            nomeFaixa.innerText = "Ato " + faixaAtual;
        }
    }
    audioFaixa.src = "./src/books/hamlet/" + faixaAtual + ".mp3";
    tocarFaixa();
}

botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoFaixaAnterior.addEventListener("click", faixaAnterior);
botaoProximaFaixa.addEventListener("click", proximaFaixa);
audioFaixa.addEventListener("ended", proximaFaixa);