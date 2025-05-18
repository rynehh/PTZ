import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Styles/SidebarRight.css';
import axios from 'axios';

const SidebarRight = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [dataU, setDataU] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(userData);

            axios.get("http://localhost:3001/gethomeuser", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(async (resp) => {
                    if (resp.data.msg === "Error") {
                        alert("Error al obtener la info");
                    } else if (resp.data.msg === "No info") {
                        setDataU(null);
                    } else {
                        const { PFP, EQUIPO, OBJETOS } = resp.data;

                        const equipoIds = Object.values(EQUIPO || {}).slice(0, 6);
                        const objetoIds = Object.values(OBJETOS || {}).slice(0, 6);

                        const pokemonImages = await Promise.all(
                            equipoIds.map(async id => {
                                if (!id) return "/white.jpg";
                                try {
                                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                                    return res.data.sprites.front_default || "/white.jpg";
                                } catch {
                                    return "/white.jpg";
                                }
                            })
                        );

                        const objectImages = await Promise.all(
                            objetoIds.map(async id => {
                                if (!id) return "/white.jpg";
                                try {
                                    const res = await axios.get(`https://pokeapi.co/api/v2/item/${id}`);
                                    return res.data.sprites.default || "/white.jpg";
                                } catch {
                                    return "/white.jpg";
                                }
                            })
                        );

                        setDataU({ PFP, pokemonImages, objectImages });
                    }
                });
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <aside className="sidebar-right">
            {isLoggedIn && dataU && dataU.pokemonImages && dataU.objectImages ? (
                <>
                    <img className="profile-avatar" src={'data:image/png;base64,' + dataU.PFP} alt="..."></img>
                    <div className="mini-circles-list">
                        {dataU.pokemonImages.map((pokeImg, index) => (
                            <div
                                className={`circle-wrapper ${index % 2 === 0 ? 'left' : 'right'}`}
                                key={index}
                            >
                                <img
                                    className={index % 2 === 0 ? 'circle-pair' : 'circle-pair2'}
                                    src={pokeImg || '/white.jpg'}
                                    alt="/white.jpg"
                                />
                                <img
                                    className={index % 2 === 0 ? 'objeto' : 'objeto2'}
                                    src={dataU.objectImages[index] || '/white.jpg'}
                                    alt="/white.jpg"
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : isLoggedIn ? (
                <div className="loading">
                    <img src="/ditto.gif" alt="Cargando..." />
                    <p>Cargando...</p>
                </div>
            ) : (
                <>
                    <img className="profile-avatar" src="/pkball.png" alt="/white.jpg"></img>
                    
                </>
            )}

        </aside>
    );
};

export default SidebarRight;
