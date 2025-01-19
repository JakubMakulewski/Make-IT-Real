import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task, column, onDragStart }) => {
    return (
        <div
            className="task-card"
            draggable
            onDragStart={(e) => onDragStart(e, task, column)}
        >
            <div className="task-card-title">{task.title}</div>
            <div className="task-card-details">
                {task.details || "Brak dodatkowych informacji"}
            </div>
            <div className="task-card-footer">
                <button>Edytuj</button>
            </div>
        </div>
    );
};

export default TaskCard;
