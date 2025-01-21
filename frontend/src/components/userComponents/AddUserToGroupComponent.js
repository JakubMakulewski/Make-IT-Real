import React, { useState, useEffect } from 'react';
import axios from "axios";
import Redirect from "react-router-dom/es/Redirect";
import {useParams} from "react-router-dom";
import "./AddUserToGroupComponent.css";
import "./../Cards.css";


function AddUserToGroupComponent() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('userEmail');
    const { id } = useParams();  // Pobierz ID z URL
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState('');
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        if(!loaded) {
            await fetchUsersData();
            await fetchProjectById();
            await fetchGroups();
            setLoaded(true);
        }
    }, [project, groups])

    async function fetchUsersData() {
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5051/users`, {
                params: {
                    pagepageSize: 1000,
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                },
            });
            setUsers(response.data.content);
            console.log("fetching users data");
        } catch (err) {
            setError('Nie udało się załadować użytkowników.');
        }
    }

    function getUser(id) {
        return users.find(element => element.id === id);
    }

    async function fetchProjectById() {
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5051/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                },
            });
            setProject(response.data); // Przechowaj dane projektu w stanie
            console.log("fetching project");
        } catch (err) {
            setError('Nie udało się załadować projektu.');
        }
    }

    async function fetchGroups() {
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }
        try {
            const response = await axios.get('http://localhost:5051/groups', {
                params: {
                    pageSize: 1000,
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                },
            });
            setGroups(response.data.content.filter(element => element.projectId === project.id));
            console.log("fetching groups");
        } catch (err) {
            setError('Nie udało się załadować grup.');
        }
    }

    const handleAddUserToGroup = (groupId) => async (e) => {
        e.preventDefault();
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }
        console.log("GroupId: " + groupId);
        const group = groups.find(element => element.id === groupId);
        if(group.users.indexOf(parseInt(userId)) === -1) {
            group.users.push(userId);
        }
        try {
            const response = await axios.put(
                `http://localhost:5051/groups/${groupId}`,
                {
                    id: group.id,
                    name: group.name,
                    users: group.users,
                    projectId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                    },
                }
            );
            setError('');
            setSuccess('You were added to selected group!');
            console.log('Dodano użytkownika do grupy!:', response.data);
            await fetchGroups();
        } catch (err) {
            console.log(e.target.key);
            setSuccess('');
            setError('You already are in this group!');
        }
    };

    return (
        <div className="account_container">
            {groups.length > 0 ? (
                <div className="cards__wrapper_acc">
                    <h1>Your Groups</h1>
                    <ul className="cards__items_account">
                        {groups.map((group) => {
                            const isUserInGroup = group.users.includes(parseInt(userId));
                            return (
                                <form onSubmit={handleAddUserToGroup(group.id)} className="join__form" key={group.id}>
                                    <li className="group_card">
                                        <h3 className="group__name">{group.name}</h3>
                                        <div className="group__users">
                                            {group.users.map((user) => (
                                                <div key={user} className="user__card">
                                                    <img
                                                        src={require(`../../images/img-${Math.floor(Math.random() * (21 - 18 + 1) + 18)}.jpg`)}
                                                        alt="Avatar"
                                                        className="user__avatar"
                                                    />
                                                    {getUser(user) && (
                                                        <>
                                                            <p className="user__name">{getUser(user).name}</p>
                                                            <p className="user__username">{getUser(user).username}</p>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <input
                                            type="submit"
                                            value={isUserInGroup ? "🔒" : "Join!"}
                                            className={`black_button ${isUserInGroup ? "disabled_button" : ""}`}
                                            disabled={isUserInGroup} // Blokowanie przycisku
                                        />
                                    </li>
                                </form>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <p className="no__groups">Brak grup do wyświetlenia.</p>
            )}
            {error && <p className="error__message">{error}</p>}
        </div>
    );
}

export default AddUserToGroupComponent;