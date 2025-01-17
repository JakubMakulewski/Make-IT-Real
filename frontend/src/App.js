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
        </Switch>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
