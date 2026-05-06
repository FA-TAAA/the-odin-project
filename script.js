"use strict"

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const display = document.querySelector(".display h2")

let formedNumber = "";
let storedValue = undefined;
let lastSelectedOp = "";

function doOperation(formedNumber, storedValue, operation) {
    switch(operation){
        case '+':
            return (storedValue ?? 0) + Number.parseFloat(formedNumber);
            break;
        case '-':
            return (storedValue ?? 0) + Number.parseFloat(formedNumber);
            break;
        case '*':
            return (storedValue ?? 1) * Number.parseFloat(formedNumber);
            break;
        case '/':
            return (storedValue ?? 1) / Number.parseFloat(formedNumber);
            break; 
    }
}

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        lastSelectedOp = operator.textContent;
        storedValue = doOperation(formedNumber, storedValue, lastSelectedOp);
        console.log("formed number value -> " + storedValue);
        console.log("stored value -> " + storedValue);
        formedNumber = "";
        display.textContent = '';
    })
})

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        formedNumber += number.textContent;
        display.textContent += number.textContent;
    })
})

equalsButton.addEventListener("click", () => {
    storedValue = doOperation(formedNumber, storedValue, lastSelectedOp);
    console.log("formed number value -> " + storedValue);
    console.log("stored value -> " + storedValue);
    display.textContent = storedValue;
})
