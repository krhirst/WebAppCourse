"use strict";
class Game {
    constructor(heads, tails, wins, losses) {
        this.heads = heads;
        this.tails = tails;
        this.wins = wins;
        this.losses = losses;
    }

    flip () {
        let x = Math.floor((Math.random() * 100) + 1);
        if (x <= 50)
            return "heads";
        else if (x > 50)
            return "tails";
    }

    reset() {
        this.heads = 0;
        this.tails = 0;
        this.wins = 0;
        this.losses = 0;
        return this;
    }
}

let currentGame = new Game(0, 0, 0, 0);

function setValues() {
    let heads = document.getElementById("Heads");
    let tails = document.getElementById("Tails");
    let wins = document.getElementById("Correct");
    let losses = document.getElementById("Wrong");

    heads.innerText = `Heads: ${currentGame.heads}`;
    tails.innerText = `Tails: ${currentGame.tails}`;
    wins.innerText = `Right: ${currentGame.wins}`;
    losses.innerText = `Wrong: ${currentGame.losses}`;
}

function flipCoin() {
    let input = prompt("Heads or Tails?");
    let result = currentGame.flip();
    if (input === result)
        currentGame.wins++;
    else
        currentGame.losses++;
    if (result === "heads")
        currentGame.heads++;
    else
        currentGame.tails++;
    alert(`Flip was ${result}, guess was ${input}`);
    setValues();
}

function reset() {
    currentGame.reset();
    setValues();
}

