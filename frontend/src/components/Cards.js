import React, {useEffect, useState} from 'react';
import CardItem from './CardItem';
import './Cards.css';
import {Button} from "./Button";
import axios from "axios";
// import myImage from '../images/img-11.jpg';

// import './Navbar.css';

function Cards() {

    const [projects, setProjects] = useState([]); // Stan na listę projektów
    const [loading, setLoading] = useState(true); // Stan ładowania
    const [error, setError] = useState(''); // Stan błędu
    const [pageNo, setPageNo] = useState(0); // Numer aktualnej strony
    const [totalPages, setTotalPages] = useState(0); // Liczba stron


    const [isPrivate, setIsPrivate] = useState(false);



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


    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    return (
        <div className="cards">
            <h1>Projects List</h1>
            <div className="above_project_list">
                <button className="black_button">Add project</button>
            </div>
            {loading && <p>Ładowanie...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!loading && !error && (
            <div className="cards__container">
                <div className="cards__wrapper">
                    {/* <ul className="cards__items">
                        <CardItem
                            src="images/img-9.jpg"
                            text="Explore the hidden waterfall deep inside the Amazon Jungle"
                            label="Adventure"
                            path="/services"
                        />
                        <CardItem
                            src="images/img-2.jpg"
                            text="Travel through the Islands of Bali in a Private Cruise"
                            label="Luxury"
                            path="/services"
                        />
                    </ul> */}
                    <ul className="cards__items">
                        {projects.map((project) => (
                        <CardItem key={project.id}
                                  //src={require("../images/img-"+randomNumberInRange(13, 17)+".jpg")}
                            // src={require('../images/img-10.jpg')}
                                  text={project.name}
                                  description={project.description}
                                //   count_member="10/20"
                                //   status="in progress"
                                  label={project.category}
                                //   path="/project-details"
                                  path={`/projects/${project.id}/tasks`}
                        >
                        </CardItem>

                            ))}
                    </ul>
                </div>
            </div>
            
            )}
            <div className="paginationButtons">
                <button onClick={handlePreviousPage} disabled={pageNo === 0}>
                    Previous page
                </button>
                <button onClick={handleNextPage} disabled={pageNo === totalPages - 1}>
                    Next page
                </button>
            </div>
        </div>
    );
}

export default Cards;