import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import "./LoginComponent.css"
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginComponent = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    let loggedIn = localStorage.getItem('jwtToken');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5051/api/auth/login', {
                usernameOrEmail,
                password,
            });

            // Pobranie tokena z odpowiedzi
            const accessToken = response.data.accessToken;
            setToken(accessToken);
            localStorage.setItem('jwtToken', accessToken);
            localStorage.setItem('userEmail', jwtDecode(accessToken).sub);
            console.log('Zalogowano pomyślnie! Token JWT:', accessToken);
            window.location.reload();
        }
        catch (err) {
            setError('Logowanie nie powiodło się. Sprawdź dane i spróbuj ponownie.');
            console.error('Błąd logowania:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            {loggedIn &&
                <Redirect to={"/account"}/>
            }
            {!loggedIn &&
            <div className="notLoggedIn">
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username or Email: </label>
                        <input
                            type="text"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Log in</button>
                </form>
                {token && <Redirect to="/"/>}
                {error && <p style={{color: 'red'}}>{error}</p>}
                <div>
                    <h2>No account?</h2>
                    <Link to="/register">
                        <button>Sign up!</button>
                    </Link>
                </div>
            </div>
            }
        </div>
    );
};

export default LoginComponent;