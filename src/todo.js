import React from 'react'

export default function todo({todo, toggleTodo}) {
  function handleOnChange(){
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type ="checkbox"  checked={todo.completed} onChange={handleOnChange}></input>
        {todo.name}
      </label>
    </div>
  )
}
