import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [username, setUsername] = useState("");
    const [newTask, setNewTask] = useState("");

    const urlApiBase = "https://playground.4geeks.com/todo";

    // Función para obtener las tareas del usuario
    const getTasks = (usernameToFetch) => {
        if (!usernameToFetch) {
            setTasks([]);
            setUsername("");
            return;
        }

        fetch(`${urlApiBase}/users/${usernameToFetch}`)
            .then(response => {
                if (response.status == 404) {
                    return null;
                }
                if (response.ok == false) {
                    throw new Error("Error fetching tasks for user");
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.todos)) {
                    setTasks(data.todos);
                    setUsername(usernameToFetch);
                } else if (data) {
                    setTasks([]);
                    setUsername(usernameToFetch);
                }
            })
            .catch(error => {
                alert(error)
            });
    };

    // Función para agregar una nueva tarea
    const addTask = () => {
        if (!newTask.trim()) {
            return;
        }
        if (username == "") {
            return;
        }

        const taskToAdd = {
            label: newTask.trim(),
            is_done: false
        };

        fetch(`${urlApiBase}/todos/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToAdd)
        })
        .then(response => {
            if (response.ok == false) {
                throw new Error("Error adding task");
            }
            return response.json();
        })
        .then(data => {
            setTasks(prevTasks => [...prevTasks, data]);
            setNewTask("");
        })
        .catch(error => {
            alert(error)
        });
    };

    // Función para eliminar una tarea
    const deleteTask = (taskId) => {
        if (username == "") {
            return;
        }

        fetch(`${urlApiBase}/todos/${taskId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok == false) {
                throw new Error("Error deleting task");
            }
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        })
        .catch(error => {
            alert(error)
        });
    };

    // Manejador de Enter para el input de usuario
    const userEnterPress = (event) => {
        if (event.key == "Enter") {
            const userText = event.target.value.trim();
            getTasks(userText);
        }
    };

    // Manejador de Enter para el input de nueva tarea
    const newTaskEnterPress = (event) => {
        if (event.key == "Enter") {
            addTask();
        }
    };

    const items = tasks.length;

    return (
        <div className="d-flex flex-column text-center py-5 container">
            <h1 className="mt-5 fw-lighter text-secondary app-title">TO-DO LIST 🔍</h1>
            <div className="todo-container col-12 col-md-6 col-lg-4 mx-auto">
                <input
                    className="form-control new-todo-input"
                    type="text"
                    placeholder="Enter Username"
                    onKeyPress={userEnterPress}
                />

                <input
                    className="form-control new-todo-input"
                    placeholder="Add a new task here..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={newTaskEnterPress}
                />

                {items > 0 && (
                    <ul className="list-group todo-list">
                        {tasks.map((task) => (
                            <li key={task.id} className="list-group-item d-flex justify-content-between">
                                {task.label}
                                <button
                                    className="btn-close my-auto"
                                    aria-label="Cerrar"
                                    onClick={() => deleteTask(task.id)}
                                ></button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="d-flex px-3 border-top text-muted">
                    {items == 0 ? (
                        <span>No hay tareas, ¡añade una!</span>
                    ) : (
                        <span>
                            {items} {items == 1 ? "item" : "items"} left
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;