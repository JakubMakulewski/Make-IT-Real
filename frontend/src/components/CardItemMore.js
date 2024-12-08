import React, {useState} from 'react';
import Tasks from "./Tasks";

const CardItemMore = () => {
    const [project] = useState({
        title: 'Tytuł Projektu',
        description: 'Opis projektu. Krótki opis celu i zakresu projektu.',
        status: 'in progress',
        isPrivate: true,
        participants: 10,
        maxParticipants: 20 // Dodano maksymalną liczbę uczestników
    });

    return (
        <div className="card__item__more__wrapper">
            <div className="card__item__more">
                <h2>{project.title}</h2>
                <div className="cards__item__status">
                    <div className="status_icon">{project.status}</div>
                </div>
                <p className="cards__item__text__description">{project.description}</p>
                <div className="member_progress_bar">
                    <i className="fas fa-users"></i>
                    <progress value={project.participants} max={project.maxParticipants}></progress>
                    <span>{project.participants}/{project.maxParticipants}</span>
                </div>
                {/*{project.isPrivate ? (*/}
                {/*    <button disabled style={{cursor: 'not-allowed'}}>🔒 Prywatny</button>*/}
                {/*) : (*/}
                {/*    <button>Dołącz</button>*/}
                {/*)}*/}

                <Tasks/>

                <button className="join_project_btn">
                    {project.isPrivate ? <i className="fas fa-lock"></i> : "Join"}
                </button>
            </div>
        </div>
    );
};

export default CardItemMore;