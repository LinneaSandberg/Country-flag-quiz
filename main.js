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
let correctStudent; // identifing the student on the image
let guesses; // variabel for showing number of guesses
let maxRounds; // variabel for identifing the games max amount of rounds
let rounds; // to count amount of rounds
let rightGuesses = 0; //counter for right-guesses
let wrongGuesses = 0; //counter for wrong-guesses
let rightGuessesList = []; //array for names on right-guesses
let wrongGuessesList = []; //array for names on wrong guesses
let currentGuess = []; //array for current-guess
let improvments = []; //array to keep track on users improvment status

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

//list of 10 students
const studentTen = shuffledStudents.filter((student, index) => index < 10);
console.log(studentTen);

//list of 20 students
const twentyStudents = shuffledStudents.filter((student, index) => index < 20);
console.log(twentyStudents);

const allStudents = shuffledStudents;
console.log(allStudents);

//function to get three random options for names + correct name on shuffled places
const gameRound = () => {
  correctStudent = shuffledStudents[0]; //the correnct name for image
  console.log(correctStudent.name);

  const incorrectOptions = shuffledStudents
    .filter((student) => student.name !== correctStudent.name) //filter out the correct students name, to not display twice in one round
    .map((student) => student.name) //this gives me back an array with all the names only
    .slice(0, 3); //using .slice to only get three incorrect options

  let buttonOptions = [...incorrectOptions, correctStudent.name]; //making an array of all the four names
  shuffleArray(buttonOptions); //shuffling the array

  //set button-text with buttonOptions[index]
  firstButtonEl.innerHTML = buttonOptions[0];
  secondButtonEl.innerHTML = buttonOptions[1];
  thirdButtonEl.innerHTML = buttonOptions[2];
  forthButtonEl.innerHTML = buttonOptions[3];

  [firstButtonEl, secondButtonEl, thirdButtonEl, forthButtonEl].forEach(
    (el, index) => {
      el.innerHTML = buttonOptions[index];
    }
  );
};

//function for getting the image
function showImage() {
  correctStudent = shuffledStudents[0];
  imageEL.src = correctStudent.image;
}

// Function for updating DOM with guesses made
const updateGuesses = (guess) => {
  guessesEl.innerText = guess === 1 ? `${guess} guess` : `${guess} guesses`;
};

const newRound = () => {
  shuffleArray(shuffledStudents);
  showImage();
  gameRound();
};

optionsButtonsEl.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.tagName === "BUTTON") {
    let numberOfRounds;
    let all = shuffledStudents.length;

    if (e.target.value === "10") {
      numberOfRounds = 10;
      studentTen;
    } else if (e.target.value === "20") {
      numberOfRounds = 20;
      twentyStudents;
    } else if (e.target.value === "all") {
      numberOfRounds = shuffledStudents.length;
    }

    maxRounds = numberOfRounds;
    rounds = 0;
  }

  guesses = 0;
  updateGuesses(guesses);
  showImage();
  gameRound();

  unhideElement(secondPageEl);
  hideElement(firstPageEl);
  hideElement(howManyEl);
  hideElement(buttonForTenEl);
  hideElement(buttonForTwentyEl);
  hideElement(buttonForAllEl);
});

allGuessingButtonsEl.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.tagName === "BUTTON") {
    const guessedName = e.target.innerHTML;

    showImage();

    if (guessedName === correctStudent.name) {
      console.log("correct");
      e.target.style.backgroundColor = "green";
      rightGuesses++;
      rightGuessesList.push(correctStudent);
      currentGuess.push({ correct: true, student: correctStudent });
      improvments.push("getting better....!");
    } else if (guessedName !== correctStudent.name) {
      console.log("wrong");
      e.target.style.backgroundColor = "red";
      wrongGuesses++;
      wrongGuessesList.push({
        guessedName: guessedName,
        correctStudent: correctStudent,
      });
      currentGuess.push({ correct: false, student: correctStudent });
      improvments.push("getting worse...");
    }
    console.log(`correct answear: ${correctStudent.name}`);

    guesses++;
    updateGuesses(guesses);

    updateCounters();
    rounds++;

    if (rounds >= maxRounds) {
      displayResults();
      hideElement(secondPageEl);
      guesses = 0;
    } else {
      setTimeout(() => {
        e.target.style.backgroundColor = "";
        newRound();
      }, 1000);
    }
  }
});

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
        `<li>Guessed: ${student.guessedName}, Correct: ${student.correctStudent.name}</li> `
    )
    .join("");

  resultsEl.innerHTML = `<figure><img class="img-fluid" src=${resultOutput}></figure>
  <ul class="result-list">
  <li>Right guesssed names: ${rightGuesses}</li>
  <li>Wrong guessed names: ${wrongGuesses}</li>
  <li>Improvment status: ${improvments.join(", ")}</li>
  <li>Last Guesses:
  <ul>${currentGuess
    .map(
      (guess) =>
        `<li>${guess.correct ? "Correct" : "Wrong"} - ${
          guess.student.name
        }</li>`
    )
    .join("")}</ul>
  </li>
  <li>Correct guessed students: 
  <ul>${rightGuessesList
    .map((student) => `<li>${student.name}</li>`)
    .join("")}</ul>
  </li>
  <li>Wrong guessed students: 
  <ul>${wrongGuessesDisplay}</ul>
  </li>
  </ul>`;
}

/*
  // const studentToShow = shuffledStudents
  //   .filter((student) => student.image !== correctStudent)
  //   .map((student) => student.image);

  
 resultsEl.innerHTML = `<figure><img class="img-fluid" src=${resultOutput}></figure>
  <ul id="result-list">
  <li>Right guessed names: ${rightGuesses}</li>
  <li>Wrong guessed names: ${wrongGuesses}</li>
  </ul>
  `;

const rightGuessListEl = document.getElementById("rightGuessList");
const wrongGuessListEl = document.getElementById("wrongGuessList");

rightGuesses.forEach((student) => {
  const listItem = document.createElement("li");
  listItem.innerText = `Right guessed names: ${student.name}`;
  rightGuessListEl.appendChild(listItem);
});

wrongGuesses.forEach((student) => {
  const listItem = document.createElement("li");
  listItem.innerText = `Wrong guessed names: ${student.name}`;
  wrongGuessListEl.appendChild(listItem);
});


// buttonForTenEl.addEventListener("click", (e) => {
//   e.preventDefault();
//   guesses = 0;
//   updateGuesses(guesses);
//   showImage();
//   gameRound();
//   secondPageEl.classList.remove("hide");
//   hideElement(buttonForTenEl);
//   hideElement(buttonForTwentyEl);
//   hideElement(buttonForAllEl);
// });

// buttonForTwentyEl.addEventListener("click", (e) => {
//   e.preventDefault();
//   guesses = 0;
//   updateGuesses(guesses);
//   showImage();
//   gameRound();
//   secondPageEl.classList.remove("hide");
// });

// buttonForAllEl.addEventListener("click", (e) => {
//   e.preventDefault();
//   guesses = 0;
//   updateGuesses(guesses);
//   showImage();
//   gameRound();
//   secondPageEl.classList.remove("hide");
// });

*/
