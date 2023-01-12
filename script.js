//variaveis globais
let Ncartas = 14;
let NcartasPossiveis = 14;
let cartaPraCima = "nao";

let gifs = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"];

/* do {
    Ncartas = prompt("Qual o numero de cartas que deseja jogar?");
} while (Ncartas % 2 != 0 || Ncartas < 4 || Ncartas > 14);

 */

//remove as cartas que não serão usadas;
let cartas = document.querySelectorAll(".carta");
for (let i = 0; i != NcartasPossiveis - Ncartas; i++) {
    console.log(cartas[NcartasPossiveis - i - 1]);
    cartas[NcartasPossiveis - i - 1].classList.add("carta-fora");
}





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


        cartaPraCima = "nao";
    }


}


function compararGifs(gif_carta1, gif_carta2, carta) {

    if (gif_carta1 != gif_carta2) {
        document.querySelector(`#${cartaPraCima}`).classList.remove("clicado");
        document.querySelector(`#${carta.id}`).classList.remove("clicado");
    }



}

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}






