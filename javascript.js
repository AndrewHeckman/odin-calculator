let num1;             // first number in equation
let num2;             // second number in equation
let operator;         // mathematical operator from equation
let result = 0;       // result of equation, used for ans button
let clearFlag = true; // true if display needs to be emptied before adding input 

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

buttons.addEventListener("click", handleClick);

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    case "%":
      return modulo(num1, num2);
    default:
      return;
  }
}

function handleClick(event) {
  let button = event.target.id;
  switch (button) {
    case "clear":
      clear();
      break;
    case "backspace":
      backspace();
      break;
    case "answer":
      addToDisplay(result);
      break;
    case "equals":
      parseEquation();
      result = operate(num1, num2, operator);
      display.textContent = result;
      clearFlag = true;
      break;
    default:
      addToDisplay(event.target.textContent);
      break;
  }
}

function addToDisplay(str) {
  if (clearFlag) {
    display.textContent = "";
    clearFlag = false;
  }
  display.textContent = display.textContent + str;
}

function clear() {
  display.textContent = "0";
  clearFlag = true;
}

function backspace() {
  // if backspacing over last character, behavior is the same as clearing
  if (display.textContent.length == 1) clear();
  else display.textContent = display.textContent.slice(0, -1);
}

function parseEquation() {
  let str = display.textContent;
  let index = str.search(/[\+\-\÷\×\%]/);
  num1 = parseFloat(str.slice(0, index));
  operator = str[index];
  num2 = parseFloat(str.slice((index+1), str.length));
}

/* TODO:
support multiple operations in sequence
  change to accepting an array instead of num1, num2, and op
  each element will be a number or operator alternating
  will need a number flag, true if last input was a number, for keeping track of negatives
handle user pressing enter early
handle dividing by 0
support floating point
round long floats
add keyboard support
*/