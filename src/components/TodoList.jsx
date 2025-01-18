import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { useTodos } from "../context/TodoContext";

const TodoList = () => {
  const { todos, loading, toggleStatus, deleteTodo, addTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Render TodoForm with the required props */}
      <TodoForm 
        addTodo={addTodo} 
        newTodo={newTodo}
        setNewTodo={setNewTodo} 
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* Make the todo title clickable to toggleComplete */}
              <span style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleCompleted(todo.id)}>
                {todo.title}
              </span>
              &nbsp;
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;