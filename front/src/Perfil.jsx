import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import SidebarRight from './Components/SidebarRight';
import Navbar from './Components/Navbar';
import './Perfil.css';

function Perfil() {

    return (
        <>
            <div className="home-container-trainer">

                <main className="main-content-trainer">
                    <div className="container-trainer">
                        <div className="profile-row-trainer">
                            <div className="profile-section-trainer">
                                <div className="profile-pic-trainer">
                                    <div className="edit-icon-trainer">
                                    <Link to="/Edit"><img className='edit-trainer' src="edit.png" alt="Editar" /></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section-trainer">
                                <div className="input-field-trainer">USUARIO</div>
                                <div className="input-field-trainer">CUMPLEAÑOS DEL USUARIO</div>
                            </div>
                        </div>

                        <div className="icon-row-trainer">
                            <div className="icon-circle-trainer">
                                <img src="pkball.png" alt="Icono" />
                            </div>
                            <div className="icon-circle-trainer">
                                <img src="pkball.png" alt="Icono" />
                            </div>
                            <div className="icon-circle-trainer">
                                <img src="pkball.png" alt="Icono" />
                            </div>
                            <div className="icon-circle-trainer">
                                <img src="pkball.png" alt="Icono" />
                            </div>
                            <div className="icon-circle-trainer">
                                <img src="pkball.png" alt="Icono" />
                            </div>
                            <div className="icon-circle-trainer">
                                <img src="pkball.png" alt="Icono" />
                            </div>
                        </div>

                        <div className="icons-trainer">
                            <div className="back-icon-trainer">
                                <Link to="/Home"><img src="back.png" alt="Volver" /></Link>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}

export default Perfil;