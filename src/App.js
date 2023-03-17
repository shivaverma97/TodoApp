import React, {useState, useRef, useEffect} from "react";
import TodoList from "./todoList";
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodo] = useState([])
  const todoName = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodo(storedTodos)
  }, [])    // emmpty array pass so that it renders only one time not in infinite loop because useEffect will check empty array only one time 

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  })

  function toggleTodo(id){
    const newTodos = [...todos]   //The state of a component is managed internally by React. Updating the state of a component directly can have unintended consequences that can be difficult to debug.
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodo(newTodos)
  }

  function handleAddTodo(e){
    const name = todoName.current.value
    if(name === '') return 
    setTodo(prevTodo => {
      return [...prevTodo, {id:uuidv4(), name: name, completed: false}]
    })
    todoName.current.value = null
  }

  function removeCompletedTodos(){
    const newTodos = todos.filter(todo => !todo.completed)
    setTodo(newTodos)
  }

  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
      <input ref={todoName} type = "text"></input>
      <button onClick={handleAddTodo} >Create todo</button>
      <button onClick={removeCompletedTodos}>Clear Completed todos</button>
      <p>{(todos.filter(todo => !todo.completed)).length} todos left</p>
    </>
  );
}

export default App;
