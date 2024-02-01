// Informacoes livro
const capa = document.getElementById('capa');
const nomeAutor = document.getElementById('nome-autor');
const titulo = document.getElementById('titulo');
const nomeFaixa = document.getElementById("capitulo");

// Audio
const audioFaixa = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximaFaixa = document.getElementById("proximo");
const botaoFaixaAnterior = document.getElementById("anterior");

// Objetos
const domCasmurro = {
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    capa: './src/images/dom-casmurro/1.jpg',
    audio: './src/books/dom-casmurro/1.mp3',
    faixas: 10,
    nomeFaixas: ['Capítulo 1', 'Capítulo 2', 'Capítulo 3', 'Capítulo 4', 'Capítulo 5', 'Capítulo 6', 'Capítulo 7', 'Capítulo 8', 'Capítulo 9', 'Capítulo 10']
    // imgDescricao: './src/images/dom-casmurro/3.jpg',
    // descricao: 'O audiobook de "Dom Casmurro" oferece uma oportunidade única de mergulhar na rica prosa de Machado de Assis enquanto se desvenda a história cativante de Bentinho e Capitu. O formato de audiobook permite que o leitor experimente a narrativa de uma maneira envolvente e imersiva, enquanto aprecia a interpretação dos narradores e os detalhes sonoros que dão vida à obra.'
};

const hamlet = {
    titulo: 'Hamlet',
    autor: 'William Shakespeare',
    capa: './src/images/hamlet/1.jpg',
    audio: './src/books/hamlet/1.mp3',
    faixas: 6,
    nomeFaixas: ['Introdução', 'Ato 1', 'Ato 2', 'Ato 3', 'Ato 4', 'Ato 5']
    // imgDescricao: './src/images/hamlet/5.jpg',
    // descricao: 'O audiobook de "Hamlet" oferece uma maneira acessível e envolvente de experimentar essa obra-prima da literatura mundial. O formato de audiobook permite que os ouvintes mergulhem na rica linguagem e na complexidade emocional dos personagens, enquanto são levados pelas reviravoltas da trama.'
};

const opcoesLivros = [domCasmurro, hamlet];
let livroSelecionado = 0;
let numeroFaixas = 0;
let taTocando = 0;
let faixaAtual = 1;

// Descobre o qual livro foi selecionado e altera as informações do card 
function trocarLivro(indice) {
    if (indice >= 0 && indice < opcoesLivros.length) {
        const livro = opcoesLivros[indice];
        titulo.innerText = livro.titulo;
        nomeAutor.innerText = livro.autor;
        capa.src = livro.capa;
        audioFaixa.src = livro.audio;
        numeroFaixas = livro.faixas;
        nomeFaixa.innerText = livro.nomeFaixas[0]; // Inicialmente mostra a primeira faixa
        // imgDescricao.src = livro.imgDescricao;
        // descricao.innerText = livro.descricao;
        faixaAtual = 1; // Inicialmente está na primeira faixa
        livroSelecionado = indice; // Atualizando o livro selecionado
    }
}

// Inicia a faixa
function tocarFaixa() {
    botaoPlayPause.classList.remove("bi-play-circle-fill");
    botaoPlayPause.classList.add("bi-pause-circle-fill");
    audioFaixa.play();
    taTocando = 1;
}

// Pausa a faixa
function pausarFaixa() {
    botaoPlayPause.classList.add("bi-play-circle-fill");
    botaoPlayPause.classList.remove("bi-pause-circle-fill");
    audioFaixa.pause();
    taTocando = 0;
}

// Verifica se está tocando ou não
function tocarOuPausarFaixa() {
    if (taTocando === 0) {
        tocarFaixa();
    } else {
        pausarFaixa();
    }
}

// Passa para a próxima faixa
function proximaFaixa(indice) {
    if (faixaAtual === opcoesLivros[indice].faixas) {
        faixaAtual = 1;
    } else {
        faixaAtual++;
    }
    audioFaixa.src = opcoesLivros[indice].audio.replace(/\/\d+\.mp3$/, `/${faixaAtual}.mp3`);
    nomeFaixa.innerText = opcoesLivros[indice].nomeFaixas[faixaAtual - 1];
    tocarFaixa();
}

// Retorna a faixa anterior
function faixaAnterior(indice) {
    if (faixaAtual === 1) {
        faixaAtual = opcoesLivros[indice].faixas;
    } else {
        faixaAtual--;
    }
    audioFaixa.src = opcoesLivros[indice].audio.replace(/\/\d+\.mp3$/, `/${faixaAtual}.mp3`);
    nomeFaixa.innerText = opcoesLivros[indice].nomeFaixas[faixaAtual - 1];
    tocarFaixa();
}

// Ações dos botões para dar play, pause, passar e retornar faixa
botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoFaixaAnterior.addEventListener("click", function() {
    faixaAnterior(livroSelecionado);
});
botaoProximaFaixa.addEventListener("click", function() {
    proximaFaixa(livroSelecionado);
});
audioFaixa.addEventListener("ended", proximaFaixa);

// Trocar para o primeiro livro ao carregar a página
trocarLivro(0);