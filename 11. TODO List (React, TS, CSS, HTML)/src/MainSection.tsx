import React from "react";

function MainSection(props: {
    todoCount: () => number,
    todos: any,
    clearAll: () => void,
}) {

    return <main>
        <section className="todos">
            <div className="todos__header">
                <h2 className="todos__header--smaller">
                    Tasks ({props.todoCount()} remaining)
                </h2>
                <input type="submit" id="clear-all" value="Clear All" onClick={props.clearAll}/>
            </div>
            <div className="list">
                {props.todos}
            </div>
        </section>
    </main>
}

export default MainSection;