// (function () {
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
    // Diamonds	Бубны
    // Hearts	Червы/черви
    // Spades	Пики
    // Clubs	Трефы
    // Ace	Туз = 14
    // King	Король = 13
    // Queen	Дама = 12
    // Jack	Валеt = 11

    let player1 = [];
    let player2 = [];

    // Example
    let trump = "Hearts";


    function setName(obj){
        let objName;
        if (obj.value < 11 && obj.value > 5) {
            objName = obj.value.toString();
        } else if(obj.value > 10 && obj.value < 15) {
            switch (obj.value){
                case 11:
                    objName = "Jack";
                    break;
                case 12:
                    objName = "Queen";
                    break;
                case 13:
                    objName = "King";
                    break;
                case 14:
                    objName = "Ace";
                    break;
            }
        }
        return objName + " " + obj.suit;


    }
    function setIsTrump(obj) {
        return obj.suit.toLowerCase() === trump.toLowerCase();
    }

    function Card(name, suit, value, isTrump){
        this.suit = suit;
        this.value = value;
        this.isTramp = setIsTrump(this);
        this.name = setName(this);
    }

    function getResults(){
        console.log("player1's cards: " + player1);
        console.log("player2's cards: " + player2);
    }
    // Example
let card = new Card("Jack", "Hearts", 11, false);



// function createNewCard(){}

// function  dealCards(){        getResults();}


// document.querySelector(".get-cards").addEventListener("click", dealCards);


    //
    // let setCards = new Promise(function(resolve, reject){
    //     document.querySelector(".btn-start").addEventListener("click", function(){
    //         resolve(true);
    //     });
    // });
    //
    // setCards.then(
    //     function(result){
    //         if(result){
    //             startGame();
    //         }
    //     },
    //     function(error){
    //         console.log("error: " + error);
    //     }
    // );





















// }());