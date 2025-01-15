import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Tasks from "./Tasks";
import axios from "axios";

const CardItemMore = () => {
    const [project, setProject] = useState(null); // Stan na pojedynczy projekt
    const [loading, setLoading] = useState(true); // Stan ładowania
    const [error, setError] = useState(''); // Stan błędu



    const [isPrivate, setIsPrivate] = useState(false);



    const { id } = useParams();  // Pobierz ID z URL



    useEffect(() => {
        fetchProjectById();
    }, [id]); // Pobierz projekt przy zmianie ID

    const fetchProjectById = async () => {
        const token = localStorage.getItem('jwtToken'); // Pobierz token JWT z localStorage
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5051/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                },
            });

            setProject(response.data); // Przechowaj dane projektu w stanie
            setLoading(false);
        } catch (err) {
            setError('Nie udało się załadować projektu.');
            setLoading(false);
        }
    };



    return (
        <div className="card__item__more__wrapper">
            {loading && <p>Ładowanie...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!loading && !error && project && (

            <div className="card__item__more">
                <h2>{project.name}</h2>

                {/*STATUS - funkcja do rozszerzenia aplikacji*/}
                {/* <div className="cards__item__status">
                    <div className="status_icon">{project.status}</div>
                </div> */}
                <p className="cards__item__text__description">{project.description}</p>

                {/*MEMBER COUNT - funkcja do rozszerzenia aplikacji*/}
                {/* <div className="member_progress_bar">
                    <i className="fas fa-users"></i>
                    <progress value={project.participants} max={project.maxParticipants}></progress>
                    <span>{project.participants}/{project.maxParticipants}</span>
                </div> */}


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
                // }
        )}
        </div>


    );
};

export default CardItemMore;