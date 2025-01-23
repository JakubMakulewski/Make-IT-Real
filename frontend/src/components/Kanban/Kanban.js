import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import "./Kanban.css";

const Kanban = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [draggedTask, setDraggedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5051/projects/${projectId}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [projectId]);

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        const newTask = {
            title: newTaskTitle,
            description: "Task description",
            assignee: 1,
            taskType: "todo",
            projectId,
        };

        try {
            const response = await axios.post("http://localhost:5051/tasks", newTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });
            setTasks((prevTasks) => [...prevTasks, response.data]);
            setNewTaskTitle("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleDragStart = (task) => {
        setDraggedTask(task);
    };

    const handleDrop = async (newTaskType) => {
        if (!draggedTask) return;

        const updatedTask = { ...draggedTask, taskType: newTaskType };

        try {
            await axios.put(`http://localhost:5051/tasks/${draggedTask.id}`, updatedTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === draggedTask.id ? updatedTask : task
                )
            );
            setDraggedTask(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
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
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(status)}
                    >
                        <h2>{status.toUpperCase()}</h2>
                        <div className="kanban-tasks">
                            {tasks
                                .filter((task) => task.taskType === status)
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
