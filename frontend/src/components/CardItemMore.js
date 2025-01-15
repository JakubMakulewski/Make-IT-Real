import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Tasks from "./Tasks";
import axios from "axios";

const CardItemMore = () => {
    const [project] = useState({
        title: 'Tytuł Projektu',
        description: 'Opis projektu. Krótki opis celu i zakresu projektu.',
        status: 'in progress',
        isPrivate: true,
        participants: 10,
        maxParticipants: 20 // Dodano maksymalną liczbę uczestników
    });



    const [projects, setProjects] = useState([]); // Stan na listę projektów
    const [loading, setLoading] = useState(true); // Stan ładowania
    const [error, setError] = useState(''); // Stan błędu
    const [pageNo, setPageNo] = useState(0); // Numer aktualnej strony
    const [totalPages, setTotalPages] = useState(0); // Liczba stron


    const [isPrivate, setIsPrivate] = useState(false);



    const { id } = useParams();  // Pobierz ID z URL
    // const [project2, setProject2] = useState(null);

    // useEffect(() => {
    //     fetchProject();
    // }, [id]); // Pobierz projekty przy zmianie numeru strony

    // const fetchProject = async () => {
    //     const token = localStorage.getItem('jwtToken'); // Pobierz token JWT z localStorage
    //     if (!token) {
    //         setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         const response = await axios.get(`http://localhost:5051/projects`, {
    //             // params: {
    //             //     pageNo: pageNo,
    //             //     pageSize: 10, // Liczba elementów na stronę
    //             //     sortBy: 'id', // Sortowanie po polu
    //             //     sortDir: 'asc', // Kierunek sortowania
    //             // },
    //             headers: {
    //                 Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
    //             },
    //         });

    //         const data = response.data;
    //         setProject2(data.content); // `content` zawiera listę projektów
    //         // setTotalPages(data.totalPages); // Całkowita liczba stron
    //         setLoading(false);
    //     } catch (err) {
    //         setError('Nie udało się załadować projektów.');
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        fetchProjects();
    }, [pageNo]); // Pobierz projekty przy zmianie numeru strony

    const fetchProjects = async () => {
        const token = localStorage.getItem('jwtToken'); // Pobierz token JWT z localStorage
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://localhost:5051/projects', {
                params: {
                    pageNo: pageNo,
                    pageSize: 10, // Liczba elementów na stronę
                    sortBy: 'id', // Sortowanie po polu
                    sortDir: 'asc', // Kierunek sortowania
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                },
            });

            const data = response.data;
            setProjects(data.content); // `content` zawiera listę projektów
            setTotalPages(data.totalPages); // Całkowita liczba stron
            setLoading(false);
        } catch (err) {
            setError('Nie udało się załadować projektów.');
            setLoading(false);
        }
    };



    return (
        <div className="card__item__more__wrapper">
            {loading && <p>Ładowanie...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!loading && !error && (
<div>
{projects.map((project) => (
    // if(project.id==id){
            <div className="card__item__more" key={project.id}>
                <h2>{project.name}</h2>
                {/* <div className="cards__item__status">
                    <div className="status_icon">{project.status}</div>
                </div> */}
                <p className="cards__item__text__description">{project.description}</p>
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
        ))}
        </div>

            )}
        </div>
    );
};

export default CardItemMore;