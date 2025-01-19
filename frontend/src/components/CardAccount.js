import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

function CardAccount(props) {
    const [isPrivate, setIsPrivate] = useState(false);


    return (
        <>
            <li className="cards__item">
                <div className="cards__item__link">
                    <div className="project_card" data-category={props.label}>
                        <h2 className="cards__item__text__title">{props.text}</h2>
                        <figure className="cards__item__pic-wrap_acc" data-category={props.label}>
                            <img
                                src={props.src}
                                // alt="Travel Image"
                                className="cards__item__img_acc"
                            />
                        </figure>
                        <p className="cards__item__text__description">{props.description?.length > 250 ? `${props.description.substring(0, 250)}...` : props.description}</p>
                    </div>
                </div>
            </li>
        </>
    );
}

export default CardAccount;