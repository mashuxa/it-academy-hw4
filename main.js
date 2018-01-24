(function () {
    "use strict";
    //
    // let myPromise = new Promise(function(resolve, reject){
    //
    //     return setTimeout(function(){
    //
    //         resolve("tratata");
    //         let a = 2;
    //         return a;
    //     }, 3000);
    //
    // });
    //
    // myPromise.then(
    //     function(result){
    //         console.log(result);
    //     },
    //     function(error){
    //         console.log("error: " + error);
    //     }
    // );

    const COUNT_SUIT = 4;
    const SUITS = ["hearts", "diamonds", "clubs", "spades"];
    const VALUE_DECK = 36;
    const MAX_VALUE_CARDS = 14;
    const MIN_VALUE_CARDS = 6;
    const VALUE_PLAYER = 2;


    let deckCards = [];
    let shuffleDeckCards = [];
    let player1 = [];
    let player2 = [];
    let trump;
    let cardUniqCounter = new Set();

    function getRandomVal(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    function setName(obj){
        let objName;
        if (obj.value < 11 && obj.value > 5) {
            objName = obj.value.toString();
        } else if(obj.value > 10 && obj.value < 15) {
            switch (obj.value){
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
        return objName + " " + obj.suit;


    }
    function setIsTrump(obj) {
        return obj.suit.toLowerCase() === trump.toLowerCase();
    }
    function Card(suit, value){
        this.suit = suit;
        this.value = value;
        this.isTramp = setIsTrump(this);
        this.name = setName(this);
    }

    function createDeck() {
        for (let value = MIN_VALUE_CARDS; value <= MAX_VALUE_CARDS; value++){
            for(let n = 0; n < SUITS.length; n++){
                let card = new Card(SUITS[n], value);
                deckCards.push(card);
            }
        }
    }
    function shuffleCards(){
        while(deckCards.length){
            shuffleDeckCards = shuffleDeckCards.concat(deckCards.splice(getRandomVal(0, deckCards.length), 1));
        }
    }
    function splitShuffleDeckCards(){
        player1 = player1.concat(shuffleDeckCards.splice(0, VALUE_DECK/VALUE_PLAYER));
        player2 = player2.concat(shuffleDeckCards.splice(0));
    }










    function startGame() {
        trump = SUITS[getRandomVal(0, COUNT_SUIT - 1)];
        createDeck();
        shuffleCards();
        splitShuffleDeckCards();
        console.log(player1);
        console.log(player2);
    }

document.querySelector(".btn-start").addEventListener("click", startGame);









}());