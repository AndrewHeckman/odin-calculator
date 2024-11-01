let args = [];        // argument array of alternating numbers and operations
let argIndex = 0;     // next empty array element
let result = 0;       // result of equation, used for ans button
let clearFlag = true; // true if display needs to be emptied before adding input
let opflag = true;    // true if last click was an operation

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
  let buttonId = event.target.id;
  let buttonText = event.target.textContent;
  switch (buttonId) {
    case "clear":
      clear();
      break;
    case "backspace":
      backspace();
      break;
    case "equals":
      evaluateEquation();
      display.textContent = result.toString();
      clearFlag = true;
      break;
    case "answer":
      buttonId += "number";
      buttonText = result.toString();
    default:
      if (buttonId.includes("number")) {
        if (typeof args[argIndex] === "undefined") {
          args.push(buttonText);
        }
        else {
          args[argIndex] += buttonText;
        }
        opflag = false;
      }
      else {
        if (argIndex === 0 && typeof args[argIndex] === "undefined") {
          args[0] = result.toString();
          addToDisplay(result.toString());
        }
        args.push(buttonText);
        argIndex += 2;
        opflag = true;
      }
      addToDisplay(buttonText);
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
  args = [];
  argIndex = 0;
  result = 0;
}

function backspace() {
  // if backspacing over last character, behavior is the same as clearing
  if (display.textContent.length == 1) clear();
  else{
    display.textContent = display.textContent.slice(0, -1);

    if (typeof args[argIndex] === "undefined") {
      argIndex--;
    }

    if (args[argIndex].length === 1) {
      args.pop();
    }
    else {
      args[argIndex] = args[argIndex].slice(0, -1);
    }
  }
}

function evaluateEquation() {
  // empty array do nothing
  if (args.length === 0) return;
  // number + operator, disregard operator
  if (args.length === 2) args.pop();
  let num1;
  let num2;
  let operator;
  while (args.length > 2) {
    num1 = parseFloat(args.shift());
    operator = args.shift();
    num2 = parseFloat(args[0]);
    args[0] = operate(num1, num2, operator);
  }
  argIndex = 0;
  result = args.shift();
  args = [];
}

/* TODO:
add support for negatives
handle dividing by 0
support floating point
round long floats
add keyboard support
*/