import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Groups.css";

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [joinedGroup, setJoinedGroup] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get("http://localhost:5051/groups", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                });
                setGroups(response.data);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };
        fetchGroups();
    }, []);

    const handleJoinGroup = (groupId) => {
        setJoinedGroup(groupId);
    };

    const handleGoToKanban = () => {
        if (joinedGroup) {
            history.push(`/view-group/${joinedGroup}`);
        } else {
            alert("Please join a group first.");
        }
    };

    return (
        <div className="groups-container">
            <h2>Your Groups</h2>
            <div className="groups-list">
                {groups.map((group) => (
                    <div className="group-card" key={group.id}>
                        <p>{group.name}</p>
                        <button onClick={() => handleJoinGroup(group.id)}>Join!</button>
                    </div>
                ))}
            </div>

            {joinedGroup && (
                <div className="kanban-access">
                    <p>You joined group {joinedGroup}</p>
                    <button onClick={handleGoToKanban}>Go to Kanban Board</button>
                </div>
            )}
        </div>
    );
};

export default Groups;
