import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Styles/ModalPkmn.css';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

const ModalPkmn = () => {

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
            title: '¿En qué slot quieres guardar este Pokémon?',
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
                await axios.post('http://localhost:3001/api/equipo', {
                    userId: userId,
                    pokemonId: id,
                    slot: parseInt(slot)
                });

                AlertTrue(`¡${pokemon.name} en el equipo!`)
            } catch (err) {
                AlertErr("¡Error en la captura!")
            }
        }
    };

    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    const handleSetReview = async (calif) => {
        try {
            await axios.post('http://localhost:3001/api/review',
                { id_pokemon: id, calificacion: calif },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReview(calif);
            AlertTrue(`Calificación guardada: ${calif}/5`);
        } catch (error) {
            AlertErr("Error al guardar la calificación");
        }
    };

    const handleDeleteReview = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/review/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReview(null);
            AlertTrue("Calificación eliminada");
        } catch (error) {
            AlertErr("Error al eliminar la calificación");
        }
    };

    const [review, setReview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const speciesRes = await axios.get(res.data.species.url);
                const abilityRes = res.data.abilities[0].ability.url;
                const abilityData = await axios.get(abilityRes);

                const categoria = speciesRes.data.genera.find(g => g.language.name === "es")?.genus || "Desconocida";
                const habilidad = abilityData.data.names.find(name => name.language.name === 'es')?.name || 'Desconocida';

                setPokemon({
                    name: res.data.name.toUpperCase(),
                    image: res.data.sprites.front_default,
                    height: res.data.height / 10 + ' m',
                    weight: res.data.weight / 10 + ' kg',
                    ability: habilidad,
                    category: categoria
                });

                if (token) {
                    const reviewRes = await axios.get(`http://localhost:3001/api/review/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setReview(reviewRes.data.calificacion);
                } else {
                    setReview(null);
                }

            } catch (err) {
                console.error("Error cargando datos", err);
            }
        };

        fetchData();
    }, [id, token]);


    if (!pokemon) return <main style={{ background: 'black', color: 'white', height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <img src="/ditto.gif" alt="Cargando..." /></main>;

    return (
        <>
            <div className="home-container-user">

                <main className="main-content-user">
                    <div className="container-user">
                        <div className="close-icon-user" onClick={handleClose}>
                            <img src="/close2.png" alt="Cerrar" />
                        </div>

                        <div className="main-section-user">

                            <div className="pokemon-left-user">
                                <div className="pokemon-label-user">{pokemon.name}</div>
                                <div className="pokemon-image-user">
                                    <img src={pokemon.image} alt={pokemon.name} />
                                </div>
                            </div>

                            <div className="pokemon-right-user">
                                <div className="pokemon-info-user">
                                    <div className="data-item-user">
                                        <div className="data-label-user">ALTURA</div>
                                        <div className="data-value-user">{pokemon.height}</div>
                                    </div>
                                    <div className="data-item-user">
                                        <div className="data-label-user">PESO</div>
                                        <div className="data-value-user">{pokemon.weight}</div>
                                    </div>
                                    <div className="data-item-user">
                                        <div className="data-label-user">CATEGORÍA</div>
                                        <div className="data-value-user">{pokemon.category}</div>
                                    </div>
                                    <div className="data-item-user">
                                        <div className="data-label-user">HABILIDAD</div>
                                        <div className="data-value-user">{pokemon.ability.charAt(0).toUpperCase() + pokemon.ability.slice(1)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="hand-icon-user" onClick={handleAddToTeam}>
                                <img src="/take.png" alt="Mano" />
                            </div>
                        </div>

                        <div className="bottom-section-user">
                            <div className="back-arrow-user" onClick={handleClose}>
                                <img src="/back.png" alt="Atrás" />
                            </div>
                            <div className="pokeballs-user">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <img
                                        key={num}
                                        src={review && num <= review ? "/ditto.gif" : "/pkball.png"}
                                        alt={review && num <= review ? "Ditto" : "Pokeball"}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleSetReview(num)}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className='elimbtn'>
                            {review && (
                                <button className="btn-delete-review" onClick={handleDeleteReview}>🗑️</button>
                            )}
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}

export default ModalPkmn;