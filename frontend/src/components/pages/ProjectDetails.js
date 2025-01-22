import React from 'react';
import '../../App.css';
import CardItemMore from '../CardItemMore';
import Footer from '../Footer';
import JoinProject from "../JoinProject";
import {useParams} from "react-router-dom";
import Kanban from "../Kanban/Kanban";


function ProjectDetails() {
    const {projectId} = useParams();
    return (
        <>
            <CardItemMore />
            {/* <Footer /> */}
<<<<<<< Updated upstream
            <JoinProject />

=======
            {/*<JoinProject />*/}
            <Kanban />
>>>>>>> Stashed changes
        </>
    );
}

export default ProjectDetails;