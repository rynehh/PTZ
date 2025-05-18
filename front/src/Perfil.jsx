import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import SidebarRight from './Components/SidebarRight';
import Navbar from './Components/Navbar';
import './Perfil.css';
import Swal from 'sweetalert2';

function Perfil() {

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

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [dataU, setDataU] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(userData);

            axios.get("http://localhost:3001/getprofile", {
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
                        const { USERNAME, FECNAC, PFP, EQUIPO } = resp.data;

                        const pokemonImages = EQUIPO
                            ? await Promise.all(
                                Object.values(EQUIPO).map(async (id) => {
                                    if (id === null) return null;
                                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                                    return res.data.sprites.front_default;
                                })
                            )
                            : [];

                        setDataU({ USERNAME, FECNAC, PFP, pokemonImages });
                    }
                });
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const formatFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);

        const opciones = { day: 'numeric', month: 'long', year: 'numeric' };

        return fecha.toLocaleDateString('es-ES', opciones);
    };

    const nav = useNavigate();

    const handleDeleteAccount = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Esta acción borrará tu partida para siempre!',
            imageUrl: 'ditto.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Imagen de ditto',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'No, cancelar',
            background: '#ab3232',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                const userData = JSON.parse(localStorage.getItem("user"));
                const userId = userData.id;

                axios.delete(`http://localhost:3001/deleteaccount/${userId}`)
                    .then(() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");

                        AlertTrue('¡Borrado!', 'Tu cuenta ha sido eliminada.', 'success');
                        setTimeout(() => {
                            nav("/");
                        }, 2000);
                    })
                    .catch((error) => {
                        console.error("Error al eliminar cuenta:", error);
                        AlertErr('Error', 'No se pudo eliminar la cuenta.', 'error');
                    });
            }
        });
    };


    return (
        <>
            <div className="home-container-trainer">

                <main className="main-content-trainer">
                    <div className="container-trainer">
                        <div className="profile-row-trainer">
                            <div className="profile-section-trainer">
                                <div className="profile-pic-trainer">
                                    <img className="profile-pic-trainer" src={'data:image/png;base64,' + dataU.PFP} alt='PFP'></img>
                                    <div className="edit-icon-trainer">
                                        <Link to="/Edit"><img className='edit-trainer' src="edit.png" alt="Editar" /></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section-trainer">
                                <div className="input-field-trainer">{dataU.USERNAME}</div>
                                <div className="input-field-trainer">{formatFecha(dataU.FECNAC)}</div>
                            </div>
                        </div>

                        <div className="icon-row-trainer">
                            {dataU.pokemonImages && dataU.pokemonImages.map((pokeImg, index) => (
                                <div className="icon-circle-trainer" key={index}>
                                    <img
                                        src={pokeImg || "/pkball.png"}
                                        alt="Pokémon"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="icons-trainer">
                            <div className="back-icon-trainer">
                                <Link to="/Home"><img src="back.png" alt="Volver" /></Link>
                            </div>
                        </div>

                        <div className='elimbtn2'>

                            <button className="btn-delete-review2" onClick={handleDeleteAccount} >🗑️</button>

                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}

export default Perfil;