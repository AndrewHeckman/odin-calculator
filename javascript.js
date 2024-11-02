let args = [];        // argument array of alternating numbers and operations
let argIndex = 0;     // next empty array element
let result = 0;       // result of equation, used for ans button
let clearFlag = true; // true if display needs to be emptied before adding input
let opFlag = true;    // true if last click was an operation
let decFlag = false;  // true if number contains a decimal
const precision = 4;  // float precision

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

buttons.addEventListener("click", handleClick);
window.addEventListener("keydown", handleKeydown);

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
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
      return divide(num1, num2);
    case "modulo":
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
      clearFlag = true;
      break;
    case "number-answer":
      buttonText = parseFloat(result.toFixed(precision));
    default:
      if (buttonId === "number-decimal") {
        if (decFlag) break;
        if (opFlag) {
          args.push("0");
          addToDisplay("0");
        }
        decFlag = true;
      }

      if (buttonId.includes("number")) {
        if (typeof args[argIndex] === "undefined") {
          args.push(buttonText);
        }
        else {
          args[argIndex] += buttonText;
        }
        opFlag = false;
      }
      else if (buttonId === "subtract" && opFlag) {
        if (typeof args[argIndex] === "undefined") {
          args.push(buttonText);
        }
        else if (args[argIndex].at(0) === "-") {
          break;
        }
        else {
          args[argIndex] += buttonText;
        }
      }
      else {
        if (argIndex === 0 && typeof args[argIndex] === "undefined") {
          args[0] = result;
          addToDisplay(args[0]);
        }
        args.push(buttonId);
        argIndex += 2;
        opFlag = true;
        decFlag = false;
      }
      addToDisplay(buttonText);
      break;
  }
}

function handleKeydown(event) {
  if (event.key === "="){
    document.querySelector(`button[data-key='Enter']`).click();
  }
  else if (event.key != "Shift") {
    document.querySelector(`button[data-key='${event.key}']`).click();
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
  opFlag = true;
  decFlag = false;
}

function backspace() {
  // if backspacing over last character, behavior is the same as clearing
  if (display.textContent.length == 1) {
    clear();
    return;
  }

  // removes corresponding flags
  switch (args.at(-1)) {
    case ".":
      decFlag = false;
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
    case "modulo":
      opFlag = false;
      break;
  }

  display.textContent = display.textContent.slice(0, -1);

  if (typeof args[argIndex] === "undefined") {
    argIndex--;
  }

  // if arg is an operation or single-digit number, the whole thing is removed
  if (Number.isNaN(Number(args[argIndex])) && args[argIndex] != "-") {
    args.pop();
    argIndex--;
  }
  else if ((args[argIndex].length === 1)) {
    args.pop();
  }
  else {
    args[argIndex] = args[argIndex].slice(0, -1);
  }

  // reapply opFlag if necessary
  switch (args.at(-1)) {
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
    case "modulo":
      opFlag = true;
      break;
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

  // find and evaluate multiplication, division, and modulo first
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "multiply" || args[i] === "divide" || args[i] === "modulo") {
      result = operate(args[i-1], args[i+1], args[i]);
      if (result === Infinity) {
        argIndex = 0;
        result = 0;
        args = [];
        display.textContent = "You should know better than to try that.";
        return;
      }
      args.splice(i-1, 3, result.toString());
      console.log(args);
      console.log(args.length);
      i--;
    }
  }

  while (args.length > 2) {
    num1 = parseFloat(args.shift());
    operator = args.shift();
    num2 = parseFloat(args[0]);
    result = operate(num1, num2, operator);
    args[0] = result;
  }
  argIndex = 0;
  result = parseFloat(args.shift());
  args = [];
  display.textContent = parseFloat(result.toFixed(precision));
}

/* TODO:
make pretty
*/

function logVars() {
  console.log(
    `args: ${args}
argIndex: ${argIndex}
result: ${result}
clearFlag: ${clearFlag}
opFlag: ${opFlag}
decFlag: ${decFlag}`
  );
}