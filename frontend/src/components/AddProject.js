import React, { useState } from 'react';
import './AddProject.css';
import axios from "axios";
import Redirect from "react-router-dom/es/Redirect";


function AddProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [category, setCategory] = useState('');
    // const [categories, setCategories] = useState([]);


    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleAddProject = async (e) => {


        e.preventDefault();
    // const handleAddProject = async () => {

        const token = localStorage.getItem('jwtToken');

        try {
            const response = await axios.post(
                'http://localhost:5051/projects',
                {
                    name: name,         // Dane przesyłane w ciele żądania
                    description: description,
                    category: category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
                    },
                }
            );

            // const data = response.data;
            // setCategories(data.content);

            setError('');
            setSuccess('Project successful added!');
            console.log('Dodawanie mowego projektu zakończone sukcesem:', response.data);
        } catch (err) {
            setSuccess('');
            setError('Adding project failed.');
        }
    };


    return (
        <div className="add_project">

            <h1>Add Project</h1>
            <div className="add_project_container">
                <p>Fill in the details</p>

                <form className="add_project_form" onSubmit={handleAddProject}>
                    <div className="form_inputs_text">
                        <div className="form_textfield_group">
                            <label>Name: </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="name"
                                required
                            />
                        </div>
                        <div className="form_textfield_group">
                            <label>Category: </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="category"
                                required
                            />
                            {/*<select>*/}
                            {/*    /!*<option value={}>{}</option>*!/*/}
                            {/*</select>*/}
                        </div>
                        <div className="form_textfield_group">
                            <label>Description: </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
            {/* Wyświetlanie komunikatu błędu lub sukcesu */}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <Redirect to="/"/>}
        </div>
    );
}

export default AddProject;