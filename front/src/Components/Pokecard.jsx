import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Pokecard.css';

const Pokecard = ({ title, text, image, link }) => {
    return (
        <div className="custom-card">
            <h1 className="custom-card-text">{text}</h1>
            <img src={image} alt="Card" className="custom-card-img" />
            <div className="custom-card-body">
                <h2 className="custom-card-title">{title}</h2>     
                <Link to="/Modal"><a href={link} className="custom-card-btn"><img className="Poke-btn" src="/pkball.png"/></a></Link>
            </div>
        </div>
    );
}

export default Pokecard;
