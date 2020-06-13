import React, {Fragment, useEffect, useState} from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("https://quiet-journey-55394.herokuapp.com/api/todos")
            const jsonData = await response.json();
            setTodos(jsonData)

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`https://quiet-journey-55394.herokuapp.com/api/todos/${id}`,{
                method:"DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);
    console.log(todos);
    
    return (
          todos.map(todo => (
              <div key={todo.todo_id} className="todo" id={`id${todo.todo_id}`}>
                  <EditTodo todo = {todo}/>
              </div>
          ))
        )
}

export default ListTodos;