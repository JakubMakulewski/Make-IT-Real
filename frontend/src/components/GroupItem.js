import React, { useEffect, useState } from "react";
import axios from "axios";

const GroupItem = ({ groupId, projectId }) => {
    const [group, setGroup] = useState(null); // Stan na pojedynczą grupę
    const [loading, setLoading] = useState(true); // Stan ładowania
    const [error, setError] = useState(""); // Stan błędu
    const [assignedUsers, setAssignedUsers] = useState([]); // Przechowywanie przypisanych użytkowników
    const [projectGroups, setProjectGroups] = useState([]); // Grupy należące do projektu

    useEffect(() => {
        if (!projectId || !groupId) {
            console.error("Brak projectId lub groupId. Nie można załadować danych.");
            setError("Nie można załadować danych. Sprawdź parametry.");
            setLoading(false);
            return;
        }
        fetchProjectGroups();
        fetchGroupById();
        fetchAssignedUsers();
    }, [groupId, projectId]);

    const fetchProjectGroups = async () => {
        if (!projectId) {
            console.error("Brak projectId, nie można załadować grup projektu.");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        try {
            const response = await axios.get(`http://localhost:5051/projects/${projectId}/groups`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.length > 0) {
                setProjectGroups(response.data);
            } else {
                setError("Brak grup dla tego projektu.");
            }
        } catch (err) {
            console.error("Błąd podczas ładowania grup projektu:", err);
            setError("Nie udało się załadować grup projektu.");
        }
    };

    const fetchGroupById = async () => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            setError("Brak tokenu uwierzytelniającego. Zaloguj się ponownie.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5051/groups/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setGroup(response.data);
            setLoading(false);
        } catch (err) {
            setError("Nie udało się załadować grupy.");
            setLoading(false);
        }
    };

    const fetchAssignedUsers = async () => {
        if (!groupId) {
            console.error("Brak groupId, nie można pobrać użytkowników.");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        try {
            const groupUserResponse = await axios.get("http://localhost:5051/groups-users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const usersResponse = await axios.get("http://localhost:5051/users", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageNo: 0,
                    pageSize: 100,
                    sortBy: "id",
                    sortDir: "asc",
                },
            });

            if (groupUserResponse.data && usersResponse.data.content) {
                const groupUsers = groupUserResponse.data.filter(
                    (record) => Number(record.GROUP_ID) === Number(groupId)
                );

                console.log("Przypisania dla groupId:", groupId, groupUsers);

                const assignedUsers = groupUsers
                    .map((record) =>
                        usersResponse.data.content.find((user) => user.id === Number(record.USER_ID))
                    )
                    .filter(Boolean);

                console.log("Użytkownicy przypisani do groupId:", groupId, assignedUsers);

                setAssignedUsers(assignedUsers);
            } else {
                console.error("Brak danych użytkowników lub przypisań.");
            }
        } catch (error) {
            console.error("Błąd podczas pobierania przypisanych użytkowników:", error);
        }
    };

    const handleAssignUsers = async () => {
        const token = localStorage.getItem("jwtToken");
        try {
            const response = await axios.get("http://localhost:5051/users", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageNo: 0,
                    pageSize: 100,
                    sortBy: "id",
                    sortDir: "asc",
                },
            });

            const allUsers = response.data.content;

            if (!Array.isArray(allUsers)) {
                console.error("Błąd: allUsers nie jest tablicą");
                return;
            }

            if (allUsers.length === 0) {
                console.error("Brak dostępnych użytkowników");
                return;
            }

            // Losowe przypisanie np. 3 użytkowników
            const shuffled = [...allUsers].sort(() => 0.5 - Math.random());
            const selectedUsers = shuffled.slice(0, 3);
            setAssignedUsers(selectedUsers);

            // Wyślij przypisanych użytkowników do API grupy
            await axios.post(
                `http://localhost:5051/groups/${groupId}/assign-users`,
                { users: selectedUsers },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Użytkownicy przypisani pomyślnie");
        } catch (error) {
            console.error("Błąd podczas przypisywania użytkowników:", error);
        }
    };

    return (
        <div className="group__item__wrapper">
            {loading && <p>Ładowanie...</p>}
            {error && !projectGroups.length && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && group && (
                <div className="group__item">
                    <h2>{group.name}</h2>
                    <p>{group.description}</p>
                    <button className="assign_users_btn" onClick={handleAssignUsers}>
                        Przypisani użytkownicy
                    </button>

                    {assignedUsers.length > 0 && (
                        <div className="assigned-users">
                            <h3>Użytkownicy przypisani do grupy:</h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                                    gap: "15px",
                                    marginTop: "20px",
                                }}
                            >
                                {assignedUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        style={{
                                            textAlign: "center",
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            borderRadius: "10px",
                                            background: "#f9f9f9",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <img
                                            src={
                                                user.avatar ||
                                                require(`../images/img-${Math.floor(
                                                    Math.random() * (21 - 18 + 1) + 18
                                                )}.jpg`)
                                            }
                                            alt={user.name}
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                marginBottom: "10px",
                                                border: "2px solid #ddd",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "#333",
                                            }}
                                        >
                                            {user.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GroupItem;
