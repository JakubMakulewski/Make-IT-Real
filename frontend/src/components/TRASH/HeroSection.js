import React from 'react';
import '../../App.css';
import { Button } from '../Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="./videos/video-1.mp4" autoPlay look muted />
            <h1>Welcome to Make it Real</h1>
            <p>Dive into the world of project management. Collaborate, create, and conquer your goals with ease.</p>
            <div className="hero-btns">
                <Button 
                    className="btns" 
                    buttonStyle="btn--outline" 
                    buttonSize="btn--large"
                    goTo="/login"
                >
                    Login
                </Button>
                <Button 
                    className="btns"
                    buttonStyle="btn--primary" 
                    buttonSize="btn--large"
                    goTo="/register"
                >
                    Register
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
