const firstPageEl = document.querySelector('.firstPage') // for display purpose
const secondPageEl = document.getElementById('secondPage') // for display purpose
const imageEL = document.querySelector('#countryImage') // rendering the image
const guessesEl = document.querySelector('#guesses') // displaying how many guesses made
const allGuessingButtonsEl = document.querySelector('#allGuessingButtons') // buttons for guessing who's the country
const optionsButtonsEl = document.querySelector('.optionsButtons') // buttons for choosing how many rounds to play
const rightGuessesEl = document.querySelector('#rightGuesses') // displaying how many right-guesses the user have
const wrongGuessesEl = document.querySelector('#wrongGuesses') // displaying how many wrong-guesses the user have
const resultsEl = document.querySelector('#results') // empty container for rendering the result

// buttons for rendering the country names
const firstButtonEl = document.querySelector('#firstButton')
const secondButtonEl = document.querySelector('#secondButton')
const thirdButtonEl = document.querySelector('#thirdButton')
const forthButtonEl = document.querySelector('#forthButton')

//variables for the global-scoope
let currentIndex = 0 // index for randomize current country
let currentCountry // identifing the country on the image
let guesses // variabel for showing number of guesses
let maxRounds // variabel for identifing the games max amount of rounds
let rounds // to count amount of rounds
let rightGuesses = 0 // counter for right-guesses
let wrongGuesses = 0 // counter for wrong-guesses
let rightGuessesList = [] // array for names on right-guesses
let wrongGuessesList = [] // array for names on wrong guesses

//functions to hind and unhide elements
const hideElement = element => element.classList.add('hide')
const unhideElement = element => element.classList.remove('hide')

//function for randomize arrays
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const shuffledCountries = [...countries] // clone `countries` array
shuffleArray(shuffledCountries) // shuffle the `shuffledcountries` array

let allCountries = shuffledCountries // clone of the list off countries
let tenCountries = shuffledCountries.slice(0, 10) // list of 10 countries
let twentyCountries = shuffledCountries.slice(0, 20) // list of 20 countries

//function to get three random options for names + correct name on shuffled places
const gameRound = () => {
  currentCountry = shuffledCountries[currentIndex] //the correnct name for image

  const allAnswers = buttonOptions(currentCountry, shuffledCountries) // all options for buttons

  shuffleArray(allAnswers) // shuffel buttonoptions

  // rendering buttons in DOM
  ;[firstButtonEl, secondButtonEl, thirdButtonEl, forthButtonEl].forEach(
    (el, index) => {
      el.innerHTML = allAnswers[index]
    }
  )

  // rendering image in DOM
  imageEL.src = currentCountry.image
  currentIndex++

  // if the currentindex reaches it´s limit, to reset
  if (currentIndex >= shuffledCountries.length) {
    currentIndex = 0
  }
}

// function for three incorrect button options
const buttonOptions = (currentCountry, shuffledCountries) => {
  const randomNumbers = Math.floor(Math.random() * (countries.length - 3))

  const incorrectOptions = shuffledCountries
    .filter(country => country.name !== currentCountry.name) // filtering out the right name
    .map(country => country.name) // names only from objects
    .slice(randomNumbers, randomNumbers + 3) // slicing out three names

  return incorrectOptions.concat(currentCountry.name)
}

// function for resetting the game for a new round
const restartGame = () => {
  shuffleArray(shuffledCountries)
  guesses = 0
  rightGuesses = 0
  wrongGuesses = 0
  rightGuessesList = []
  wrongGuessesList = []
  rounds = 0
  updateGuesses(guesses)
  updateCounters()
}

// function for updating DOM with guesses made
const updateGuesses = guess => {
  guessesEl.innerText = guess === 1 ? `${guess} guess` : `${guess} guesses`
}

// function to show in markup the amount of right vs wrong guesses per round
function updateCounters() {
  rightGuessesEl.innerText = `Right Guesses: ${rightGuesses}`
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}`
}

// event listner: listening for how many rounds the user want´s to play
optionsButtonsEl.addEventListener('click', e => {
  e.preventDefault()
  e.stopPropagation()

  // checking the value off clicked button
  if (e.target.tagName === 'BUTTON') {
    if (e.target.value === '10') {
      allCountries = tenCountries
      maxRounds = 10
    } else if (e.target.value === '20') {
      allCountries = twentyCountries
      maxRounds = 20
    } else if (e.target.value === 'all') {
      allCountries = shuffledCountries
      maxRounds = allCountries.length
    }

    rounds = 0
  }

  guesses = 0
  updateGuesses(guesses)
  gameRound()

  hideElement(firstPageEl)
  unhideElement(secondPageEl)
})

// event listner: listening for the four option buttons off names
allGuessingButtonsEl.addEventListener('click', e => {
  e.preventDefault()
  e.stopPropagation()

  // checking if the clicked button contains the right name
  if (e.target.tagName === 'BUTTON') {
    const guessedName = e.target.innerHTML

    if (guessedName === currentCountry.name) {
      e.target.style.backgroundColor = 'green'
      rightGuesses++
      rightGuessesList.push(currentCountry)
    } else if (guessedName !== currentCountry.name) {
      e.target.style.backgroundColor = 'red'
      wrongGuesses++
      wrongGuessesList.push({
        guessedName: guessedName,
        currentCountry: currentCountry,
      })
    }

    guesses++
    updateGuesses(guesses)
    updateCounters()
    rounds++

    // using a timer to let the results show, if maxrounds displaying results
    if (rounds < maxRounds) {
      setTimeout(() => {
        e.target.style.backgroundColor = ''
        gameRound()
      }, 1000)
    } else {
      hideElement(secondPageEl)
      displayResults()
      e.target.style.backgroundColor = ''
      guesses = 0
    }
  }
})

// function to display results in the end off the game
function displayResults() {
  const resultOutput =
    rightGuesses >= wrongGuesses ? 'images/winner.gif' : 'images/loser.gif'

  const wrongGuessesDisplay = wrongGuessesList
    .map(
      country =>
        `<li>Guessed: ${country.guessedName}, Correct: ${country.currentCountry.name}</li> `
    )
    .join('')

  resultsEl.innerHTML = `<div id="resultsWrapper"><figure><img id="result-gif" class="img-fluid" src=${resultOutput}></figure>
  <h3>Wrong guessed countries:</h3>
  <ul class="result-list">${wrongGuessesDisplay}</ul>
  <p id="result-p">🟢 You had ${rightGuesses} right guesses and ${wrongGuesses} wrong guesses 🔴</p>
  <button id="restartButton" type="button">Start new game!</button></div>
  `

  // add event listener for restart button
  const restartButton = document.getElementById('restartButton')
  restartButton.addEventListener('click', e => {
    e.preventDefault()

    const resultsWrapper = document.getElementById('resultsWrapper')
    resultsWrapper.remove()
    unhideElement(firstPageEl)
    restartGame()
  })
}
