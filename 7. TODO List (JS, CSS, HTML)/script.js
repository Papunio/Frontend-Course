/**
 * Przechowuje obiekty todo
 * @type {*[]}
 */
const todoList = [];

/**
 * Tworzy obiekt z tekstem podanym przez użytkownika
 * @param e{MouseEvent}
 */
function addToList(e) {
    e.preventDefault();
    const input = document.querySelector(".todoform__input");
    const text = input.value;
    if (!text) {
        return;
    }
    const todo = {text, done: false, removed: false, id: Date.now()}
    todoList.push(todo);
    localStorage.setItem("items", JSON.stringify(todoList));
    render(todo);
    input.value = '';
}

/**
 * Renderuje obiekt na stronie
 * @param text{string}
 * @param done{boolean}
 * @param removed{boolean}
 * @param id{number}
 */
function render({text, done, removed, id}) {

    const list = document.querySelector(".list");
    const div = document.createElement("div");
    const item = document.querySelector(`[data-key='${id}']`);
    div.classList.add("task__item");

    done ? div.classList.add("actions__check--done") : null;
    if (removed) {
        item.remove();
        updateCounter();
        return;
    }

    div.dataset.key = String(id);
    div.innerHTML = `<div class="list__item">
                        <input aria-label="task" id="${id}" type="text" class="list__item--text" value="${text}" readonly>
                </div>
                <div class="item__actions">
                    <button data-type="done" class="actions__check">${done ? "Revert" : "Done"}</button> 
                    <button data-type="remove" class="actions__remove">Remove</button>
                </div>`
    item ? list.replaceChild(div, item) : list.appendChild(div);
    updateCounter();
}

/**
 * Zmienia status obiektu
 * @param e{Event}
 * @param action{"done" | "removed"}
 */
function toggleState(e, action) {
    const todoId = e.target.parentElement.parentElement.dataset.key;
    const index = todoList.findIndex((e) => String(e.id) === todoId);
    todoList[index][action] = !todoList[index][action];
    render(todoList[index]);
    if (action === "removed") {
        todoList.splice(index, 1);
    }
    localStorage.setItem("items", JSON.stringify(todoList));
}

/**
 * Aktualizuje licznik
 */
function updateCounter() {
    let counter = document.getElementById("counter");
    let count = todoList.filter((e) =>
        e.done === false && e.removed === false);
    counter.textContent = String(count.length);
}

/**
 * Usuwa wszystkie obiekty
 * @param e{MouseEvent}
 */
function clearAll(e) {
    e.preventDefault();
    todoList.map((todo) => {
        todo.removed = true;
        render(todo);
    })
    todoList.length = 0;
    localStorage.removeItem("items");
}

/**
 * Służy do pamiętania obiektów pomiędzy odświeżeniami strony
 */
function loadFromStorage() {
    const items = localStorage.getItem("items");
    if (items) {
        JSON.parse(items).map((item) => {
            todoList.push(item);
            render(item);
        });
    }
}

document.querySelector(".todoform__submit").addEventListener("click", addToList);
document.querySelector(".list").addEventListener("click", (e) => {
    if (e.target.dataset.type === "done") {
        toggleState(e, "done");
    } else if (e.target.dataset.type === "remove") {
        toggleState(e, "removed");
    }
});
document.getElementById("clear-all").addEventListener("click", (e) => clearAll(e));
document.addEventListener("DOMContentLoaded", loadFromStorage);