import React, { useState } from 'react';
import axios from 'axios';
import Redirect from "react-router-dom/es/Redirect";

const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5051/api/auth/register', {
                name: name,
                username: username,
                password: password,
                email: email, // Prześlij grupy, jeśli są wymagane
            });

            setError('');
            setSuccess('Registration successful! You can now log in.');
            console.log('Rejestracja zakończona sukcesem:', response.data);
        } catch (err) {
            setSuccess('');
            setError('Registration failed. Username/Email already in use!');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            {/* Wyświetlanie komunikatu błędu lub sukcesu */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <Redirect to="/login" />}
        </div>
    );
};

export default RegisterComponent;