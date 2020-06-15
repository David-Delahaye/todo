import React, { Fragment, useState, Component } from "react";

class Todo extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div className = "todo" id={'id' + this.props.at} key={this.props.todo.todo_id}>
                <textarea
                className = "todo_desc"
                  disabled
                  value= {this.props.todo.description}
                  type="text"
                  onChange={(e) => {this.props.edit(e)}}
                />
              <div className="todo_buttons">
                <button
                    className="todo_buttons_edit"
                    onClick={this.props.update}
                    >
                    Edit
                </button>
                <button 
                    className="todo_buttons_delete"
                    onClick={this.props.delete}
                  >
                  Delete</button>
                </div>
                </div>
    )
  }
}

export default Todo;

