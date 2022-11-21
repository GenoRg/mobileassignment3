import React, {useState} from 'react';
import './App.css';
import Todo from './components/Todo';

function App() {

    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ["#00b4ff", "#00fff4", "#00ff91", "#c0ff00", "#ff6100"];

    const handleChange = event => {
        setTodoText(event.target.value);
    };

    function pickColor() {
        if(colorIndex === colors.length - 1) {
            setColorIndex(0)
        } else {
            setColorIndex(colorIndex + 1)
        }
        return colors[colorIndex]
    }

    function insertTodo(text) {
        if(text !== ""){
            setTodos((prevTodos) => [
                ...prevTodos,
                [text, pickColor()]
            ])
            setTodoText("");
        }
    }

    function removeTodo(index) {
        for(let i = 0; i < todos.length; i++){
            if(index === i){
                const newTodos = [...todos];
                newTodos.splice(index, 1);
                setTodos(newTodos);
            }
        }
    }

    return (
        <div className="app-container">
            <div className="headline-box">
                <h1>What to do?</h1>
            </div>
            <div className="todo-form">
                <div className='form-left'>
                    <textarea onChange={handleChange} value={todoText} className="todo-textarea" placeholder="Add a thing to do"></textarea>
                </div>
                <div className='form-right'>
                    <button onClick={() => insertTodo(todoText)}>Add</button> 
                </div>
            </div>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <div key={index} className="todo" style={{backgroundColor: todo[1]}}>
                        <div className='todo-text'>
                            <Todo text={todo[0]}/>
                        </div>
                        <div className="todo-delete">
                            <button onClick={() => removeTodo(index)} style={{backgroundColor: todo[1]}}>&#x2715;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
