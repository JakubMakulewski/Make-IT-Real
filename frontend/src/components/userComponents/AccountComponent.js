import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

const AccountComponent = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [users, setUsers] = useState([]);
    const [pageNo, setPageNo] = useState(0); // Numer aktualnej strony
    const [error, setError] = useState(''); // Stan błędu
    const [totalPages, setTotalPages] = useState(0); // Liczba stron

    const logout = async () => {
        try {
            localStorage.removeItem('jwtToken');
            setLoggedOut(true);
        }
        catch (err) {
        }
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem('jwtToken'); // Pobierz token JWT z localStorage
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5051/users', {
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
            setUsers(data.content);
            setTotalPages(data.totalPages); // Całkowita liczba stron
        } catch (err) {
            setError('Nie udało się załadować użytkowników.');
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <ul>
                    {users.map((user) => (
                        <li>
                            <h3>{user.name}</h3>
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
            <div>
                <button onClick={logout}>Logout</button>
                {loggedOut && <Redirect to="/"/>}
            </div>
        </div>
    )
};

export default AccountComponent;