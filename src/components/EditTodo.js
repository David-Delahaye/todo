import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  
  const deleteTodo = async (id) => {
    try {
        const deleteTodo = await fetch(`https://quiet-journey-55394.herokuapp.com/api/todos/${id}`,{
            method:"DELETE"
        });

        window.location = "/"
    } catch (err) {
        console.error(err.message);
    }
}


  const updateDescription = async(e) => { 
      e.preventDefault();
      e.target.parentNode.previousSibling.disabled = !e.target.parentNode.previousSibling.disabled;
      e.target.innerHTML = "Confirm";
      if (e.target.parentNode.previousSibling.disabled){
        try {
            const body = {description};
            const response = await fetch (`https://quiet-journey-55394.herokuapp.com/api/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type" :"application/json"},
                body: JSON.stringify(body)
            })

            window.location = ('/')
        } catch (err) {
            console.error(err.message);
        }
      }
  }
  return (
    <Fragment>
        <textarea
        className = "todo_desc"
          disabled
          value={description}
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
      <div className="todo_buttons">
        <button
            className="todo_buttons_edit"
            onClick={e => updateDescription(e)}>
            Edit
        </button>
        <button 
          className="todo_buttons_delete"
          onClick={()=> deleteTodo(todo.todo_id)}>
          Delete</button>
        </div>
    </Fragment>
  );
};

export default EditTodo;
