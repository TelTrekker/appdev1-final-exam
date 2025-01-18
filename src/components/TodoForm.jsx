import React from "react";

const TodoForm = ({ addTodo, newTodo, setNewTodo }) => {
  const handleSubmit = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };
  
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter todo title"
      />
      <button
        onClick={handleSubmit} 
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;