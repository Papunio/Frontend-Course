"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles/style.css");
const mathjs_1 = require("mathjs");
let equation = "";
let htmlEquation = document.querySelector(".equation");
function clearEntry() {
    equation = "";
    htmlEquation.value = "";
}
function deleteEntry() {
    equation = equation.slice(0, -1);
    htmlEquation.value = equation;
}
function calculate() {
    if (equation === "") {
        return;
    }
    try {
        equation = String((0, mathjs_1.evaluate)(equation));
        htmlEquation.value = equation;
    }
    catch (SyntaxError) {
        equation = "";
        htmlEquation.value = "ERROR";
    }
}
function addToEquation(d) {
    equation += d;
    htmlEquation.value = equation;
}
function buttonClicked(e) {
    let target = e.target;
    if (target.type !== "button") {
        return;
    }
    if (target.value === "CE") {
        clearEntry();
        return;
    }
    if (target.value === "DEL") {
        deleteEntry();
        return;
    }
    if (target.value === "=") {
        calculate();
        return;
    }
    addToEquation(target.value);
}
document.addEventListener("click", (e) => buttonClicked(e));
