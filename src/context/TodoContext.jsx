import React, { useState, createContext, useContext, useEffect } from "react"

const ToDoContext = createContext()

const fetchTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = await response.json();
    return data; //adding fetchTodos
};

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([
        // { id: "1", title: "Task 1", status: "pending" },
        // { id: "2", title: "Task 2", status: "pending" },
        // { id: "3", title: "Task 3", status: "pending" },
    ])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadTodos = async () => {
            const data = await fetchTodos ();
            setTodos(data);
            setLoading(false);
        };
        loadTodos();
    }, [])

    const addTodo = (title) => {
        const newTodo = {
          id: Date.now().toString(),
          title,
          completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    const toggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    } //changing to toggleComplete

    return (
        <ToDoContext.Provider value={{ todos, loading, addTodo, deleteTodo, toggleComplete }}>
            { children }
        </ToDoContext.Provider>
    )
}

export const useTodos = () => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error("Hook is used outside of the provider")
    }
    return context
}