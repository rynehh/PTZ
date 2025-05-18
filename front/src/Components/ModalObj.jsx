import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Styles/ModalObj.css';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

const ModalObj = () => {


    const AlertDef = (text) => {
        Swal.fire({
            title: '¡Aviso de la Pokédex!',
            text: text,
            imageUrl: '/ditto.gif',
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
            imageUrl: '/ditto.gif',
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
            imageUrl: '/ditto.gif',
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

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const handleAddToTeam = async () => {
        const { value: slot } = await Swal.fire({
            title: '¿En qué slot quieres guardar este Objeto?',
            input: 'select',
            background: '#90c4d0',
            color: '#000000',
            inputOptions: {
                1: 'Slot 1',
                2: 'Slot 2',
                3: 'Slot 3',
                4: 'Slot 4',
                5: 'Slot 5',
                6: 'Slot 6'
            },
            inputPlaceholder: 'Selecciona un slot',
            showCancelButton: true
        });
    
        if (slot) {
            try {
                await axios.post('http://localhost:3001/api/objeto', {
                    userId: userId, 
                    objetoId: id, 
                    slot: parseInt(slot)
                });
    
                AlertTrue(`¡${itemData.name} en el equipo!`)
            } catch (err) {
                AlertErr("¡Error en la captura!")
            }
        }
    };

    const { id } = useParams();
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        image: ''
    });

    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/item/${id}`);
                const nameEs = res.data.names.find(n => n.language.name === 'es')?.name || "Desconocido";
                const descriptionEs = res.data.flavor_text_entries.find(e => e.language.name === 'es')?.text || "Sin descripción.";
                const image = res.data.sprites.default;

                setItemData({
                    name: nameEs,
                    description: descriptionEs,
                    image: image
                });
            } catch (error) {
                console.error("Error al obtener el objeto:", error);
            }
        };

        fetchItem();
    }, [id]);

    return (
        <>
            <div className="home-container-obj">

                <main className="main-content-obj">
                    <div className="container-obj">
                        <div className="content-obj">
                            <img src={itemData.image} alt="Cargando..." className="img-obj" />
                            <div className="text-container-obj">
                                <h1 className="title-obj">{itemData.name}</h1>
                                <p className="par-obj">{itemData.description}</p>
                            </div>
                        </div>
                        <button className="add-object-obj" onClick={handleAddToTeam}>Agregar objeto</button>
                        <div className="close-button-obj" onClick={handleClose}>X</div>
                    </div>
                </main>

            </div>
        </>
    );
}

export default ModalObj;