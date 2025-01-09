import './App.css'
import {useState} from "react";
import Form from "../Form/Form";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [numberOfTodos, setNumberOfTodos] = useState(0);
  const [numberOfCompletedTodos, setNumberOfCompletedTodos] = useState(0);

  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, {id: Date.now(), text: value, done: false}]);
      setNumberOfTodos(numberOfTodos + 1);
    } else {
      alert('Введите текст');
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      todo.done
        ? setNumberOfCompletedTodos(numberOfCompletedTodos - 1)
        : setNumberOfCompletedTodos(numberOfCompletedTodos + 1)
      return {
        ...todo,
        done: !todo.done
      }
    }))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setNumberOfTodos(numberOfTodos - 1);
    for (let todo of todos) {
      if (todo.id === id && todo.done) {
        setNumberOfCompletedTodos(numberOfCompletedTodos - 1)
      }
    }
  }

  const removeAllTodos = () => {
    setTodos([]);
    setNumberOfTodos(0);
    setNumberOfCompletedTodos(0)
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <h1 className='title'>To-do list</h1>
        <Form putTodo={putTodo}/>
        <ul className='todos'>
          {todos.map(todo => {
            return (
              <li className={todo.done ? 'todo done' : 'todo'}
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
                <img src={`${process.env.PUBLIC_URL}/remove.png`}
                     alt='remove'
                     className='remove'
                     onClick={e => {
                       e.stopPropagation();
                       removeTodo(todo.id);
                     }}
                />
              </li>
            );
          })}
          <div className='info'>
            <span>Number of todos: {numberOfTodos}</span>
            <span>Completed: {numberOfCompletedTodos}</span>
          </div>
          <button
            className='clear'
            onClick={removeAllTodos}
          >
            Clear all
          </button>
        </ul>
      </div>
    </div>
  );
}
