import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import SidebarRight from './Components/SidebarRight';
import Navbar from './Components/Navbar';
import './Editperfil.css';

function Edit() {

    return (
        <>
            <div className="home-container-perfil">

                <main className="main-content-perfil">
                    <div className="container-perfil">
                        <div className="profile-image-perfil">
                            <div className="profile-icon-perfil"></div>
                            <div className="edit-icon-perfil">
                                <img src="edit.png" />
                            </div>
                        </div>

                        <div className="form-group-perfil">
                            <label className='label-perfil'>NOMBRE</label>
                            <input className='input-perfil' type="text" id="nombre" name="nombre" />
                        </div>

                        <div className="form-group-perfil">
                            <label className='label-perfil'>USUARIO</label>
                            <input className='input-perfil' type="text" id="usuario" name="usuario" />
                        </div>

                        <div className="form-group-perfil">
                            <label className='label-perfil'>CUMPLEAÑOS DEL USUARIO</label>
                            <input className='input-perfil' type="date" id="cumpleanos" name="cumpleanos" />
                        </div>

                        <div className="icons-perfil">
                            <div className="back-icon-perfil">
                                <Link to="/Perfil"><img src="back.png" alt="Volver" /></Link>
                            </div>
                            <div className="folder-icon-perfil">
                                <img src="save.png" alt="Guardar" />
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}

export default Edit;