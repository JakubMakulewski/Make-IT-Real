import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

const AccountComponent = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState(''); // Stan błędu


    useEffect(() => {
        fetchUserData();
    });

    const fetchUserData = async () => {
        setEmail(localStorage.getItem('userEmail'));
        const token = localStorage.getItem('jwtToken'); // Pobierz token JWT z localStorage
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5051/users', {
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                },
            });
            setUser(response.data.content.find(element => element.email === email));
        } catch (err) {
            setError('Nie udało się załadować danych użytkownika.');
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userEmail');
            setLoggedOut(true);
        }
        catch (err) {
        }
    };

    return (
        <div>
            <div>
                {user && (
                    <div>
                        <h2>Hello {user.name}!</h2>
                        <p>Your email: {user.email}</p>
                    </div>
                )}
            </div>
            <div>
                <button onClick={logout}>Logout</button>
                {loggedOut && <Redirect to="/"/>}
            </div>
        </div>
    )
};

export default AccountComponent;