//variaveis globais
let Ncartas = 14;
let NcartasPossiveis = 14;

do {
    Ncartas = prompt("Qual o numero de cartas que deseja jogar?");
} while (Ncartas % 2 != 0 || Ncartas < 4 || Ncartas > 14);


//remove as cartas que não serão usadas;
let cartas = document.querySelectorAll(".carta");
for (let i = 0; i != NcartasPossiveis - Ncartas; i++) {
    console.log(cartas[NcartasPossiveis - i - 1]);
    cartas[NcartasPossiveis - i - 1].classList.add("carta-fora");
}





