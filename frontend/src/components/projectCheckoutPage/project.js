import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]); // Stan na listę projektów
    const [loading, setLoading] = useState(true); // Stan ładowania
    const [error, setError] = useState(''); // Stan błędu
    const [pageNo, setPageNo] = useState(0); // Numer aktualnej strony
    const [totalPages, setTotalPages] = useState(0); // Liczba stron

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

    const handleNextPage = () => {
        if (pageNo < totalPages - 1) {
            setPageNo(pageNo + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pageNo > 0) {
            setPageNo(pageNo - 1);
        }
    };

    return (
        <div>
            <h2>Lista projektów</h2>
            {loading && <p>Ładowanie...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <div>
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id}>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <p>Utworzono: {new Date(project.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={handlePreviousPage} disabled={pageNo === 0}>
                            Poprzednia strona
                        </button>
                        <button onClick={handleNextPage} disabled={pageNo === totalPages - 1}>
                            Następna strona
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectList;