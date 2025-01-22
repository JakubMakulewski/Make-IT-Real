import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onDragStart }) => {
    return (
        <div
            className="task-card"
            draggable
            onDragStart={() => onDragStart(task)} // Przekazanie taska do funkcji
        >
            <p>{task.title}</p>
        </div>
    );
};

export default TaskCard;
