import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

function CardItem(props) {
    const [isPrivate, setIsPrivate] = useState(false);


    return (
        <>
            <li className="cards__item">
                {/*<button className="star_like"></button>*/}
                {/*<Link className="cards__item__link" to={props.path}>*/}
                <div className="cards__item__link">

                    <div className="project_card" data-category={props.label}>
                        <h2 className="cards__item__text__title">{props.text}</h2>
                        <figure className="cards__item__pic-wrap" data-category={props.label}>
                            <img
                                src={props.src}
                                // alt="Travel Image"
                                className="cards__item__img"
                            />
                        </figure>
                        <p className="cards__item__text__description">{props.description?.length > 250 ? `${props.description.substring(0, 250)}...` : props.description}</p>
                    </div>
                    {/*<div className="cards__item__info">*/}
                    <div className="cards__item__buttons__parent">

                        {/*STATUS - funkcja do rozszerzenia aplikacji*/}
                        {/*<div className="cards__item__status">*/}
                        {/*    <div className="status_icon">{props.status}</div>*/}
                        {/*</div>*/}
                        <div className="cards__item__buttons">
                            {/*<h5 className="cards__item__text">{props.text}</h5>*/}

                            {/*MEMBER COUNT - funkcja do rozszerzenia aplikacji*/}
                            {/*<div className="member_count">*/}
                            {/*    <i className="fas fa-users"></i>*/}
                            {/*    <span className="">{props.count_member}</span>*/}
                            {/*</div>*/}
                            <Link to={props.path}
                                className="join_project_btn"
                                // onClick={() => setIsPrivate(!isPrivate)}
                                // href="/project-details"

                                // href={props.path}

                                // id={props.key}
                                // text={props.text}
                            >
                                {isPrivate ? <i className="fas fa-lock"></i> : "Join"}
                            </Link>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default CardItem;