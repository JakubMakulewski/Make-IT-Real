import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Kanban from "./Kanban/Kanban";
import './ViewGroupPage.css';

const ViewGroupPage = () => {
    const { groupId } = useParams();
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const [group, setGroup] = useState(null);
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchGroupData = async () => {
            if (!token) {
                setError("Authentication token not found. Please log in again.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5051/groups/${groupId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const fetchedGroup = response.data;
                setGroup(fetchedGroup);

                if (!fetchedGroup.users.includes(parseInt(userId))) {
                    history.push("/"); // Redirect if user is not part of the group
                }
            } catch (err) {
                setError("Failed to load group data.");
            }
        };

        fetchGroupData();
    }, [groupId, token, userId, history]);

    return (
        <div className="view-group-page">
            {error && <p className="error-message">{error}</p>}
            {group ? (
                <>
                    <h1>{group.name}</h1>
                    <p className="project_number_p">Project: {group.projectId}</p>
                    {/*<div className="kanban-container">*/}
                        <Kanban projectId={group.projectId} /> {/* Pass the projectId to Kanban */}
                    {/*</div>*/}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewGroupPage;
