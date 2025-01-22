import React, { useState } from "react";
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
        setDraggedTask(task); // Przechowujemy informację o zadaniu, które jest przeciągane
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Zapobiegamy domyślnemu zachowaniu
    };

    const handleDrop = (status) => {
        if (!draggedTask) return; // Jeśli nie ma zadania przeciąganego, nie rób nic
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === draggedTask.id ? { ...task, status } : task
            )
        );
        setDraggedTask(null); // Resetujemy stan przeciąganego zadania
    };

    return (
        <div className="kanban-container">
            <h1>Kanban Board</h1>

            <div className="add-task-section">
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            <div className="kanban-columns">
                {["todo", "doing", "done"].map((status) => (
                    <div
                        key={status}
                        className="kanban-column"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(status)}
                    >
                        <h2>{status.toUpperCase()}</h2>
                        <div className="kanban-tasks">
                            {tasks
                                .filter((task) => task.status === status)
                                .map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onDragStart={() => handleDragStart(task)}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kanban;
