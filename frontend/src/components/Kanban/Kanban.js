import React, {useEffect, useState} from "react";
import TaskCard from "./TaskCard";
import "./Kanban.css";

const Kanban = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", status: "todo" },
        { id: 2, title: "Task 2", status: "doing" },
        { id: 3, title: "Task 3", status: "done" },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [draggedTask, setDraggedTask] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5051/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Błąd pobierania danych:", error));
    }, []);

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask = {
            id: tasks.length + 1,
            title: newTaskTitle,
            status: "todo",
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
    };

    const handleDragStart = (task) => {
        setDraggedTask(task);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (status) => {
        if (draggedTask) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === draggedTask.id ? { ...task, status } : task
                )
            );
            setDraggedTask(null);
        }
    };

    return (
        <div className="tasks_list_wrapper">
            <div>
                <input
                    type="text"
                    placeholder="Dodaj nowe zadanie"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button onClick={handleAddTask}>Dodaj zadanie</button>
            </div>

            <div className="tasks_list_wrapper">
                {["todo", "doing", "done"].map((status) => (
                    <div
                        key={status}
                        className="tasks_list"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(status)}
                    >
                        <h2>{status.toUpperCase()}</h2>
                        <div>
                            {tasks
                                .filter((task) => task.status === status)
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className="task-card"
                                        draggable
                                        onDragStart={() => handleDragStart(task)}
                                    >
                                        <h3>{task.title}</h3>
                                        <div className="task-info">
                                            <div className="icon-group-left">
                                                <i className="fas fa-tag"></i>
                                                <i className="fas fa-user"></i>
                                            </div>
                                            <div>
                                                <i className="fas fa-clock"></i> 28-01
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kanban;
