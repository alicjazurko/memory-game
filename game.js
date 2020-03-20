const cardColor = ["red", "red", "blue", "blue", "pink", "pink", "yellow", "yellow", "green", "green", "purple", "purple", "grey", "grey", "khaki", "khaki", "orange", "orange"];

let cards = [...document.querySelectorAll("div")];

const startTime = new Date().getTime();

let activeCard = ""; //kliknieta
const activeCards = []; //para

const gamePairs = cards.length/2;
let gameResult = 0;

const clickCard = function() {
    activeCard = this;
    if(activeCard == activeCards[0]) return;
    activeCard.classList.remove("hidden");

    if(activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }
    else {
        cards.forEach(card => {
            card.removeEventListener("click", clickCard);
            activeCards[1] = activeCard;
            
            setTimeout(function(){
                if(activeCards[0].className === activeCards[1].className) {
                    activeCards.forEach(card => card.classList.add("off"))
                    gameResult++;
                    cards = cards.filter(card => !card.classList.contains('off'));
                    if(gameResult == gamePairs) {
                        const endTime = new Date().getTime(); 
                        const gameTimeSec = (endTime - startTime)/1000;
                        const gameTimeMin = Math.floor(gameTimeSec/60);
                        const seconds = Math.floor(gameTimeSec % 60);
                        if(gameTimeMin > 0) {
                            alert(`Wygrałeś! Twój czas to: ${gameTimeMin} min i ${seconds} sekund`);
                        } else {
                            alert(`Wygrałeś! Twój czas to: ${seconds} sekund`);
                        }
                        
                        location.reload();
                    }
                } else {
                    activeCards.forEach(card => card.classList.add("hidden"))
                }
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener("click", clickCard))
            }, 1000);

            }, 1000); 
            
    }
}

const init = function() {
    cards.forEach(function(card){
        const position = Math.floor(Math.random()*cardColor.length); //0-17
        card.classList.add(cardColor[position]); //dodawanie koloru
        cardColor.splice(position, 1) //usuwanie
    })

    setTimeout(function() {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 1000)
}

init()

