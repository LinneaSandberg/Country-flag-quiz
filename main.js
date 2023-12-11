const firstPageEl = document.querySelector(".firstPage"); //hiding
const howManyEl = document.querySelector("#howMany"); //also for hiding
const secondPageEl = document.getElementById("secondPage"); //aswell for hiding
const imageEL = document.querySelector("#studentImage"); //rendering the image
const guessesEl = document.querySelector("#guesses"); //rendering how many guesses made
const allGuessingButtonsEl = document.querySelector("#allGuessingButtons"); //all the buttons for guessing who's the student
const optionsButtonsEl = document.querySelector(".optionsButtons"); //all buttons for choosing how many rounds to play
const rightGuessesEl = document.querySelector("#rightGuesses"); //rendering how many right-guesses the user have
const wrongGuessesEl = document.querySelector("#wrongGuesses"); //rendering how many wrong-guesses the user have
const resultsEl = document.querySelector("#results"); //empty conatiner to display the result after the game

//buttons for rendering the names off students
const firstButtonEl = document.querySelector("#firstButton");
const secondButtonEl = document.querySelector("#secondButton");
const thirdButtonEl = document.querySelector("#thirdButton");
const forthButtonEl = document.querySelector("#forthButton");

//each button for choosing how many rounds
const buttonForTenEl = document.querySelector("#buttonForTen");
const buttonForTwentyEl = document.querySelector("#buttonForTwenty");
const buttonForAllEl = document.querySelector("#buttonForAll");

//variables for the global-scoope
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
console.log("Students after proper shuffling:", shuffledStudents);

// clone of the list off students
let allStudents = shuffledStudents;
console.log(allStudents);

//list of 10 students
let tenStudents = shuffledStudents.slice(0, 10);
console.log(tenStudents);

//list of 20 students
let twentyStudents = shuffledStudents.slice(0, 20);
console.log(twentyStudents);

let currentIndex = 0;
//function to get three random options for names + correct name on shuffled places
const gameRound = () => {
  currentStudent = shuffledStudents[currentIndex]; //the correnct name for image
  console.log("currentStudent: ", currentStudent.name);

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

const buttonOptions = (currentStudent, shuffledStudents) => {
  console.log({ currentStudent });
  console.log({ shuffledStudents });

  const randomNumbers = Math.random() * (students.length - 3);
  console.log("randomNumbers: ", randomNumbers);

  const incorrectOptions = shuffledStudents
    .filter((student) => student.name !== currentStudent.name)
    .map((student) => student.name)
    .slice(randomNumbers, randomNumbers + 3);

  return incorrectOptions.concat(currentStudent.name);
};

// // Function for a new round off the game
// const newRound = () => {
//   shuffleArray(shuffledStudents);
//   gameRound();
// };

// Function for resetting the game state for a new round
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

// Function for updating DOM with guesses made
const updateGuesses = (guess) => {
  guessesEl.innerText = guess === 1 ? `${guess} guess` : `${guess} guesses`;
};

//function to show in markup the amount of right vs wrong guesses per round
function updateCounters() {
  rightGuessesEl.innerText = `Right Guesses: ${rightGuesses}`;
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}`;
}

//function using ternary operator to display GIF according to how good the user are at guessing the names
function displayResults() {
  const resultOutput =
    rightGuesses >= wrongGuesses ? "images/winner.gif" : "images/loser.gif";

  const wrongGuessesDisplay = wrongGuessesList
    .map(
      (student) =>
        `<li>Guessed: ${student.guessedName}, Correct: ${student.currentStudent.name}</li> `
    )
    .join("");

  resultsEl.innerHTML = `<figure><img class="img-fluid" src=${resultOutput}></figure>
  <ul class="result-list"> Wrong guessed students: ${wrongGuessesDisplay}
  </ul>
  <p>You had ${rightGuesses} right guesses and ${wrongGuesses} wrong guesses</p>
  <button id="restartButton">Restart new game!</button>
  
  `;
}

// Event listner for how many rounds to output
optionsButtonsEl.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.tagName === "BUTTON") {
    let numberOfRounds;

    if (e.target.value === "10") {
      allStudents = tenStudents;
      maxRounds = 10;
      console.log("selected 10 students: ", tenStudents);
    } else if (e.target.value === "20") {
      allStudents = twentyStudents;
      maxRounds = 20;
      console.log("selected 20 students: ", twentyStudents);
    } else if (e.target.value === "all") {
      allStudents = shuffledStudents;
      maxRounds = allStudents.length;
      console.log("Selected 41 students:", allStudents);
    }

    // maxRounds = allStudents.length;
    rounds = 0;
  }

  guesses = 0;
  updateGuesses(guesses);
  gameRound();

  unhideElement(secondPageEl);
  hideElement(firstPageEl);
});

// event listner for the four option buttons
allGuessingButtonsEl.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  // console.log("rounds:", rounds, "maxRounds:", maxRounds);

  if (e.target.tagName === "BUTTON") {
    const guessedName = e.target.innerHTML;

    if (guessedName === currentStudent.name) {
      // console.log("correct");
      e.target.style.backgroundColor = "green";
      rightGuesses++;
      rightGuessesList.push(currentStudent);
    } else if (guessedName !== currentStudent.name) {
      // console.log("wrong");
      e.target.style.backgroundColor = "red";
      wrongGuesses++;
      wrongGuessesList.push({
        guessedName: guessedName,
        currentStudent: currentStudent,
      });
    }
    console.log(`correct answear: ${currentStudent.name}`);

    console.log("rounds:", rounds, "maxRounds:", maxRounds);

    guesses++;
    updateGuesses(guesses);

    updateCounters();
    rounds++;

    if (rounds < maxRounds) {
      console.log("maxRounds: ", maxRounds);
      console.log("rounds: ", rounds);
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

// event listner for the reset game button
resultsEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("button clicked");

    restartGame();
  }
});

/*

    //   if (rounds >= maxRounds) {
    //     displayResults();
    //     e.target.style.backgroundColor = "";
    //     hideElement(secondPageEl);
    //     guesses = 0;
    //   } else {
    //     setTimeout(() => {
    //       e.target.style.backgroundColor = "";
    //       gameRound();
    //     }, 1000);
    //   }



<button id="restartButton">Restart new game!</button>

*/
