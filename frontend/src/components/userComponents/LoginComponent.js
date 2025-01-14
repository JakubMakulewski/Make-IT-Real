import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

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

            // Zapis tokena w localStorage
            localStorage.setItem('jwtToken', accessToken);

            setError('');
            console.log('Zalogowano pomyślnie! Token JWT:', accessToken);
        } catch (err) {
            setError('Logowanie nie powiodło się. Sprawdź dane i spróbuj ponownie.');
            console.error('Błąd logowania:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <h2>Logowanie</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Nazwa użytkownika lub email:</label>
                    <input
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Zaloguj się</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token && <p style={{ color: 'green' }}>Zalogowano pomyślnie!</p>}
        </div>
    );
};

export default LoginComponent;