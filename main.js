// (function () {
"use strict";


const COUNT_SUIT = 4;
const SUITS = ["hearts", "diamonds", "clubs", "spades"];
const MAX_VALUE_CARDS = 14;
const MIN_VALUE_CARDS = 6;
const VALUE_DECK = 36;
const VALUE_PLAYER = 2;


let game;
let playerDeckVal = VALUE_DECK / VALUE_PLAYER;

function getRandomVal(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setName(obj) {
    let objName;
    if (obj.value < 11 && obj.value > 5) {
        objName = obj.value.toString();
    } else if (obj.value > 10 && obj.value < 15) {
        switch (obj.value) {
            case 11:
                objName = "jack";
                break;
            case 12:
                objName = "queen";
                break;
            case 13:
                objName = "king";
                break;
            case 14:
                objName = "ace";
                break;
        }
    }
    return obj.suit + "-" + objName;


}

function setIsTrump(obj) {
    return obj.suit.toLowerCase() === game.trump.toLowerCase();
}

function setClassList(obj) {
    return obj.suit + " " + "value-" + obj.value;
}

function Game(playerName1, playerName2) {
    this.player1 = {
        name: playerName1,
        score: new Array(playerDeckVal).fill(0),
        allScore: function () {
            return this.score.reduce(function (sum, current) {
                return sum + current;
            });
        },
        deck: []
    };
    this.player2 = {
        name: playerName2,
        score: new Array(playerDeckVal).fill(0),
        allScore: function () {
            return this.score.reduce(function (sum, current) {
                return sum + current;
            });
        },
        deck: []
    };
    this.trump = SUITS[getRandomVal(0, COUNT_SUIT - 1)];
    this.deckCards = [];
    this.shuffleDeckCards = [];
}

function Card(suit, value) {
    this.suit = suit;
    this.value = value;
    this.isTramp = setIsTrump(this);
    this.name = setName(this);
    this.classList = setClassList(this);
}

function createDeck() {
    for (let value = MIN_VALUE_CARDS; value <= MAX_VALUE_CARDS; value++) {
        for (let n = 0; n < SUITS.length; n++) {
            let card = new Card(SUITS[n], value);
            game.deckCards.push(card);


        }
    }
}

function shuffleCards() {
    while (game.deckCards.length) {
        game.shuffleDeckCards = game.shuffleDeckCards.concat(game.deckCards.splice(getRandomVal(0, game.deckCards.length), 1));
    }
}

function splitShuffleDeckCards() {
    game.player1.deck = game.player1.deck.concat(game.shuffleDeckCards.splice(0, playerDeckVal));
    game.player2.deck = game.player2.deck.concat(game.shuffleDeckCards.splice(0, playerDeckVal));
}

function competeRaunds() {
    for (let i = playerDeckVal - 1; i >= 0; i--) {
        let n = playerDeckVal - 1 - i;
        if (game.player1.deck[i].isTramp > game.player2.deck[i].isTramp) {
            game.player1.score[n] = 1;
        } else if (game.player1.deck[i].isTramp < game.player2.deck[i].isTramp) {
            game.player2.score[n] = 1;
        } else if (game.player1.deck[i].isTramp && game.player2.deck[i].isTramp) {
            if (game.player1.deck[i].value > game.player2.deck[i].value) {
                game.player1.score[n] = 1;
            } else {
                game.player2.score[n] = 1;
            }

        } else {
            if (game.player1.deck[i].value > game.player2.deck[i].value) {
                game.player1.score[n] = 1;
            } else if (game.player1.deck[i].value < game.player2.deck[i].value) {
                game.player2.score[n] = 1;
            }
        }
    }
}

function printWinner() {
    let winnerName;
    if (game.player1.allScore() > game.player2.allScore()) {
        winnerName = game.player1.name;
    } else if (game.player1.allScore() < game.player2.allScore()) {
        winnerName = game.player2.name;
    } else {
        winnerName = "Ничья!";
    }

    document.querySelector(".winner-name").textContent = winnerName;
    document.querySelector(".score").textContent = game.player1.allScore() + " : " + game.player2.allScore();
    document.querySelector(".suit").textContent = game.trump;
}







let myPromise = new Promise(function (resolve, reject) {
    document.querySelector(".btn-start").addEventListener("click", function () {
        game = new Game("Petia", "Vasia");
        createDeck();
        shuffleCards();
        splitShuffleDeckCards();
        competeRaunds();
        printWinner();
        resolve(true);
    });
}).then(
    function (result) {
        let i = playerDeckVal - 1;

        function showRow() {
            if (!i) {
                return;
            }

            let row = document.createElement("tr");

            let td1 = document.createElement("td");
            let cardPlayer1 = document.createElement("div");
            cardPlayer1.classList.add(game.player1.deck[i].suit);
            cardPlayer1.classList.add("value-" + game.player1.deck[i].value);

            let td2 = document.createElement("td");
            let cardPlayer2 = document.createElement("div");
            cardPlayer2.classList.add(game.player2.deck[i].suit);
            cardPlayer2.classList.add("value-" + game.player2.deck[i].value);

            td1.appendChild(cardPlayer1);
            row.appendChild(td1);
            td2.appendChild(cardPlayer2);
            row.appendChild(td2);
            document.querySelector(".game-results").appendChild(row);
            i--;
        }
        document.querySelector(".show-row").addEventListener("click", showRow);
    },
    function (error) {
        console.log("error: " + error);
    }
);








// }());
