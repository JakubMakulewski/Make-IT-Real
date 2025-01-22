import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Projects from './components/pages/Projects';
import SignUp from './components/pages/SignUp';
import ProjectDetails from "./components/pages/ProjectDetails";
import LoginComponent from "./components/userComponents/LoginComponent";
import RegisterComponent from "./components/userComponents/RegisterComponent";
import ProjectList from "./components/projectCheckoutPage/project";
import AccountComponent from "./components/userComponents/AccountComponent";
import AddProject from "./components/AddProject";
import JoinProject from "./components/JoinProject";
import Kanban from "./components/Kanban/Kanban";
import AddUserToGroupComponent from "./components/userComponents/AddUserToGroupComponent";




function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/services" component={Services} />
          <Route path="/products" component={Products} />
          <Route path="/projects" component={Projects} />
          <Route path="/sign-up" component={SignUp} />
          {/* <Route path="/project-details" component={ProjectDetails} /> */}

          <Route path="/project/:id/tasks" component={ProjectDetails} />


          <Route path="/project" component={ProjectList} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/account" component={AccountComponent} />
            <Route path="/join_project/:id" exact component={AddUserToGroupComponent} />
            <Route path="/join_project/:id" component={Kanban} />
          <Route path="/add-project" component={AddProject} />
        </Switch>
        <Footer/>
      </Router>
    </>
  );

}

export default App;
