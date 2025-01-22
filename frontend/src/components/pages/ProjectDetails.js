import React from 'react';
import '../../App.css';
import CardItemMore from '../CardItemMore';
import Footer from '../Footer';
import JoinProject from "../JoinProject";
import {useParams} from "react-router-dom";


function ProjectDetails() {
    const {projectId} = useParams();
    return (
        <>
            <CardItemMore />
            {/* <Footer /> */}
            {/*<JoinProject />*/}

        </>
    );
}

export default ProjectDetails;