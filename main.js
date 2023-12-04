const firstPageEl = document.getElementById("firstPage");
const secondPageEl = document.getElementById("secondPage");
const theGameEl = document.querySelector("#theGame");
const randomNameEl = document.querySelectorAll(".randomName");

// dom referenser till antalet rundor spelaren vill spela
const buttonForTenEl = document.querySelector("#buttonForTen");
const buttonForTwentyEl = document.querySelector("#buttonForTwenty");
const buttonForAllEl = document.querySelector("#buttonForAll");

//functioner för att dölja och visa olika sidor
const hideElement = (element) => element.classlist.add("hide");
const unhideElement = (element) => element.classlist.remove("hide");

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

//här får jag ut alla namnen
shuffledStudents.forEach((student) => {
  console.log(student.name);
});

//här får jag ut alla bilder
shuffledStudents.forEach((student) => {
  console.log(student.image);
});

let gameStarted = false;
let peopleToGuess = 0;

function startGame() {
  if (gameStarted) {
    return;
  }
}

buttonForTenEl.addEventListener("click", (e) => {
  e.preventDefault();
  startGame(10);
  gameStarted = true;
});

buttonForTwentyEl.addEventListener("click", (e) => {
  e.preventDefault();
  startGame(20);
  gameStarted = true;
});

buttonForAllEl.addEventListener("click", (e) => {
  e.preventDefault();
  startGame(41);
  gameStarted = true;
});

/*
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

*/
