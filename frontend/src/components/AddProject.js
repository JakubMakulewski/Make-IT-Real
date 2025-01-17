import React from 'react';
import './AddProject.css';

function AddProject() {

    return (
        <div className="add_project">

            <h1>Add Project</h1>
            <div className="add_project_container">
                <p>Fill in the details</p>

                <form className="add_project_form">
                    <div className="form_inputs_text">
                        <div className="form_textfield_group">
                            <label>Title: </label>
                            <input
                                type="text"
                                // value={usernameOrEmail}
                                // onChange={(e) => setUsernameOrEmail(e.target.value)}
                                placeholder="title"
                                required
                            />
                        </div>
                        <div className="form_textfield_group">
                            <label>Category: </label>
                            <input
                                type="text"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                placeholder="categpry"
                                required
                            />
                        </div>
                        <div className="form_textfield_group">
                            <label>Description: </label>
                            <input
                                type="text"
                                placeholder="description"
                                required
                            />
                        </div>
                    </div>
                    <div className="form_button">
                        <button type="submit">Add</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddProject;