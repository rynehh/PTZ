import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Styles/Navbar.css';
import Swal from 'sweetalert2';

const Navbar = () => {

    const AlertDef = (text) => {
        Swal.fire({
            title: '¡Aviso de la Pokédex!',
            text: text,
            imageUrl: 'ditto.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Imagen de ditto',
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
            background: '#90c4d0',
            color: '#000000',
        });
    };

    const AlertErr = (text) => {
        Swal.fire({
            title: '¡Se ha escapado!',
            text: text,
            imageUrl: 'ditto.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Imagen de ditto',
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
            background: '#ab3232',
            color: '#000000',
        });
    };

    const AlertTrue = (text) => {
        Swal.fire({
            title: '¡Capturado!',
            text: text,
            imageUrl: 'ditto.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Imagen de ditto',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            background: '#3ea83d',
            color: '#000000',
        });
    };

    const nav = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            if (location.pathname === "/Objetos") {
                nav(`/Objetos?search=${searchTerm.toLowerCase()}`);
            } else {
                nav(`/Pkdx?search=${searchTerm.toLowerCase()}`);
            }
        } else {
            AlertErr("Ingresa un nombre o número de Pokémon")
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(userData);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        AlertDef("Guardando la partida");
        setTimeout(() => {
            nav("/");
        }, 2500);

    };

    return (
        <header className="navbar">
            <h1 className="sidebar-title">
                Pokémon<br />Training <strong>Zone</strong>
            </h1>

            <div className="search-bar">
                <input type="text" placeholder="Buscar..." className="search-input" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }} />
                <button onClick={handleSearch} className="search-button"><img className="searchimg" src="/search.png" /></button>
            </div>
            <div className="header-buttons">
                {isLoggedIn ? (
                    <>
                        <Link to="/Perfil">
                            <button className="btn-profile">{user?.username}</button>
                        </Link>
                        <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/">
                            <button className="btn-profile">Iniciar Sesión</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn-logout">Crear Cuenta</button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
