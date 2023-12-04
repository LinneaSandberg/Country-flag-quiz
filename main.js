const firstPageEl = document.getElementById("firstPage");
const secondPageEl = document.getElementById("secondPage");
const theGameEl = document.querySelector("#theGame");
const randomNameEl = document.querySelectorAll(".randomName");
const imageEL = document.querySelector("#studentImage");
const choiceEl = document.querySelectorAll(".choice");
const firstButton = document.querySelector("#firstButton");
const secondButton = document.querySelector("#secondButton");
const thirdButton = document.querySelector("#thirdButton");
const forthButton = document.querySelector("#forthButton");

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
const studentNames = shuffledStudents.forEach((student) => {
  console.log(student.name);
  return student.name;
});

//här får jag ut alla bilder
const studentImages = shuffledStudents.forEach((student) => {
  console.log(student.image);
  return student.image;
});

let currentStudent;

function showImage() {
  currentStudent = shuffledStudents[0];

  imageEL.src = currentStudent.image;

  console.log("hej hopp");
}

function names() {
  let studentName = shuffledStudents[0].name;

  firstButton.innerHTML = studentName;

  let studentsNames = shuffledStudents[1].name;
  secondButton.innerHTML = studentsNames;
  thirdButton.innerHTML = studentsNames;
  forthButton.innerHTML = studentsNames;
}

showImage();
names();

const checkAnswear = (imageName, buttonName) => {
  if (imageName === buttonName) {
    alert("Thats the right answear!");
  } else {
    alert("wrong answear!");
  }
};

// function getRandom() {
//   choice.textContent = students[studentNames].name;

//   image.src = students[shuffledStudents].image;
// }

buttonForTenEl.addEventListener("click", (e) => {
  e.preventDefault();

  showImage();
  firstPageEl.style.display = "none";
  secondPageEl.classList.remove("hide");
});

buttonForTwentyEl.addEventListener("click", (e) => {
  e.preventDefault();

  //gameStarted = true;
  secondPageEl.classList.remove("hide");
});

buttonForAllEl.addEventListener("click", (e) => {
  e.preventDefault();

  //gameStarted = true;
  secondPageEl.classList.remove("hide");
});

choiceEl.forEach(function (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let image = shuffledStudents[i].image;
    let name = shuffledStudents[i].name;
    checkAnswear(button.name, name);
    console.log("Här funkar det");
  });
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

function startGame() {
  if (gameStarted) {
    return;
  }
}
let gameStarted = false;
let peopleToGuess = 0;
*/
