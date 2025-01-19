import React, { useState } from "react";
import TaskCard from "./TaskCard";
import JoinProject from "../JoinProject";
import "./Kanban.css";

const Kanban = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", status: "todo" },
        { id: 2, title: "Task 2", status: "doing" },
        { id: 3, title: "Task 3", status: "done" },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState("");

    // Funkcja dodawania taska
    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return; // Ignoruj puste wartości

        const newTask = {
            id: tasks.length + 1,
            title: newTaskTitle,
            status: "todo", // Domyślnie dodajemy do kolumny "To Do"
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle(""); // Wyczyszczenie pola input
    };

    return (
        <div className="kanban-container">
            <h1>Kanban Board</h1>

            {/* Sekcja dodawania taska */}
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
                    <div key={status} className="kanban-column">
                        <h2>{status.toUpperCase()}</h2>
                        <div className="kanban-tasks">
                            {tasks
                                .filter((task) => task.status === status)
                                .map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kanban;
