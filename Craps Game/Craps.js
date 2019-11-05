"use strict";
class Game {
    constructor(initialPurse) {
        this.purse = initialPurse;
    }
}

let diceImages = {
    1: "images/oneDie.png",
    2: "images/twoDie.png",
    3: "images/threeDie.png",
    4: "images/fourDie.png",
    5: "images/fiveDie.png",
    6: "images/sixDie.png"
};

let game;

function initialize() {
    let startButton = document.getElementById("startButton");
    startButton.style.display = "none";
    let betButton = document.getElementById("betButton");
    betButton.style.display = "block";

    game = new Game(1000);
    let purse = document.getElementById("purseArea");
    purse.innerText = `Purse: $${game.purse}`;

    let betInputField = document.getElementById("betInput");
    betInputField.max = game.purse;
}

function enterBet(modalId) {
    let input = document.getElementById("betInput");
    if (input.value > game.purse) {
        alert(`You can only bet up to $${game.purse}!`);
        input.clear();
        enterBet(modalId);
    } else if (input.value <= 0) {
        alert(`You have to bet something!`);
        input.clear();
        enterBet(modalId);
    } else {
        game.bet = input.valueAsNumber;
    }
    closeModal(modalId);
    document.getElementById("betArea").innerText = `Current Bet: $${game.bet}`;
    let button = document.getElementById("betButton");
    button.className = "unFocus";
    button.innerText = "Change Bet";
    button.style.display = "inline";
    button.style.marginLeft = ".5em";

    button = document.getElementById("rollButton");
    button.style.display = "block";
}

function openModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function rollDice() {
    document.getElementById("rollButton").style.display = "none";
    let area = document.getElementById("diceRoll");
    if (area.childElementCount !== 1) {
        while (area.childElementCount > 2) {
            area.removeChild(area.lastChild);
        }
        document.getElementById("animatedDice").hidden = false;
    } else {
        let gif = document.createElement("IMG");
        gif.src = "images/rollingDice.gif";
        gif.id = "animatedDice";
        gif.alt = "Animated rolling dice";
        area.appendChild(gif);
    }

    game.dice1 = getDiceNumber();
    game.dice2 = getDiceNumber();
    game.roll = game.dice1 + game.dice2;

    setTimeout(function () {
        document.getElementById("animatedDice").hidden = true;
        resolveRoll();
        displayDice(area);
    }, 1000);

    function getDiceNumber() {
        return Math.floor(Math.random() * 6) + 1;
    }
}

function displayDice(area) {
    let image1 = document.createElement("IMG");
    let image2 = document.createElement("IMG");

    image1.src = diceImages[game.dice1];
    image2.src = diceImages[game.dice2];

    area.appendChild(image1);
    area.appendChild(image2);

    let text = document.getElementById("rollText");
    text.innerText = `Roll: ${game.roll}`;
    text.hidden = false;
}

function resolveRoll() {
    if (game.point === undefined) {
        if (game.roll === 7 || game.roll === 11) {
            youWin();
        } else if (game.roll === 2) {
            game.roll = 3;
            setPoint();
        } else {
            setTimeout(function () {
                setPoint();
            }, 1000);
        }
    } else {
        if (game.roll === 2 || game.roll === 7 || game.roll === 11) {
            youLose();
        } else if (game.roll === game.point) {
            youWin();
        } else {
            document.getElementById("rollButton").style.display = "block";
        }
    }
}

function setPoint() {
    game.point = game.roll;
    let area = document.getElementById("pointToMake");
    area.innerHTML = `Point to Make: ${game.point} <br/>`;
    displayDice(area);
    document.getElementById("rollButton").style.display = "block";
}

function youWin() {
    game.purse += game.bet;
    setResultModal("win");
    openModal("resultModal");
}

function youLose() {
    game.purse -= game.bet;
    if (game.purse <= 0) {
        setResultModal("busted");
    } else {
        setResultModal("lose");
    }
    openModal("resultModal");
}

function resetRound() {
    let purse = document.getElementById("purseArea");
    purse.innerText = `Purse: $${game.purse}`;

    if (game.bet > game.purse) {
        game.bet = game.purse;
        document.getElementById("betArea").innerText = `Current Bet: $${game.bet}`;
    }

    game.point = undefined;

    let area = document.getElementById("pointToMake");
    area.innerHTML = "";

    area = document.getElementById("diceRoll");
    if (area.childElementCount !== 1) {
        while (area.childElementCount > 1) {
            area.removeChild(area.lastChild);
        }
    }

    let text = document.getElementById("rollText");
    text.hidden = true;

    let button = document.getElementById("rollButton");
    button.style.display = "block";

    closeModal("resultModal");

    let modal = document.getElementById("resultModalContent");
    while (modal.childElementCount > 1) {
        modal.removeChild(modal.lastChild);
    }
}

function newGame() {
    game = undefined;
    let elements = [
        document.getElementById("purseArea"),
        document.getElementById("betArea"),
        document.getElementById("pointToMake"),
        document.getElementById("rollText")
    ];

    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = "";
    }

    let area = document.getElementById("diceRoll");
    area.removeChild(area.lastChild);
    area.removeChild(area.lastChild);

    let buttons = document.getElementsByClassName("gameButtons");
    buttons.hidden = true;
    let startButton = document.getElementById("startButton");
    startButton.style.display = "block";
    let betButton = document.getElementById("betButton");
    betButton.style.display = "none";

    betButton.className = "gameButtons";
    betButton.innerText = "Place bet";

    closeModal("resultModal");

    let modal = document.getElementById("resultModalContent");
    while (modal.childElementCount > 1) {
        modal.removeChild(modal.lastChild);
    }
}

function setResultModal(status) {
    let images = {
        "win": "images/trophy.jpg",
        "lose": "images/loser.PNG",
        "busted": "images/busted.jpg"
    };

    let modalContent = document.getElementById("resultModalContent");

    let text = document.createElement("P");
    text.style.display = "block";

    let picture = document.createElement("IMG");
    picture.alt = `${status} image`;
    picture.src = images[status];
    picture.height = "50";
    picture.width = "50";

    let purseText = document.createElement("P");
    purseText.style.display = "block";
    purseText.innerText = `You now have $${game.purse}`;

    let anotherRoundButton = document.createElement("BUTTON");
    anotherRoundButton.innerText = "Another Round";
    anotherRoundButton.onclick = function(){ resetRound() };

    let newGameButton = document.createElement("BUTTON");
    newGameButton.innerText = "New Game";
    newGameButton.onclick = function(){ newGame() };

    if (status === "win"){
        text.innerText = "You won!";
    } else if (status === "lose") {
        text.innerText = "You lost!";
    } else if (status === "busted") {
        text.innerText = "You busted!";
    }

    modalContent.appendChild(text);
    modalContent.appendChild(picture);
    modalContent.appendChild(purseText);
    if (status === "win" || status === "lose"){
        modalContent.appendChild(anotherRoundButton);
        modalContent.appendChild(newGameButton);
    } else if (status === "busted") {
        modalContent.appendChild(newGameButton);
    }
}
