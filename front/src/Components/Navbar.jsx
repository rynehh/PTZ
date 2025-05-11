import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar">
            <h1 className="sidebar-title">
                Pokémon<br />Training <strong>Zone</strong>
            </h1>

            <div className="search-bar">
                <input type="text" placeholder="Buscar..." className="search-input" />
                <Link to="/Pkdx"><button className="search-button"><img className="searchimg" src="/search.png" /></button></Link>
            </div>
            <div className="header-buttons">
                <Link to="/Perfil"><button className="btn-profile">Mi perfil</button></Link>
                <Link to="/"><button className="btn-logout">Cerrar Sesión</button></Link>
            </div>
        </header>
    );
};

export default Navbar;
