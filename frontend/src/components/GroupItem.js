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
        if (!groupId || !projectId) {
            console.error("Brak groupId lub projectId, nie można pobrać użytkowników.");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        try {
            // Pobierz grupy przypisane do projektu
            const groupsResponse = await axios.get(`http://localhost:5051/projects/${projectId}/groups`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Pobierz listę użytkowników
            const usersResponse = await axios.get("http://localhost:5051/users", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageNo: 0,
                    pageSize: 100,
                    sortBy: "id",
                    sortDir: "asc",
                },
            });

            if (groupsResponse.data && usersResponse.data.content) {
                // Pobierz grupę z odpowiadającym `groupId`
                const currentGroup = groupsResponse.data.find((group) => group.id === groupId);

                if (!currentGroup) {
                    console.error(`Grupa o ID ${groupId} nie istnieje.`);
                    return;
                }

                // Filtruj użytkowników przypisanych do tej grupy
                const assignedUsers = usersResponse.data.content.filter((user) =>
                    currentGroup.assignedUsers.includes(user.id) // Zakładamy, że backend zwraca listę `assignedUsers`
                );

                setAssignedUsers(assignedUsers);
            } else {
                console.error("Brak danych grup lub użytkowników.");
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

            // Losowe przypisanie użytkowników
            const shuffled = [...allUsers].sort(() => 0.5 - Math.random());
            const selectedUsers = shuffled.slice(0, 3);
            setAssignedUsers(selectedUsers);

            console.log("Użytkownicy przypisani lokalnie:", selectedUsers);
        } catch (error) {
            console.error("Błąd podczas przypisywania użytkowników:", error);
        }
    };

    return (
        <div className="group__container" style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
            {loading && <p>Ładowanie...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && group && (
                <div className="group__item">
                    <h2 style={{ marginBottom: "10px", color: "#333" }}>{group.name}</h2>
                    <p style={{ marginBottom: "20px", color: "#555" }}>{group.description}</p>

                    {assignedUsers.length > 0 ? (
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
                    ) : (
                        <p style={{ marginTop: "20px" }}>Brak przypisanych użytkowników.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GroupItem;
