import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Tasks from "./Tasks";
import axios from "axios";
import GroupItem from './GroupItem';

const CardItemMore = () => {
    const [project, setProject] = useState(null); // Stan na pojedynczy projekt
    const [loading, setLoading] = useState(true); // Stan ładowania
    const [error, setError] = useState(''); // Stan błędu

    const [projectGroups, setProjectGroups] = useState([]); // Stan grup projektu



    const [isPrivate, setIsPrivate] = useState(false);



    const { id } = useParams();  // Pobierz ID z URL



    useEffect(() => {
        if (id) {
            fetchProjectById();
            fetchProjectGroups(id); // Pobierz grupy projektu
        }
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

    const fetchProjectGroups = async (projectId) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5051/projects/${projectId}/groups`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.length > 0) {
                setProjectGroups(response.data); // Przypisz grupy do stanu
            } else {
                setError('Brak grup dla tego projektu.');
            }
        } catch (err) {
            setError('Nie udało się załadować grup projektu.');
            console.error('Błąd podczas pobierania grup projektu:', err);
        }
    };

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    return (
        <div className="card__item__more__wrapper">
            {loading && <p>Ładowanie...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && project && (
                <div className="card__item__more">
                    <h2>{project.name}</h2>

                    <figure className="cards__item__pic-wrap" data-category={project.category}>
                        <img
                            src={require(`../images/img-${randomNumberInRange(13, 17)}.jpg`)}
                            alt={`${project.name}`}
                            className="cards__item__img"
                        />
                    </figure>

                    <p className="cards__item__text__description">{project.description}</p>

                    {/* Sekcja zadań */}
                    <Tasks />

                    {/* Przycisk dołączenia */}
                    <button className="join_project_btn">
                        {project.isPrivate ? <i className="fas fa-lock"></i> : "Join"}
                    </button>

                    {/* Komponent GroupItem */}
                    <div className="group_item_wrapper">
                        {projectGroups.length > 0 ? (
                            projectGroups.map((group) => (
                                <GroupItem key={group.id} groupId={group.id} projectId={id} />
                            ))
                        ) : (
                            <p>Brak grup do wyświetlenia.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardItemMore;