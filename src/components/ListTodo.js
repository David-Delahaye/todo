import React, {Fragment, useEffect, useState, Component} from "react";
import Todo from "./Todo";

class Todos extends Component {
    constructor(){
        super();
        this.getTodos();
        this.state = {
            todos:[],
            currentInput:"",
        }
    }

    getTodos = async () => {
        try {
            const response = await fetch("https://quiet-journey-55394.herokuapp.com/api/todos")
            const jsonData = await response.json();
            this.setState({todos:jsonData})
        } catch (err) {
            console.error(err.message);
        }
    }

    onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log(this.state.currentInput);
            const body = {"description":this.state.currentInput};
            const response = await fetch("https://quiet-journey-55394.herokuapp.com/api/todos",{
              method: "POST",
              headers: { "Content-Type" : "application/json"},
              body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message)
        }

        await this.getTodos();
        const last = this.state.todos.length-1;
        const query = '#id' + last;
        const todo = document.querySelector(query);
        console.log(todo);
        
        setTimeout(()=>{
            todo.classList.remove('fadeIn')
        },400)
        todo.classList.add('fadeIn')
    }

    deleteTodo = async (e,i) => {
        setTimeout(async() => {
        const id = e.todo_id
        try {
            const deleteTodo = await fetch(`https://quiet-journey-55394.herokuapp.com/api/todos/${id}`,{
                method:"DELETE"
            });
    
        } catch (err) {
            console.error(err.message);
        }
        await this.getTodos();
        }, 100)
        const query = '#id' + i;
        const todo = document.querySelector(query);
        todo.classList.add('fade')
    }

    editTodo = (e,i) => {
        const newText = e.target.value;
        let newTodos = this.state.todos.slice();
        newTodos[i].description = newText;
        this.setState({todos:newTodos})
    }

    updateTodo = async(e,i) => { 
        const query = '#id' + i;
        const todo = document.querySelector(query);
        const editBtn = todo.childNodes[1].childNodes[0];
        const text = todo.childNodes[0];
        text.disabled = !text.disabled;
        editBtn.innerHTML = "Confirm";
        if (text.disabled){
          try {
             editBtn.innerHTML = "Edit"; 
              const body = {"description":e.description};
              const response = await fetch (`https://quiet-journey-55394.herokuapp.com/api/todos/${e.todo_id}`,{
                  method: "PUT",
                  headers: {"Content-Type" :"application/json"},
                  body: JSON.stringify(body)
              })
  
          } catch (err) {
              console.error(err.message);
          }
        }
    }

    onInputChange = (e) => {
        this.setState({currentInput:e})
    }

    render(){  
        let todosFormat = this.state.todos.map ((e,i) => {
            return(
            <Todo  todo={e} key={i} at ={i} delete={() => this.deleteTodo(e,i)} edit = {(e) => this.editTodo(e,i)}update = {() => this.updateTodo(e,i)}/>
            )
        })
    return (
        <Fragment>
        <form className="input" onSubmit = {e => this.onSubmitForm(e)}>
        <input
          type="text"
          placeholder="Add a Todo"
          name="input"
          value={this.state.currentInput}
          onChange={(e) => this.onInputChange(e.target.value)}
        />
        <button>Add</button>
        </form>
        {todosFormat}
        </Fragment>
        )
    }
}

export default Todos;