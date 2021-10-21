const newDeckBtn = document.querySelector(".new-deck-btn")
const drawCardsBtn = document.querySelector(".draw-cards-btn")
const url = "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
// const drawCardsUrl = `https://apis.scrimba.com/deckofcards/api/deck/${randomCardId}/draw/?count=2`
const imageArea = document.querySelector(".image-area")
const textSection = document.querySelector(".text-section")

let randomCardId;

const getNewDeck = () => {
    fetch(url, {method: "GET"})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        const randomCardId = data.deck_id
        console.log(randomCardId)
    })
}




// const drawCards = () => {
//     fetch(`https://apis.scrimba.com/deckofcards/api/deck/new/draw/?count=2`)
//     .then((responseDrawCards) => {
//         return responseDrawCards.json()
//     })
//     .then((dataDrawCards) => {
//         console.log(dataDrawCards)
//         const result = dataDrawCards.cards
//         const results = result.filter((e) => {
//             console.log(e.image)
//             // image.src = e.image 
//             return `
//             <img src="${e.image}"/>
//             `
//         })
//         image.innerHTML = results
//     })
// }


const drawCards = () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/new/draw/?count=2`)
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
    console.log(card.remaining)
    //ACCESSES THE CARD IMGS AND PLACES THEM INTO DIV
    result.filter((e) => {
        console.log(e.image)
        const img = document.createElement('img')
        img.classList.add("card-image")
        img.src = e.image
        imageArea.appendChild(img);
        console.log(e.value)           
    })
    //CONTAINS LOGIC FOR PLAYING GAME
    const playGame = () => {
        if (computerCard > myCard) {
            return ("computer wins")
    
        }
        else if (computerCard < myCard) {
            return ("i win")
        }
        else if (computerCard === myCard) {
            return ("it's a tie");    
        }
    }
    playGame()
    // console.log(playGame())
    textSection.innerText = (`
        Remaining: ${card.remaining}
        ${playGame()}
    `)   
}




newDeckBtn.addEventListener("click", getNewDeck)
drawCardsBtn.addEventListener("click", drawCards)







// const set = () => {
//     console.log("i set it up")
// }
// setTimeout(set, 2000)

// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]


// const filterArray = (array, callback) => {
//     const resultingArray = []
//     array.filter((element) => {
//         const shoudBeIncluded = callback(element)
//         if (shoudBeIncluded === "Jack") {
//             resultingArray.push(element)
//         }
//     })
//     return resultingArray
       
// }


// const peopleWithPets = filterArray(people, (person) => {
//     return person.name
// })

// console.log(peopleWithPets)



// const voters = [
//     {name: "Joe", email: "joe@joe.com", voted: true},
//     {name: "Jane", email: "jane@jane.com", voted: true},
//     {name: "Bo", email: "bo@bo.com", voted: false},
//     {name: "Bane", email: "bane@bane.com", voted: false}
// ]

// const pplWhoVoted = voters.filter((element) => {
//     return element.voted === true
// })

// const mappedPpl = pplWhoVoted.map((e) => {
//     return e.email
// })

// console.log(mappedPpl)


// const arrayzz = voters.filter((element) => {
//     return element.voted
// }).map((e) => {
//     return e.email
// })
// console.log(arrayzz)

