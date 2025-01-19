import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const JoinProject = () => {
    const [projectId, setProjectId] = useState("");
    const history = useHistory();

    const handleJoinProject = () => {
        if (!projectId) {
            alert("Please enter a valid Project ID!");
            return;
        }
        history.push(`/project/${projectId}`);
    };

    return (
        <div style={styles.container}>
            <h2>Join a Project</h2>
            <div style={styles.formGroup}>
                <label htmlFor="projectId">Project ID:</label>
                <input
                    type="text"
                    id="projectId"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="Enter Project ID"
                />
            </div>
            <button onClick={handleJoinProject} style={styles.button}>
                Join Project
            </button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
    },
    formGroup: {
        marginBottom: "15px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default JoinProject;
