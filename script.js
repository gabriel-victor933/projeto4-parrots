//variaveis globais
let Ncartas = 4;
let NcartasPossiveis = 14;
let cartaPraCima = "nao";
let gifs = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"];
let Njogadas = 0;
let seg = 0;
let segundos = document.getElementById("seg");
let esperar = false;



iniciar();
setInterval(relogio, 1000);

//função que configura o numero de cartas do jogo
function iniciar() {



    do {
        Ncartas = prompt("Qual o numero de cartas que deseja jogar?");
    } while (Ncartas % 2 != 0 || Ncartas < 4 || Ncartas > 14);


    //remove as cartas que não serão usadas;
    let cartas = document.querySelectorAll(".carta");
    for (let i = 0; i != NcartasPossiveis - Ncartas; i++) {
        cartas[NcartasPossiveis - i - 1].classList.add("carta-fora");
    }




    Njogadas = 0;
    seg = 0;
    gerarJogo();

}


//função que aplica um gif aleatorio a cada par de cartas aleatorias
function gerarJogo() {
    let posicoesgifs = new Array(Ncartas)
    for (let i = 0; i < Ncartas; i++) {
        posicoesgifs[i] = i + 1;
    }
    posicoesgifs.sort(comparador);

    let paresA = posicoesgifs.slice(0, Ncartas / 2);
    let paresB = posicoesgifs.slice(Ncartas / 2, Ncartas);



    let gifsjogaveis = gifs;
    gifsjogaveis.sort(comparador);



    for (let i = 0; i < Ncartas / 2; i++) {
        document.querySelector(`#C${paresA[i]} .back-face`).innerHTML = `<img src="./imagens/${gifsjogaveis[i]}parrot.gif">`;
        document.querySelector(`#C${paresB[i]} .back-face`).innerHTML = `<img src="./imagens/${gifsjogaveis[i]}parrot.gif">`;

    }

}


//função que vira e desvira as cartas.
async function clicado(carta) {



    if (cartaPraCima == "nao" && !carta.classList.contains("clicado") && !esperar) {
        //virar carta para cima;
        carta.classList.add("clicado");
        cartaPraCima = carta.id;

    } else if (cartaPraCima != "nao" && !carta.classList.contains("clicado") && !esperar) {

        carta.classList.add("clicado");

        esperar = true;
        await delay(1);
        esperar = false;

        let gif_carta1 = document.querySelector(`#${cartaPraCima} .back-face`).innerHTML;
        let gif_carta2 = document.querySelector(`#${carta.id} .back-face`).innerHTML;

        compararGifs(gif_carta1, gif_carta2, carta)


        if (gif_carta1 != gif_carta2) {
            document.querySelector(`#${cartaPraCima}`).classList.remove("clicado");
            document.querySelector(`#${carta.id}`).classList.remove("clicado");
        }

        Njogadas++;
        cartaPraCima = "nao";

        verificarFim();

    }

}

//compara as cartas viradas
function compararGifs(gif_carta1, gif_carta2, carta) {

    if (gif_carta1 != gif_carta2) {
        document.querySelector(`#${cartaPraCima}`).classList.remove("clicado");
        document.querySelector(`#${carta.id}`).classList.remove("clicado");
    }



}

//aplica um delay de n segundos.
function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

function comparador() {
    return Math.random() - 0.5;
}

//função que verifica se todos os pares foram encontrados
function verificarFim() {

    let resp;
    if (document.querySelectorAll(".clicado").length == Ncartas) {
        alert(`Você ganhou em ${Njogadas} Jogadas! A duração do jogo foi de ${segundos.innerHTML} segundos`);

        do {
            resp = prompt("Gostaria de reiniciar a partida?")
        } while (resp != "sim" && resp != "não");

        if (resp === "sim") {
            reset_cards();
            iniciar();
        }

    }
}

//cronometro do jogo
function relogio() {

    seg++;

    segundos.innerHTML = `${Math.floor(seg / 10)}${seg % 10}`;

}

//remove as classes adicionadas as cartas para poder recomeçar o jogo
function reset_cards() {

    let cartasViradas = document.querySelectorAll(".clicado");

    for (let i = 0; i < cartasViradas.length; i++) {
        cartasViradas[i].classList.remove("clicado");
    }

    let cartasForas = document.querySelectorAll(".carta-fora");

    for (let i = 0; i < cartasForas.length; i++) {
        cartasForas[i].classList.remove("carta-fora");
    }

}




