import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import Pokecard from './Components/Pokecard';
import './Tipos.css';

const typesList = [
    "psychic", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire",
    "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "rock", "steel", "water"
];

function Tipos() {

    const [selectedType, setSelectedType] = useState('psychic');
    const [allPokemons, setAllPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 4;

    useEffect(() => {
        if (selectedType) {
            axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`)
                .then(res => {
                    const pokemonList = res.data.pokemon
                        .map(p => p.pokemon)
                        .filter(p => {
                            const id = parseInt(p.url.split("/").filter(Boolean).pop());
                            return id <= 1025;
                        });

                    setAllPokemons(pokemonList);
                    setCurrentPage(1);
                })
                .catch(err => console.error(err));
        }
    }, [selectedType]);

    const indexOfLast = currentPage * pokemonsPerPage;
    const indexOfFirst = indexOfLast - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirst, indexOfLast);

    const handlePrevPage = () => setCurrentPage(prev => prev - 1);
    const handleNextPage = () => setCurrentPage(prev => prev + 1);

    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const promises = currentPokemons.map(p => axios.get(p.url));
            const results = await Promise.all(promises);
            const data = {};
            results.forEach(r => {
                data[r.data.name] = {
                    name: r.data.name,
                    id: r.data.id,
                    image: r.data.sprites.other['official-artwork'].front_default
                };
            });
            setPokemonData(data);
        };

        if (currentPokemons.length) fetchData();
    }, [currentPokemons]);

    return (
        <>
            <div className="home-container">
                <SidebarLeft />

                <main className="main-content">
                    <Navbar />

                    <div className='Cards'>
                        <h1 className='Pkdxtitle'>Tipos</h1>

                        <div className='type-container'>

                            {typesList.map(type => (
                                <img
                                    key={type}
                                    className='type-image'
                                    src={`/types/${type.charAt(0).toUpperCase() + type.slice(1)}.png`}
                                    onClick={() => setSelectedType(type)}
                                    style={{ cursor: 'pointer' }}
                                    alt={type}
                                />
                            ))}

                        </div>

                        <div className='cards-wrapper'>

                            <button className='pagback' onClick={handlePrevPage} disabled={currentPage === 1}><img className='leftarrow' src='arrow.png'></img></button>

                            <div className='cards-container'>

                                {currentPokemons.map(p => {
                                    const poke = pokemonData[p.name];
                                    return poke ? (
                                        <Pokecard
                                            key={poke.id}
                                            title={poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                                            text={`#${poke.id}`}
                                            image={poke.image}
                                            link={`${poke.id}`}
                                        />
                                    ) : null;
                                })}

                            </div>

                            <button className='pagadv' onClick={handleNextPage} disabled={currentPage * pokemonsPerPage >= allPokemons.length}><img className='rightarrow' src='arrow.png'></img></button>

                        </div>
                    </div>

                </main>


            </div>
        </>
    );
}

export default Tipos;