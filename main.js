const firstPageEl = document.querySelector(".firstPage"); // for display purpose
const secondPageEl = document.getElementById("secondPage"); // for display purpose
const imageEL = document.querySelector("#studentImage"); // rendering the image
const guessesEl = document.querySelector("#guesses"); // displaying how many guesses made
const allGuessingButtonsEl = document.querySelector("#allGuessingButtons"); // buttons for guessing who's the student
const optionsButtonsEl = document.querySelector(".optionsButtons"); // buttons for choosing how many rounds to play
const rightGuessesEl = document.querySelector("#rightGuesses"); // displaying how many right-guesses the user have
const wrongGuessesEl = document.querySelector("#wrongGuesses"); // displaying how many wrong-guesses the user have
const resultsEl = document.querySelector("#results"); // empty container for rendering the result

// buttons for rendering the student names
const firstButtonEl = document.querySelector("#firstButton");
const secondButtonEl = document.querySelector("#secondButton");
const thirdButtonEl = document.querySelector("#thirdButton");
const forthButtonEl = document.querySelector("#forthButton");

//variables for the global-scoope
let currentIndex = 0; // index for randomize current student
let currentStudent; // identifing the student on the image
let guesses; // variabel for showing number of guesses
let maxRounds; // variabel for identifing the games max amount of rounds
let rounds; // to count amount of rounds
let rightGuesses = 0; //counter for right-guesses
let wrongGuesses = 0; //counter for wrong-guesses
let rightGuessesList = []; //array for names on right-guesses
let wrongGuessesList = []; //array for names on wrong guesses

//functions to hind and unhide elements
const hideElement = (element) => element.classList.add("hide");
const unhideElement = (element) => element.classList.remove("hide");

//function for randomize arrays
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const shuffledStudents = [...students]; // clone `students` array
shuffleArray(shuffledStudents); // shuffle the `shuffledStudents` array

let allStudents = shuffledStudents; // clone of the list off students
let tenStudents = shuffledStudents.slice(0, 10); // list of 10 students
let twentyStudents = shuffledStudents.slice(0, 20); // list of 20 students

//function to get three random options for names + correct name on shuffled places
const gameRound = () => {
  currentStudent = shuffledStudents[currentIndex]; //the correnct name for image

  const allAnswers = buttonOptions(currentStudent, shuffledStudents);
  console.log({ allAnswers });

  shuffleArray(allAnswers);

  [firstButtonEl, secondButtonEl, thirdButtonEl, forthButtonEl].forEach(
    (el, index) => {
      el.innerHTML = allAnswers[index];
    }
  );

  imageEL.src = currentStudent.image;
  currentIndex++;

  if (currentIndex >= shuffledStudents.length) {
    currentIndex = 0;
  }
};

// function for three incorrect button options
const buttonOptions = (currentStudent, shuffledStudents) => {
  const randomNumbers = Math.random() * (students.length - 3);

  const incorrectOptions = shuffledStudents
    .filter((student) => student.name !== currentStudent.name)
    .map((student) => student.name)
    .slice(randomNumbers, randomNumbers + 3);

  return incorrectOptions.concat(currentStudent.name);
};

// function for resetting the game for new round
const restartGame = () => {
  shuffleArray(shuffledStudents);
  guesses = 0;
  rightGuesses = 0;
  wrongGuesses = 0;
  rightGuessesList = [];
  wrongGuessesList = [];
  rounds = 0;
  updateGuesses(guesses);
  updateCounters();
  hideElement(resultsEl);
  unhideElement(firstPageEl);
};

// function for updating DOM with guesses made
const updateGuesses = (guess) => {
  guessesEl.innerText = guess === 1 ? `${guess} guess` : `${guess} guesses`;
};

// function to show in markup the amount of right vs wrong guesses per round
function updateCounters() {
  rightGuessesEl.innerText = `Right Guesses: ${rightGuesses}`;
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}`;
}

// function to display results in the end off the game
function displayResults() {
  const resultOutput =
    rightGuesses >= wrongGuesses ? "images/winner.gif" : "images/loser.gif";

  const wrongGuessesDisplay = wrongGuessesList
    .map(
      (student) =>
        `<li>Guessed: ${student.guessedName}, Correct: ${student.currentStudent.name}</li> `
    )
    .join("");

  resultsEl.innerHTML = `<figure><img id="result-gif" class="img-fluid" src=${resultOutput}></figure>
  <h3>Wrong guessed students:</h3>
  <ul class="result-list">${wrongGuessesDisplay}</ul>
  <p id="result-p">🟢 You had ${rightGuesses} right guesses and ${wrongGuesses} wrong guesses 🔴</p>
  <button id="restartButton">Restart new game!</button>
  `;
}

// event listner: listening for how many rounds the user want´s to play
optionsButtonsEl.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.tagName === "BUTTON") {
    let numberOfRounds;

    if (e.target.value === "10") {
      allStudents = tenStudents;
      maxRounds = 10;
    } else if (e.target.value === "20") {
      allStudents = twentyStudents;
      maxRounds = 20;
    } else if (e.target.value === "all") {
      allStudents = shuffledStudents;
      maxRounds = allStudents.length;
    }

    rounds = 0;
  }

  guesses = 0;
  updateGuesses(guesses);
  gameRound();

  unhideElement(secondPageEl);
  hideElement(firstPageEl);
});

// event listner: listening for the four option buttons off names
allGuessingButtonsEl.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.tagName === "BUTTON") {
    const guessedName = e.target.innerHTML;

    if (guessedName === currentStudent.name) {
      e.target.style.backgroundColor = "green";
      rightGuesses++;
      rightGuessesList.push(currentStudent);
    } else if (guessedName !== currentStudent.name) {
      e.target.style.backgroundColor = "red";
      wrongGuesses++;
      wrongGuessesList.push({
        guessedName: guessedName,
        currentStudent: currentStudent,
      });
    }

    guesses++;
    updateGuesses(guesses);
    updateCounters();
    rounds++;

    if (rounds < maxRounds) {
      setTimeout(() => {
        e.target.style.backgroundColor = "";
        gameRound();
      }, 1000);
    } else {
      displayResults();
      e.target.style.backgroundColor = "";
      hideElement(secondPageEl);
      guesses = 0;
    }
  }
});

// event listner: listening for the user resetting the game
resultsEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    restartGame();
  }
});
