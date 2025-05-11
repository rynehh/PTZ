import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Styles/ModalObj.css';

const ModalObj = () => {

    return (
        <>
            <div className="home-container-obj">

                <main className="main-content-obj">
                    <div className="container-obj">
                        <div className="content-obj">
                            <img src="InciensoMarino.png" alt="Llamaesfera" className="img-obj" />
                            <div className="text-container-obj">
                                <h1 className="title-obj">Incienso Marino</h1>
                                <p className="par-obj">Al estar equipado en un Pokémon, el incienso marino aumenta la potencia de sus movimientos de tipo agua en un 5%.</p>
                            </div>
                        </div>
                        <button className="add-object-obj">Agregar objeto</button>
                        <Link to="/Objetos"><div className="close-button-obj">X</div></Link>
                    </div>
                </main>

            </div>
        </>
    );
}

export default ModalObj;