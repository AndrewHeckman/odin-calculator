let num1;
let num2;
let operator;
let result = 0;
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");

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

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
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
    default:
      addToDisplay(event.target.textContent);
      break;
  }
}

function addToDisplay(str) {
  display.textContent = display.textContent + str;
}

function clear() {
  display.textContent = "0";
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
}