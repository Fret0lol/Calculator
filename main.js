
const input = document.getElementById('input')
const number = document.querySelectorAll('.numbers div')
const operator = document.querySelectorAll('.operators div')
const result = document.getElementById('result')
const clear = document.getElementById('clear')
let resultDisplayed = false;

import Operation from './operations.js';


  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", (e) => {

      let currentString = input.innerHTML;
      let lastChar = currentString[currentString.length - 1];

      if (resultDisplayed === false) {
        input.innerHTML += e.target.innerHTML;
      } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
      } else {
        resultDisplayed = false;
        input.innerHTML = "";
        input.innerHTML += e.target.innerHTML;
      }

    });
  }

  // adding click handlers to number buttons
  for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", (e) => {

      let currentString = input.innerHTML;
      let lastChar = currentString[currentString.length - 1];

      if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
      } else if (currentString.length == 0) {
        console.log("enter a number first");
      } else {
        input.innerHTML += e.target.innerHTML;
      }

    });
  }

  result.addEventListener("click", () => {

    let inputString = input.innerHTML;

    let numbers = inputString.split(/\+|\-|\×|\÷/g);

    let operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    let divideNumber = operators.indexOf("÷");
    while (divideNumber != -1) {
      numbers.splice(divideNumber, 2, Operation.divide(numbers[divideNumber], numbers[divideNumber + 1]));
      operators.splice(divideNumber, 1);
      divideNumber = operators.indexOf("÷");
    }

    let multiplyNumber = operators.indexOf("×");
    while (multiplyNumber != -1) {
      numbers.splice(multiplyNumber, 2, Operation.multiply(numbers[multiplyNumber], numbers[multiplyNumber + 1]));
      operators.splice(multiplyNumber, 1);
      multiplyNumber = operators.indexOf("×");
    }

    let subtractNumber = operators.indexOf("-");
    while (subtractNumber != -1) {
      numbers.splice(subtractNumber, 2, Operation.subtract(numbers[subtractNumber], numbers[subtractNumber + 1]));
      operators.splice(subtractNumber, 1);
      subtractNumber = operators.indexOf("-");
    }

    let addNumber = operators.indexOf("+");
    while (addNumber != -1) {
      numbers.splice(addNumber, 2, Operation.add(parseFloat(numbers[addNumber]), parseFloat(numbers[addNumber + 1])));
      operators.splice(addNumber, 1);
      addNumber = operators.indexOf("+");
    }

    input.innerHTML = numbers[0];

    resultDisplayed = true;
  });

  // clearing the input on press of clear
  clear.addEventListener("click", () => {
    input.innerHTML = "";
  })
