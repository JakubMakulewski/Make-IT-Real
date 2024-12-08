import React from 'react';
import CardItem from './CardItem';
import './Cards.css';
import {Button} from "./Button";

// import './Navbar.css';

function Cards() {
    return (
        <div className="cards">
            <h1>Check out these EPIC Destinations!</h1>
            <div className="above_project_list">
                <button className="black_button">Add project</button>
            </div>
            <div className="cards__container">
                <div className="cards__wrapper">
                    {/* <ul className="cards__items">
                        <CardItem
                            src="images/img-9.jpg"
                            text="Explore the hidden waterfall deep inside the Amazon Jungle"
                            label="Adventure"
                            path="/services"
                        />
                        <CardItem
                            src="images/img-2.jpg"
                            text="Travel through the Islands of Bali in a Private Cruise"
                            label="Luxury"
                            path="/services"
                        />
                    </ul> */}
                    <ul className="cards__items">
                        <CardItem 
                            src="images/img-3.jpg" 
                            text="Set Sail in the Atlantic Ocean visiting Uncharted Waters" 

                            description="Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1 Description project 1"
                            count_member="10/20"
                            status="in progress"

                            label="Website"
                            path="/services"
                        />
                        <CardItem 
                            src="images/img-4.jpg" 
                            text="Experience Football on Top of the Himilayan Mountains" 
                            label="Mobile App"
                            path="/products"
                        />
                        <CardItem 
                            src="images/img-8.jpg" 
                            text="Ride through the Sahara Desert on a guided camel tour" 
                            label="Adrenaline" 
                            path="/sign-up"
                        />
                        <CardItem 
                            src="images/img-8.jpg" 
                            text="Ride through the Sahara Desert on a guided camel tour" 
                            label="Adrenaline" 
                            path="/sign-up"
                        />
                        <CardItem 
                            src="images/img-8.jpg" 
                            text="Ride through the Sahara Desert on a guided camel tour" 
                            label="Adrenaline" 
                            path="/sign-up"
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;