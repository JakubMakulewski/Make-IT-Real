import React from 'react';
import { Link } from 'react-router-dom';


function CardItem(props) {
    return (
        <>
            <li className="cards__item">
                {/*<button className="star_like"></button>*/}
                <Link className="cards__item__link" to={props.path}>
                    {/*<figure className="cards__item__pic-wrap" data-category={props.label}>*/}
                    {/*    <img*/}
                    {/*        src={props.src}*/}
                    {/*        alt="Travel Image"*/}
                    {/*        className="cards__item__img"*/}
                    {/*    />*/}
                    {/*</figure>*/}
                    <div className="project_card" data-category={props.label}>
                        <h2 className="cards__item__text__title">{props.text}</h2>
                        <p className="cards__item__text__description">{props.description}</p>
                    </div>
                    {/*<div className="cards__item__info">*/}
                    <div className="cards__item__buttons">
                        {/*<h5 className="cards__item__text">{props.text}</h5>*/}
                        <button>Status</button>
                        <button>Locked</button>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default CardItem;