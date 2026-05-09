"use strict"

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const display = document.querySelector(".display h2")

let formedNumber = "";
let storedResult = null;
let lastOpUsed = "";

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        formedNumber += e.target.textContent;
        display.textContent = formedNumber;
    })
})

const calculate = (op) => {
        formedNumber = Number.parseFloat(formedNumber) || null;
        console.log("formed parsed " + formedNumber + " type --> " + typeof(formedNumber));
        console.log("stored " + storedResult + " type --> " + typeof(storedResult));
        switch(op){
            case "+":
                storedResult = (storedResult ?? 0) + (formedNumber ?? 0);
                break;
            case "-":
                storedResult = (storedResult ?? formedNumber*2) - (formedNumber ?? 0);
                break;
            case "*":
                storedResult = (storedResult ?? 1) * (formedNumber ?? 1);
                break;
            case "/":
                storedResult = (storedResult ?? 1) / (formedNumber ?? 1);
                break;
            default:
                break;
        }
        formedNumber = "";
}

operators.forEach((op) => {
    op.addEventListener('click', (e) => {
        lastOpUsed = e.target.textContent;
        calculate(lastOpUsed);
    })
})

equalsButton.addEventListener("click", () => {
    calculate(lastOpUsed);
    console.log("formed parsed " + formedNumber);
    console.log("stored " + storedResult);
    formedNumber = "";
    display.textContent = storedResult;
})