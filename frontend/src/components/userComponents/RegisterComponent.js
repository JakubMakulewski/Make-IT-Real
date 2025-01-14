import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [groups, setGroups] = useState([]); // Jeśli użytkownik wybiera grupy
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
            setSuccess('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
            console.log('Rejestracja zakończona sukcesem:', response.data);
        } catch (err) {
            setSuccess('');
            setError('Rejestracja nie powiodła się. Sprawdź dane i spróbuj ponownie.');
        }
    };

    const handleGroupChange = (e) => {
        const value = e.target.value;
        if (groups.includes(value)) {
            setGroups(groups.filter((group) => group !== value)); // Usuń grupę, jeśli już jest wybrana
        } else {
            setGroups([...groups, value]); // Dodaj grupę, jeśli nie jest jeszcze wybrana
        }
    };

    return (
        <div>
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Imię:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nazwa użytkownika:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Jeśli użytkownik może wybierać grupy */}
                <div>
                    <label>Wybierz grupy:</label>
                    <div>
                        <input
                            type="checkbox"
                            value="Group1"
                            onChange={handleGroupChange}
                        />
                        Group1
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="Group2"
                            onChange={handleGroupChange}
                        />
                        Group2
                    </div>
                    {/* Dodaj więcej grup w razie potrzeby */}
                </div>

                <button type="submit">Zarejestruj się</button>
            </form>

            {/* Wyświetlanie komunikatu błędu lub sukcesu */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterComponent;