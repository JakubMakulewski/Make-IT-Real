import React, { useEffect , useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./AccountComponent.css";
import CardAccount from "../CardAccount";

const AccountComponent = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState(''); // Stan błędu
    let groups = [];
    const [projects, setProjects] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const token = localStorage.getItem('jwtToken');

    useEffect( async () => {
        if(!loaded)
        {
            await fetchUserData();
            await fetchGroups();
            await fetchProjects();
            setLoaded(true);
        }
    },[email, user, groups, projects]);

    async function fetchUserData() {
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
            setEmail(localStorage.getItem('userEmail'));
            setUser(response.data.content.find(element => element.email === email));
            localStorage.setItem('userId', user.id);
        } catch (err) {
            setError('Nie udało się załadować danych użytkownika.');
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
                    Authorization: `Bearer ${token}`,
                }
            });
            // setGroups(response.data.content.filter(element => element.users.find(x => x === user.id) !== undefined));
            console.log("FOUND");
            console.log(response.data.content.filter(element => element.users.find(x => x === user.id) !== undefined));
            const temp = response.data.content.filter(element => element.users.find(x => x === user.id) !== undefined);
            groups = temp;
            console.log(temp);
            console.log(groups);
            console.log(user.id);
        } catch(err) {
            setError('Nie udało się załadować grup.');
            console.log(err);
        }
    }

    async function fetchProjects() {
        if (!token) {
            setError('Brak tokenu uwierzytelniającego. Zaloguj się ponownie.');
            return;
        }
        try {
            const response = await axios.get('http://localhost:5051/projects', {
                params: {
                    pageSize: 100, // Liczba elementów na stronę
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProjects(response.data.content.filter(element => groups.find(x => x.projectId === element.id) !== undefined));
        } catch(err) {
        setError('Nie udało się załadować projektów.');
        }
    }


    const logout = () => {
        try {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            setLoggedOut(true);
        }
        catch (err) {
            setError('Nie udało się wylogować!');
        }
    };

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };
    //card__item__more
    return (
        <div className="account_container">
            <h1>Profile</h1>
            <div className="card__item__more_Acc">
                <div className="account_container2">
                    <img src={require("../../images/img-" + randomNumberInRange(18, 21) + ".jpg")}
                         className="profile_image"/>
                </div>
                <div>
                    {user &&
                        <div className="userData_wrapper">
                            <h2>Hello, {user.username}!</h2>
                            <h3>Your account info:</h3>
                            <p>First name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            {/*<hr/>*/}
                        </div>
                    }
                </div>
                {groups && projects &&
                    <div className="cards__wrapper_acc">
                        <h1>Your projects</h1>
                        <ul className="cards__items_account">
                            {projects.map((project) => (
                                <CardAccount key={project.id}
                                             src={require("../../images/img-" + randomNumberInRange(13, 17) + ".jpg")}
                                    // src={require('../images/img-10.jpg')}
                                             text={project.name}
                                             description={project.description}
                                    //   count_member="10/20"
                                    //   status="in progress"
                                             label={project.category}
                                    //   path="/project-details"
                                             path={`/project/${project.id}/tasks`}
                                >
                                </CardAccount>

                            ))}
                        </ul>
                    </div>
                }
            </div>
            <div className="logout_container">
                <div className="logout_button_center">
                    <button onClick={logout}>Log out</button>
                    {loggedOut && <Redirect to="/"/>}
                </div>
            </div>
        </div>
    );
};

export default AccountComponent;