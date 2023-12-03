import students from "./assets/images/students/students.js";

const homePageEl = document.querySelector(".homePage");
const tenPlayers = document.querySelector("#ten");
const twentyPlaysers = document.querySelector("#twenty");
const allPlayers = document.querySelector("#allPlayers");
const myButtons = document.querySelectorAll(".myButtons");

//functioner för att dölja och visa olika sidor
const hideElement = (element) => element.classlist.add("hide");
const unhideElement = (element) => element.classlist.remove("hide");

const shuffleStudents = (students) => {
  // Loop through array starting at the last index
  for (let i = students.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indexes i and j
    const temp = students[i];
    students[i] = students[j];
    students[j] = temp;
  }
  return students;
};

myButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    hideElement(homePageEl);
    e.preventDefault();
    console.log("clickad knapp");

    //option.innerHTML = name;
  });
});

/*
 
tenPlayers.addEventListener('click', (e) => {

    e.target;

    e.preventDefault;

    const hideElement = (element) => {
        element.classlist.add('hide');
    } 
    const unhideElement = (element) => {
        element.classlist.remove('hide');
    }

    hideElement(homePage);
    console.log('button clicked');


 })

 twentyPlaysers.addEventListener('click', (e) => {

    e.target;

    e.preventDefault;

    const hideElement = (element) => {
        element.classlist.add('hide');
    } 
    const unhideElement = (element) => {
        element.classlist.remove('hide');
    }

    hideElement(homePage);
    console.log('button clicked');


 })

 allPlayers.addEventListener('click', (e) => {

    e.target;

    e.preventDefault;

    const hideElement = (element) => {
        element.classlist.add('hide');
    } 
    const unhideElement = (element) => {
        element.classlist.remove('hide');
    }

    hideElement(homePage);
    console.log('button clicked');


 })

 

*/

// tenPlayers.addEventListener('click', e => {
// })

// twentyPlaysers.addEventListener('click', e => {
// })

// all.addEventListener('click', e => {
// })
