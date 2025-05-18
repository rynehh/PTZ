import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import Pokecard from './Components/Pokecard';
import './Pkdx.css';
import Swal from 'sweetalert2';

function Pkdx() {

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

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    const [pokemonList, setPokemonList] = useState([]);
    const pageFromURL = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const pokemonsPerPage = 8;
    const totalPokemons = 1025;
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPokemons = async () => {
            if (searchQuery) {

                if (!isNaN(searchQuery)) {
                    try {
                        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
                        setPokemonList([{
                            id: res.data.id,
                            name: res.data.name,
                            image: res.data.sprites.other['official-artwork'].front_default
                        }]);
                    } catch (error) {
                        console.error("No se encontró el Pokémon.");
                        setPokemonList([]);
                    }
                } else {

                    try {
                        const allPokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`);
                        const filtered = allPokemonRes.data.results.filter(p =>
                            p.name.includes(searchQuery.toLowerCase())
                        );

                        const promises = filtered.slice(0, 8).map(p => axios.get(p.url));
                        const results = await Promise.all(promises);

                        const data = results.map(res => ({
                            id: res.data.id,
                            name: res.data.name,
                            image: res.data.sprites.other['official-artwork'].front_default
                        }));

                        setPokemonList(data);
                    } catch (error) {
                        console.error("Error en la búsqueda.");
                        setPokemonList([]);
                    }
                }
            } else {

                const promises = [];
                const start = (currentPage - 1) * pokemonsPerPage + 1;
                const end = Math.min(start + pokemonsPerPage - 1, totalPokemons);

                for (let i = start; i <= end; i++) {
                    promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
                }

                const results = await Promise.all(promises);

                const data = results.map((res) => ({
                    id: res.data.id,
                    name: res.data.name,
                    image: res.data.sprites.other['official-artwork'].front_default
                }));

                setPokemonList(data);
            }
        };

        fetchPokemons();
    }, [currentPage, searchQuery]);

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        navigate(`?page=${nextPage}`);
    };

    const handlePrevPage = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        navigate(`?page=${prevPage}`);
    };

    return (
        <>
            <div className="home-container">
                <SidebarLeft />

                <main className="main-content">
                    <Navbar />

                    <div className='Cards'>
                        <h1 className='Pkdxtitle'>Pokédex</h1>

                        <div className='cards-wrapper'>

                            <button className='pagback' onClick={handlePrevPage} disabled={currentPage === 1}><img className='leftarrow' src='arrow.png'></img></button>

                            <div className='cards-container'>
                                {pokemonList.length > 0 ? (
                                    pokemonList.map(pokemon => (
                                        <Pokecard
                                            key={pokemon.id}
                                            title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                            text={`#${pokemon.id}`}
                                            image={pokemon.image}
                                            link={`${pokemon.id}`}
                                        />
                                    ))
                                ) : (
                                    <p>No se encontraron resultados.</p>
                                )}
                            </div>

                            <button className='pagadv' onClick={handleNextPage} disabled={currentPage * pokemonsPerPage >= totalPokemons}><img className='rightarrow' src='arrow.png'></img></button>

                        </div>

                    </div>

                </main>


            </div>
        </>
    );
}

export default Pkdx;