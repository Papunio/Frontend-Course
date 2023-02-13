import React from "react";

function Header(props: {
    todoText: string,
    textChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addTodo: (e: React.MouseEvent<HTMLInputElement>) => void,
}) {
    return <header>
        <form className="todoform">
            <input value={props.todoText} type="text" aria-label="user input field" className="todoform__input"
                   onChange={props.textChange}/>
            <input type="submit" className="todoform__submit" onClick={props.addTodo} value="Add"/>
        </form>
    </header>
}

export default Header;