// Global Variables
const selectLevel = document.getElementById("select-level");
const btnStart = document.getElementById("btn-start");
const squaresContainer = document.getElementById("squares-container");
const overContainer = document.getElementById("over-container");
let currentScore = document.getElementById("score-panel");

let bombs = [];
let punteggio = 0;

// L'utente sceglie la difficoltà con il button
btnStart.addEventListener("click", function ()
{
    const level = selectLevel.value;

    // in base alla difficoltà recupero le celle da creare
    const cells = cellsNumberXlevel(level);

    generateCells(cells);

    // Genero le bombe
    bombs = generateNumBombs(16, cells);

    console.log('Le bombe sono qui: ' + bombs);

    overContainer.innerHTML = "";
    currentScore.innerHTML = (punteggio = 0);
});

// Funzione che mi dice quante celle servono per ogni livello
function cellsNumberXlevel(level)
{
    let result;

    switch (parseInt(level)) {
        case 1:
            result = 100;
            break;
        case 2:
            result = 81;
            break;
        case 3:
            result = 49;
            break;
    }

    return result;
}

// Funzione che genera le celle
function generateCells(cellsNumber)
{
    // Resetto il contenuto dello squares-container
    squaresContainer.innerHTML = "";

    // quante celle per ogni riga?
    const cellsXrow = Math.sqrt(cellsNumber);

    // la dimensione di ogni singola cell cambia
    const cellSize = (100 / cellsXrow) - .4;

    // Ciclo in base alle celle da creare
    for (let i = 0; i < cellsNumber; i++) {
        // creo la cell
        const cell = document.createElement("div");
        cell.classList.add("box");
        cell.style.width = cellSize + "%";
        cell.style.height = cellSize + "%";
        cell.innerHTML = i + 1;

        cell.addEventListener("click", onCellClick);

        squaresContainer.append(cell);
    }
};

// Funzione per il click su ogni singola cell usando "this"
function onCellClick()
{
    // Se la cella è una bomba, la classe applicata è diversa
    // devo leggere prima l'array 
    const currentCellNumb = parseInt(this.textContent);

    // Annullo il click sopra la cella già con la classe click.on.box
    if (this.classList.contains("click-on-box")) {
        return;
    }

    // Cambia la classe
    if (bombs.includes(currentCellNumb)) {
        this.classList.add("click-on-box-bomb");
        overContainer.innerHTML = `<div class="overlay-lose">Hai Perso!</div>`;
        console.log(bombs);
        squaresContainer.innerHTML += `<div class="stop-play"></div>`;
        showBombs();
    } else {
        this.classList.add("click-on-box");
        console.log(punteggio);
        setScore();
    }
};

// Funzione per generare numeri random con numero-minimo e numero-max
function generateRandomNumb(minNumb = 1, maxNumb = 10)
{
    const numRandom = Math.floor(Math.random() * (maxNumb - minNumb + 1) + minNumb);
    return numRandom;
}

// Funzione che genera le bombe
function generateNumBombs(numBombs, numMaxRandom)
{
    // genero un array vuoto dove inserirò i numeri generati 
    let arrayBombs = [];

    // Genero le bombe in un ciclo
    // Finchè la lunghezza dell'array è minore di 16, continua a ciclare!
    while (arrayBombs.length < 16) {
        const newBombs = generateRandomNumb(1, numMaxRandom);

        // Per capire se il numero esiste già lo cerco nell'array
        let numeroEsiste = arrayBombs.includes(newBombs);

        // Se non esiste lo pusho
        if (!numeroEsiste) {
            arrayBombs.push(newBombs);
        } else {
            //la lenght non cambia
        }
    }
    return arrayBombs;
}

// Funzione per far comparire tutte le bombe
function showBombs()
{
    // Recupero tutte le celle
    const cellsList = squaresContainer.querySelectorAll(".box");
    // Ciclo sull'array e recupero la bomba
    for (let i = 0; i < bombs.length; i++) {
        const bomba = bombs[i];
        // La lista bomba parte da 1, la cellsList da 0 perchè è un array
        const bombCell = cellsList[bomba - 1];
        bombCell.classList.add("click-on-box-bomb");
    }
}

// Funzione per settare il punteggio corrente
function setScore()
{
    punteggio++;
    currentScore.innerHTML = punteggio;
}