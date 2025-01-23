import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onDragStart, onDelete }) => {
    return (
        <div
            className="task-card"
            draggable
            onDragStart={() => onDragStart(task)} // Przekazanie taska do funkcji
        >
            <p>{task.title}</p>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export default TaskCard;
