import Tasks from "./Tasks";
import React, {useState} from "react";
import './Tasks.css';
import './Cards.css';

// function Task({task}) {
const Task = () => {
    const [task] = useState({
        name: 'Nazwa zadania np. do zrobienia dziura w suficie i nauka ortografi',
        // description: 'Opis projektu. Krótki opis celu i zakresu projektu.',
        category: 'frontend',
        dificulty: 'easy',
        // isPrivate: true,
        participants: 10,
        maxParticipants: 20, // Dodano maksymalną liczbę uczestników
        deadline: '28-01'
    });

    return (
        <div className="task-card">
            {/* Task Name and Project Status */}
            <div className="task-name">{task.name}</div>
            <div className="cards__item__status">
                <div className="status_icon">{task.category}</div>
                <div className="status_icon">{task.dificulty}</div>
            </div>

            {/* Icons and Participant Details */}
            <div className="task-info">
                <div className="icon-group-left">
                    {/* Chat Icon */}
                    <div className="chat-icon">
                        <i className="fas fa-solid fa-comment"></i>
                    </div>

                    {/* Attachment Icon */}
                    <div className="chat-icon">
                        <i className="fas fa-solid fa-paperclip"></i>
                    </div>

                    {/*/!* Number of Participants *!/*/}
                    {/*<div className="icon-with-text">*/}
                    {/*    <i className="fas fa-users"></i>*/}
                    {/*    <span>{task.participants}</span>*/}
                    {/*</div>*/}

                    {/* Task Deadline */}
                    <div className="icon-with-text">
                        <i className="fas fa-regular fa-clock"></i>
                        <span>{task.deadline}</span>
                    </div>
                </div>

                {/* Participant Avatars */}
                {/*<div className="participants">*/}
                {/*    {task.participants.slice(0, 3).map((participant, index) => (*/}
                {/*        <div key={index} className="participant-avatar">*/}
                {/*            <i className="fa-regular fa-user"></i>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*    /!* Show "..." for excess participants *!/*/}
                {/*    {task.participants.length > 3 && <span>...</span>}*/}
                {/*</div>*/}
                <div className="icon-group-right">
                    <i className="fas fa-regular fa-user"></i>
                </div>
            </div>
        </div>
    );
}
export default Task;