const firstPageEl = document.getElementById("firstPage");
const secondPageEl = document.getElementById("secondPage");
const theGameEl = document.querySelector("#theGame");
const randomNameEl = document.querySelectorAll(".randomName");
const imageEL = document.querySelector("#studentImage");
const choiceEl = document.querySelectorAll("#choice");
const firstButton = document.querySelector("#firstButton");
const secondButton = document.querySelector("#secondButton");
const thirdButton = document.querySelector("#thirdButton");
const forthButton = document.querySelector("#forthButton");
const guessesEl = document.querySelector("#guesses");
const allGuessingButtonsEl = document.querySelector("#allGuessingButtons");

// dom referenser till antalet rundor spelaren vill spela
const buttonForTenEl = document.querySelector("#buttonForTen");
const buttonForTwentyEl = document.querySelector("#buttonForTwenty");
const buttonForAllEl = document.querySelector("#buttonForAll");

//functioner för att dölja och visa olika sidor
const hideElement = (element) => element.classList.add("hide");
const unhideElement = (element) => element.classList.remove("hide");

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
const studentTen = shuffledStudents.slice(0, 10);
console.log(studentTen);

//list of 20 students
const twentyStudents = shuffledStudents.slice(0, 20);
console.log(twentyStudents);

//list off all students

let correctStudent;
//function to get three random options for names
const gameRound = () => {
  //the correnct name for image
  correctStudent = shuffledStudents[0].name;
  console.log(correctStudent);

  const incorrectOptions = shuffledStudents
    .filter((student) => student.name !== correctStudent)
    .map((student) => student.name)
    .slice(0, 3);

  let buttonOptions = [...incorrectOptions, correctStudent];
  shuffleArray(buttonOptions);
  //const buttonOptions = shuffleArray([...incorrectOptions, correctStudent]);

  //set button-text with buttonOptions[index]
  firstButton.innerHTML = buttonOptions[0];
  secondButton.innerHTML = buttonOptions[1];
  thirdButton.innerHTML = buttonOptions[2];
  forthButton.innerHTML = buttonOptions[3];

  [firstButton, secondButton, thirdButton, forthButton].forEach((el, index) => {
    el.innerHTML = buttonOptions[index];
  });
};

function showImage() {
  correctStudent = shuffledStudents[0];
  imageEL.src = correctStudent.image;

  console.log("hej hopp");
}

// const tagetId = currentStudent.id;

// Function for updating DOM with guesses made
const updateGuesses = (guess) => {
  guessesEl.innerText = guess === 1 ? `${guess} guess` : `${guess} guesses`;
};

let guesses;

const newRound = () => {
  shuffleArray(shuffledStudents);
  // updateGuesses(guesses);
  showImage();
  gameRound();
};

buttonForTenEl.addEventListener("click", (e) => {
  e.preventDefault();
  guesses = 0;
  updateGuesses(guesses);
  showImage();
  gameRound();
  secondPageEl.classList.remove("hide");
});

buttonForTwentyEl.addEventListener("click", (e) => {
  e.preventDefault();
  guesses = 0;
  updateGuesses(guesses);
  showImage();
  gameRound();
  secondPageEl.classList.remove("hide");
});

buttonForAllEl.addEventListener("click", (e) => {
  e.preventDefault();
  guesses = 0;
  updateGuesses(guesses);
  showImage();
  gameRound();
  secondPageEl.classList.remove("hide");
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
    } else {
      console.log("wrong");
      e.target.style.backgroundColor = "red";
    }
    console.log(`correct answear: ${correctStudent.name}`);

    guesses++;
    updateGuesses(guesses);

    setTimeout(() => {
      e.target.style.backgroundColor = "";
      newRound();
    }, 1000);
  }

  console.log("klickade på svartalternativ!");
  console.log(e.target, "e.taget");
  //console.log(e.value, "e.value"); Output: undefined
});

/*
e.target.style.backgroundColor = "";

choiceEl.forEach(function (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("klickade på svartalternativ!");
    guesses++;
  });
});

 if (button.value === correctStudent.name) {
      alert("Thats the right answear!");
    } else {
      console.log("doesnt work");
    }


function names() {
  let correctStudent = shuffledStudents[0].name;

  firstButton.innerHTML = correctStudent;

  let studentsNames = shuffledStudents[1].name;
  secondButton.innerHTML = studentsNames;
  studentsNames = shuffledStudents[2].name;
  thirdButton.innerHTML = studentsNames;
  studentsNames = shuffledStudents[3].name;
  forthButton.innerHTML = studentsNames;
}


 // let image = shuffledStudents[i].image;
    // let name = shuffledStudents[i].name;
    // checkAnswear(button.name, name);

const checkAnswear = (imageName, buttonName) => {
  if (imageName === buttonName) {
    alert("Thats the right answear!");
  } else {
    alert("wrong answear!");
  }
};

//här får jag ut alla namnen
const studentNames = shuffledStudents.forEach((student) => {
  console.log(student.name);
  return student.name;
});

//här får jag ut alla bilder
const studentImages = shuffledStudents.forEach((student) => {
  console.log(student.image);
  return student.image;
});

// function getRandom() {
//   choice.textContent = students[studentNames].name;

//   image.src = students[shuffledStudents].image;
// }


myButtonsEl.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    gameStarted = true;

    function tenRounds() {
      for (let i = 0; i < 10; i++) {
        const studentImage = document.createElement("img");
        studentImage.setAttribute("src", "assets/images/");
        console.log(studentImage, i);
      }
    }

    tenRounds();

    secondPageEl.innerHTML = "";

    //option.innerHTML = name;
  });
});

function startGame() {
  if (gameStarted) {
    return;
  }
}
let gameStarted = false;
let peopleToGuess = 0;
*/
