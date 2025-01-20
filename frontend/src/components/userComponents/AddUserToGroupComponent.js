import React, { useState, useEffect } from 'react';
import axios from "axios";
import Redirect from "react-router-dom/es/Redirect";
import {useParams} from "react-router-dom";


function AddUserToGroupComponent() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('userEmail');
    const { id } = useParams();  // Pobierz ID z URL
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState('');
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        if(!loaded) {
            await fetchUserData();
            await fetchUsersData();
            await fetchProjectById();
            await fetchGroups();
            setLoaded(true);
        }
    }, [user, project, groups])

    async function fetchUserData() {
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5051/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                },
            });
            setUser(response.data);
            console.log("fetching user data");
        } catch (err) {
            setError('Nie udało się załadować danych użytkownika.');
        }
    }

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
        <div>
            {project && groups &&
                <ul>
                    {groups.map((group) => (
                        <form onSubmit={handleAddUserToGroup(group.id)} key={group.id}>
                            <li key={group.id}>
                                <p>{group.name}</p>
                                <ul>
                                    {group.users.map((user) => (
                                        <li key={user}>
                                            {getUser(user) && <p>{getUser(user).name}: {getUser(user).username}</p>}
                                        </li>
                                    ))}
                                </ul>
                                <input type="submit" value="Join this group!"/>
                            </li>
                        </form>
                    ))}
                </ul>
            }
            {users &&
                <ul>
                    {users.map((ele) => (
                        <li key={ele.id}>
                            <p>{ele.id}{ele.username}</p>
                        </li>
                    ))}
                </ul>
            }
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default AddUserToGroupComponent;