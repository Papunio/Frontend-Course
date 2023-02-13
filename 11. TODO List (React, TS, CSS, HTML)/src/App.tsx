import React, {useState} from 'react';

import {v4 as uuidv4} from 'uuid';

import './App.css';
import Header from './Header';
import MainSection from "./MainSection";

function App() {
    const [todoText, setTodoText] = useState('');
    const [todoList, setTodoList] = useState<{ id: string, text: string, done: boolean }[]>([]);

    function textChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setTodoText(event.target.value);
    }

    function addTodo(event: React.MouseEvent<HTMLInputElement>): void {
        event.preventDefault();
        if (!todoText) {
            return;
        }
        setTodoText("");
        setTodoList((prevState) => [...prevState, {id: uuidv4(), text: todoText, done: false}]);
    }

    function clearAll(): void {
        setTodoList([]);
    }

    function clickDone(id: string): void {
        const newList = todoList.map((elem) => {
            if (elem.id === id) {
                elem.done = !elem.done;
                return elem;
            }
            return elem;
        });
        setTodoList([...newList]);
    }

    function clickRemove(id: string): void {
        setTodoList((prevState) => prevState.filter((elem) => elem.id !== id));

    }

    function todoCount(): number {
        return todoList.reduce((acc, curr) => {
            if (!curr.done) {
                acc++;
            }
            return acc;
        }, 0);
    }

    const todos = todoList.map((todo) => ( // clsx
        <div className={!todo.done ? "task__item" : "task__item actions__check--done"} key={todo.id}>
            <div className="list__item">
                <input aria-label="task" type="text" className="list__item--text" value={todo.text} readOnly/>
            </div>
            <div className="item__actions">
                <button className="actions__check" onClick={() => clickDone(todo.id)}>Done</button>
                <button className="actions__remove" onClick={() => clickRemove(todo.id)}>Remove</button>
            </div>
        </div>
    ))

    return (
        <>
            <Header todoText={todoText} textChange={textChange} addTodo={addTodo}></Header>
            <MainSection todoCount={todoCount} clearAll={clearAll} todos={todos}></MainSection>
        </>
    );
}

export default App;
