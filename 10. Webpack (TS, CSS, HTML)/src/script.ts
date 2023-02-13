import "./styles/style.css";
import {evaluate} from 'mathjs';

let equation = "";
let htmlEquation = (document.querySelector(".equation") as HTMLInputElement);

function clearEntry(): void {
    equation = "";
    htmlEquation.value = "";
}

function deleteEntry(): void {
    equation = equation.slice(0, -1);
    htmlEquation.value = equation;
}

function calculate(): void {
    if (equation === "") {
        return;
    }
    try {
        equation = String(evaluate(equation));
        htmlEquation.value = equation;
    } catch (SyntaxError) {
        equation = "";
        htmlEquation.value = "ERROR";
    }
}

function addToEquation(d: string): void {
    equation += d;
    htmlEquation.value = equation;
}

function buttonClicked(e: MouseEvent): void {
    let target = (e.target as HTMLButtonElement)
    if (target.type as String !== "button") {
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