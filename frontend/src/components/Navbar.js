import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import {render} from "react-dom";


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwtToken'));
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        }   else {
            setButton(true);
        }
    };

    const checkLogin = () => {
        setLoggedIn(localStorage.getItem('jwtToken'));
    }

    useEffect(() => {
        showButton();
    }, []);

    const logoTitle = 'Make it Real';

    window.addEventListener('resize', showButton);
    window.addEventListener('click', checkLogin);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-container-left">
                        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                            {logoTitle} <i className="fa fa-ship" />
                        </Link>
                        <div className="menu-icon" onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/services"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    My projects
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/products"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Calendar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    // to="/sign-up"
                                    to="/login"
                                    className="nav-links-mobile"
                                    onClick={closeMobileMenu}
                                >
                                    {/*Sign-up*/}
                                    {loggedIn ? 'ACCOUNT' : 'SIGN IN'}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-container-right">
                        {/* <form>
                            <input type='text' placeholder='Search...'></input>
                        </form> */}
                        {button && <Button buttonStyle="btn--outline">{loggedIn ? 'ACCOUNT' : 'SIGN IN'}</Button>}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
export const logoTitle = "Make it Real";