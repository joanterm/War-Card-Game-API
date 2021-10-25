const newDeckBtn = document.querySelector(".new-deck-btn");
const drawCardsBtn = document.querySelector(".draw-cards-btn");
const imageArea = document.querySelector(".image-area");
const textSection = document.querySelector(".text-section");
const computerScoreArea = document.querySelector(".computer-score-area");
const myScoreArea = document.querySelector(".my-score-area");
const winnerTextArea = document.querySelector(".winner-text-area");
const url = "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/";
let computerScore = 0;
let myScore = 0;
let deckId = "";


const getNewDeck = () => {
    fetch(url, {method: "GET"})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        //CAN'T PUT LET/CONST HERE B/C IT'S ALREADY ASSIGNED TO ""
        deckId = data.deck_id
        console.log(deckId)
        console.log(data.remaining)
        textSection.innerHTML = `You start with: ${data.remaining} cards` 
    })
}

const drawCards = () => {
    //ALLOWS TO ACCESS OUR DECK ID
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((responseDrawCards) => {
        return responseDrawCards.json()
    })
    .then((dataDrawCards) => {
        console.log(dataDrawCards) 
        displayCards(dataDrawCards)
    })
}


const displayCards = (card) => {
    const result = card.cards
    const computerCard = result[0].value  
    const myCard = result[1].value
    const cardsRemaining = card.remaining -- //DECREASING FROM THE ORIGINAL NUMBER OF 52
    console.log(cardsRemaining)
    imageArea.innerHTML = ""; //RESETS THE LOGIC AFTER LOOP RUNS FOR THE 1ST TIME

    //LOOPS, ACCESSES THE CARD IMGS FROM API AND PLACES THEM INTO DIV
    result.filter((e) => {
        console.log(e.image)
        const img = document.createElement('img')
        img.classList.add("card-image") //FOR CSS STYLING PURPOSES ONLY
        img.src = e.image
        imageArea.appendChild(img);      
    })
    //CONTAINS LOGIC FOR PLAYING GAME
    const playGame = () => {
        if (computerCard > myCard) {
            computerScore++
            computerScoreArea.innerHTML = `Computer score: ${computerScore}` 
            winnerTextArea.innerHTML = "Computer wins!"
        }
        else if (computerCard < myCard) {
            myScore++
            myScoreArea.innerHTML = `My Score: ${myScore}`
            winnerTextArea.innerHTML = "You win!"
        }
        else if (computerCard === myCard) {
            winnerTextArea.innerHTML = "It's a tie!"   
        }
    }
    //CONTAINS LOGIC TO DISABLE BUTTON ONCE THERE ARE NO MORE CARDS LEFT
    const disableButton = () => {
        if (cardsRemaining === 0) {
            drawCardsBtn.disabled = true;
            drawCardsBtn.classList.add("disable-btn-style")
        }
    }
    const annouceWinner = () => {
        if (cardsRemaining === 0 && computerScore > myScore) {
            winnerTextArea.innerHTML = "<span>COMPUTER WON THE GAME!</span>"
        }
        else if (cardsRemaining === 0 && computerScore < myScore) {
            winnerTextArea.innerHTML = "<span>YOU WON THE GAME!</span>"
        }
        else if (cardsRemaining === 0 && computerScore === myScore) {
            winnerTextArea.innerHTML = "<span>IT'S A TIE BETWEEN YOU TWO!</span>"
        }
    }
    playGame()
    textSection.innerHTML = (`
        Remaining: ${cardsRemaining}
    `) 
    disableButton() 
    annouceWinner()
}

newDeckBtn.addEventListener("click", getNewDeck)
drawCardsBtn.addEventListener("click", drawCards)