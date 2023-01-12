//variaveis globais
let Ncartas = 14;
let NcartasPossiveis = 14;
let cartaPraCima = "nao";
let gifs = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"];
let Njogadas = 0;

do {
    Ncartas = prompt("Qual o numero de cartas que deseja jogar?");
} while (Ncartas % 2 != 0 || Ncartas < 4 || Ncartas > 14);



//remove as cartas que não serão usadas;
let cartas = document.querySelectorAll(".carta");
for (let i = 0; i != NcartasPossiveis - Ncartas; i++) {
    cartas[NcartasPossiveis - i - 1].classList.add("carta-fora");
}



gerarJogo();

//função que aplica um gif aleatorio a cada par de cartas
function gerarJogo() {
    let posicoesgifs = new Array(Ncartas)
    for (let i = 0; i < Ncartas; i++) {
        posicoesgifs[i] = i + 1;
    }


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



    if (cartaPraCima == "nao" && !carta.classList.contains("clicado")) {
        //virar carta para cima;
        carta.classList.add("clicado");
        cartaPraCima = carta.id;

    } else if (cartaPraCima != "nao" && !carta.classList.contains("clicado")) {

        carta.classList.add("clicado");

        await delay(1);

        let gif_carta1 = document.querySelector(`#${cartaPraCima} .back-face`).innerHTML;
        let gif_carta2 = document.querySelector(`#${carta.id} .back-face`).innerHTML;

        compararGifs(gif_carta1, gif_carta2, carta)


        /* if (gif_carta1 != gif_carta2) {
            document.querySelector(`#${cartaPraCima}`).classList.remove("clicado");
            document.querySelector(`#${carta.id}`).classList.remove("clicado");
        } */

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

function verificarFim() {

    if (document.querySelectorAll(".clicado").length == Ncartas) {
        alert(`Você ganhou em ${Njogadas} Jogadas`);
    } else {
        return;
    }
}




