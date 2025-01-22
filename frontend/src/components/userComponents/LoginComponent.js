import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./LoginComponent.css";

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


    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    return (
        <div className="add_project">
            {loggedIn &&
                <Redirect to={"/account"}/>
            }
            {!loggedIn &&
                <div>
                    <h1>Log in</h1>
                    <div className="add_project_container">
                        <form onSubmit={handleLogin}>
                            <div className="form_textfield_group">
                                <label>Username or Email: </label>
                                <input
                                    type="text"
                                    value={usernameOrEmail}
                                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    placeholder="username or email"
                                    required
                                />
                            </div>
                            <div className="form_textfield_group">
                                <label>Password: </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    required
                                />
                            </div>
                            <div className="form_button">
                                <button type="submit">Log in</button>
                            </div>
                        </form>
                        {token && <Redirect to="/account"/>}
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <div className="no_account">
                            <h2>No account?</h2>
                            <Link to="/register" className="form_button_center">
                                <button>Sign up!</button>
                            </Link>
                            {/*Don't have an account? <Link to="/register" className="sign_up">Sign up!</Link>*/}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default LoginComponent;