import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
          const body = {description};
          const response = await fetch("https://quiet-journey-55394.herokuapp.com/api/todos",{
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(body)
          });

          window.location = "/"
          
      } catch (err) {
          console.error(err.message)
      }
  }

  return (
    <Fragment>
        <form className="input" onSubmit = {onSubmitForm}>
          <input
            type="text"
            placeholder="Add a Todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button>Add</button>
        </form>
    </Fragment>
  );
};

export default InputTodo;
