import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import SidebarRight from './Components/SidebarRight';
import Navbar from './Components/Navbar';
import './Editperfil.css';
import Swal from 'sweetalert2';

function Edit() {

    const nav = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [dataU, setDataU] = useState([]);

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


    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(userData);

            axios.get("http://localhost:3001/geteditprofile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    if (resp.data.msg === "Error") {
                        alert("Error al obtener la info");
                    } else if (resp.data.msg === "No info") {
                        setDataU(null);
                    } else {
                        setDataU(resp.data[0]);
                        setNombre(resp.data[0].NOMBRE); 
                        setNac(resp.data[0].FECNAC.slice(0,10)); 
                        setUser(resp.data[0].USERNAME);
                    }
                });
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const [fileImg, setFileImg] = useState(null);
    const [name, setNombre] = useState('');
    const [nac, setNac] = useState('');

    const validarFormulario = () => {
        if (!name || !user || !nac ) {
            AlertDef("Todos los campos son obligatorios");
            return false;
        }
        if (new Date(nac) > new Date()) {
            AlertDef("La fecha de nacimiento no puede ser posterior al día de hoy");
            return false;
        }
        return true;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const output = document.getElementById('output');
                output.src = reader.result

            };
            reader.readAsDataURL(file);
        } else {
            console.log('No se seleccionó ninguna imagen');
        }
    };

    const enviarDatos = (event) => {
        event.preventDefault();
        if (!validarFormulario()) return;

        const data = new FormData();
        data.append('name', name);
        data.append('user', user);
        data.append('nac', nac);
        data.append('fileImg', fileImg);


        axios.put("http://localhost:3001/edit", data, {

            headers: { 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}`}

        }).then((resp) => {
            if (resp.data.message === "Modificado") {
                if (resp.data.token) {
                    localStorage.setItem("token", resp.data.token);  
                    localStorage.setItem("user", JSON.stringify(resp.data.user));
                }
                AlertTrue("Perfil modificado");
                setTimeout(() => {
                    nav("/Perfil");
                }, 2000);
            }
        })
            .catch((error) => {
                if (error.response) {
                    AlertErr(error.response.data.message);
                } else {
                    AlertErr("Error en el servidor.");
                }
            });
    };


    return (
        <>
            <div className="home-container-perfil">

                <main className="main-content-perfil">
                    <form className="container-perfil" onSubmit={enviarDatos}>
                        <div className="container-perfil">
                            <div className="profile-image-perfil">
                                <div className="profile-icon-perfil">
                                    <img className="profile-icon-perfil" src={'data:image/png;base64,' + dataU.PFP} alt='PFP' id='output'></img>
                                </div>
                                <div className="edit-icon-perfil">
                                    <label htmlFor="profile-pic">
                                        <img src="edit.png" />
                                    </label>
                                    <input onChange={(e) => { setFileImg(e.target.files[0]); handleImageChange(e); }} type="file" id="profile-pic" accept="image/jpeg, image/png" style={{ display: 'none' }} />
                                </div>
                            </div>

                            <div className="form-group-perfil">
                                <label className='label-perfil'>NOMBRE</label>
                                <input value={name} onChange={(e) => setNombre(e.target.value)} className='input-perfil' type="text" id="nombre" name="nombre" />
                            </div>

                            <div className="form-group-perfil">
                                <label className='label-perfil'>USUARIO</label>
                                <input value={user} onChange={(e) => setUser(e.target.value)} className='input-perfil' type="text" id="usuario" name="usuario" />
                            </div>

                            <div className="form-group-perfil">
                                <label className='label-perfil'>CUMPLEAÑOS DEL USUARIO</label>
                                <input value={nac} onChange={(e) => setNac(e.target.value)} className='input-perfil' type="date" id="cumpleanos" name="cumpleanos" />
                            </div>

                            <div className="icons-perfil">
                                <div className="back-icon-perfil">
                                    <Link to="/Perfil"><img src="back.png" alt="Volver" /></Link>
                                </div>
                                <div className="folder-icon-perfil">
                                    <label htmlFor="submit">
                                        <img src="save.png" alt="Guardar" />
                                    </label>
                                    <button type="submit" id='submit' style={{ display: 'none' }}></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>

            </div>
        </>
    );
}

export default Edit;