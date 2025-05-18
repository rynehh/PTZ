import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import SidebarRight from './Components/SidebarRight';
import Navbar from './Components/Navbar';
import './Home.css';
import Swal from 'sweetalert2';

function Home() {


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

    const [randomPokemons, setRandomPokemons] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const nav = useNavigate();

    const fetchRandomPokemons = async () => {
        const total = 1025;
        const ids = new Set();

        while (ids.size < 6) {
            const randId = Math.floor(Math.random() * total) + 1;
            ids.add(randId);
        }

        const pokemonPromises = [...ids].map(id =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );

        try {
            const responses = await Promise.all(pokemonPromises);
            const data = responses.map(res => ({
                id: res.data.id,
                name: res.data.name,
                image: res.data.sprites.front_default
            }));
            setRandomPokemons(data);
        } catch (error) {
            console.error("Error fetching random Pokémon:", error);
        }
    };

    const handleClickPokemon = (id, name) => {
        AlertDef('¡Un' + ' ' + `${name}` + ' ' + ' salvaje!')
        setTimeout(() => {
            nav(`/Pkdx?search=${id}`);
        }, 2500);
    };

    useEffect(() => {
        AlertDef('En la hierba alta...');

        setTimeout(() => {
            fetchRandomPokemons();

            axios.get('http://localhost:3001/api/pokerank')
                .then(async res => {
                    const promises = res.data.map(pkmn =>
                        axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn.ID_POKEMON}`)
                    );
                    const responses = await Promise.all(promises);
                    const enriched = responses.map((r, i) => ({
                        id: r.data.id,
                        name: r.data.name,
                        image: r.data.sprites.front_default,
                        rating: res.data[i].promedio
                    }));
                    setTopRated(enriched);
                })
                .catch(err => console.error("Error cargando Poké Rank:", err));
        }, 2500);
    }, []);


    return (
        <>
            <div className="home-container">
                <SidebarLeft />

                <main className="main-content">
                    <Navbar />

                    <section className="poke-rank-section">
                        <h2 className="section-title">Poké Rank</h2>
                        <div className="pokeball-list">
                            {topRated.map(pokemon => (
                                <img
                                    key={pokemon.id}
                                    className="pokeball-icon"
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    onClick={() => handleClickPokemon(pokemon.id, pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))}
                                    title={`⭐ ${pokemon.rating}`}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="poke-random-section">
                        <h2 className="section-title">
                            Poké Random <span className="question-mark" onClick={() => {
                                AlertDef('En la hierba alta...');
                                setTimeout(() => {
                                    fetchRandomPokemons();
                                }, 2500);
                            }}>💭</span>
                        </h2>
                        <div className="random-pokemon-grid">
                            {randomPokemons.slice(0, 3).map(pokemon => (
                                <img
                                    key={pokemon.id}
                                    className="pokemon-bubble"
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    onClick={() => handleClickPokemon(pokemon.id, pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))}
                                />
                            ))}
                        </div>
                        <div className="random-pokemon-grid2">
                            {randomPokemons.slice(3).map(pokemon => (
                                <img
                                    key={pokemon.id}
                                    className="pokemon-bubble2"
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    onClick={() => handleClickPokemon(pokemon.id, pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))}
                                />
                            ))}
                        </div>
                    </section>
                </main>

                <SidebarRight />
            </div>
        </>
    );
}

export default Home;