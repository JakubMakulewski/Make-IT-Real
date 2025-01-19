import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import ProjectDetails from "./components/pages/ProjectDetails";
import LoginComponent from "./components/userComponents/LoginComponent";
import RegisterComponent from "./components/userComponents/RegisterComponent";
import ProjectList from "./components/projectCheckoutPage/project";
import AccountComponent from "./components/userComponents/AccountComponent";
import AddProject from "./components/AddProject";
import JoinProject from "./components/JoinProject";
import Kanban from "./components/Kanban/Kanban";
import DragAndDropExample from "./drag-and-drop";


const ProjectPage = ({ match }) => (
    <div>
      <h1>Project Page</h1>
      <p>Welcome to project {match.params.id}</p>
      <Kanban />
    </div>
);

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/products" component={Products} />
          <Route path="/sign-up" component={SignUp} />
          {/* <Route path="/project-details" component={ProjectDetails} /> */}

          <Route path="/projects/:id/tasks" component={ProjectDetails} />


          <Route path="/projects" component={ProjectList} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/account" component={AccountComponent} />

          <Route path="/add-project" component={AddProject} />


            {/*
          do poprawy jeszcze to bedzie
          <Route path="/join" component={JoinProject} />
          <Route path="Kanban" component={Kanban} />
          <Route path="/" exact component={JoinProject} />
          <Route path="/project/:id" component={ProjectPage} />
            <Route path="/drag-drop" element={<DragAndDropExample />} */}
          />
        </Switch>
        <Footer/>
      </Router>
    </>
  );

}

export default App;
