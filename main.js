const firstPageEl = document.getElementById("firstPage");
const secondPageEl = document.getElementById("secondPage");
const myButtonsEl = document.querySelectorAll(".myButtons");
const theGameEl = document.querySelector("#theGame");
const randomNameEl = document.querySelectorAll(".randomName");

//functioner för att dölja och visa olika sidor
const hideElement = (element) => element.classlist.add("hide");
const unhideElement = (element) => element.classlist.remove("hide");

function shuffle(array) {
  // Loop through array starting at the last index
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indexes i and j
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// här får jag en ny lista med blandade studenter
const shuffledStudents = shuffle(students);
console.log(shuffledStudents);

// Function to get random incorrect options for the quiz
function getRandomIncorrectOptions() {
  const allStudents = [...students];
  shuffleArray(allStudents);
  const incorrectOptions = allStudents
    .filter((student) => !students.includes(student))
    .slice(0, 3)
    .map((student) => student.name);
  return incorrectOptions;
}

myButtonsEl.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    secondPageEl.innerHTML = "";

    //option.innerHTML = name;
  });
});
