import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import Objcard from './Components/Objcard';
import './Pkdx.css';

function Objetos() {
    const [items, setItems] = useState([]);
    const itemsPerPage = 8;
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pageFromURL = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const searchQuery = searchParams.get('search');

    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, [currentPage, searchQuery]);

    const fetchItems = async () => {
        setIsLoading(true);

        try {
            if (searchQuery) {
                if (!isNaN(searchQuery)) {
                    const id = parseInt(searchQuery);

                    if (id > 1005 || id < 1) {
                        setItems([]);
                        setTotalItems(0);
                        console.warn("ID fuera de rango válido.");
                        return;
                    }

                    try {
                        const res = await axios.get(`https://pokeapi.co/api/v2/item/${id}`);
                        const nameEs = res.data.names.find(n => n.language.name === 'es')?.name || "Desconocido";

                        setItems([{
                            name: nameEs,
                            id: res.data.id,
                            image: res.data.sprites.default,
                        }]);
                        setTotalItems(1);
                    } catch (err) {
                        setItems([]);
                        setTotalItems(0);
                        console.error("Objeto no encontrado por ID.");
                    }
                } else {
                    const allRes = await axios.get(`https://pokeapi.co/api/v2/item?limit=1005`);
                    const filteredItems = [];

                    for (const item of allRes.data.results) {
                        const itemData = await axios.get(item.url);

                        const nameEs = itemData.data.names.find(n => n.language.name === 'es')?.name || "";
                        const image = itemData.data.sprites.default;

                        if (nameEs && image && nameEs.toLowerCase().includes(searchQuery.toLowerCase())) {
                            filteredItems.push({
                                name: nameEs,
                                id: itemData.data.id,
                                image: image,
                            });

                            if (filteredItems.length >= 8) break;
                        }
                    }

                    setItems(filteredItems);
                    setTotalItems(filteredItems.length);
                }
            } else {
                const allRes = await axios.get(`https://pokeapi.co/api/v2/item?limit=1005`);
                const allItems = allRes.data.results;

                const validItems = [];

                for (const item of allItems) {
                    const itemData = await axios.get(item.url);
                    const nameEs = itemData.data.names.find(n => n.language.name === 'es')?.name || "";
                    const image = itemData.data.sprites.default;

                    if (nameEs && image) {
                        validItems.push({
                            name: nameEs,
                            id: itemData.data.id,
                            image: image,
                        });
                    }

                    if (validItems.length === 1005) break;
                }

                const offset = (currentPage - 1) * itemsPerPage;
                const paginatedItems = validItems.slice(offset, offset + itemsPerPage);

                setItems(paginatedItems);
                setTotalItems(validItems.length);
            }
        } catch (error) {
            console.error('Error al obtener los objetos:', error);
            setItems([]);
            setTotalItems(0);
        } finally {
            setIsLoading(false);
        }
    };



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
                        <h1 className='Pkdxtitle'>Objetos</h1>

                        <div className='cards-wrapper'>
                            <button className='pagback' onClick={handlePrevPage} disabled={currentPage === 1}>
                                <img className='leftarrow' src='arrow.png' alt="←" />
                            </button>

                            <div className='cards-container'>
                                {isLoading ? (
                                    <div className="loading">
                                        <img src="/ditto.gif" alt="Cargando..." />
                                        <p>Cargando objetos...</p>
                                    </div>
                                ) : items.length > 0 ? (
                                    items.map((item) => (
                                        <Objcard
                                            key={item.id}
                                            title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                            text={`#${item.id}`}
                                            image={item.image}
                                            link={`${item.id}`}
                                        />
                                    ))
                                ) : (
                                    <p>No se encontraron objetos.</p>
                                )}
                            </div>

                            <button className='pagadv' onClick={handleNextPage} disabled={currentPage * itemsPerPage >= totalItems}>
                                <img className='rightarrow' src='arrow.png' alt="→" />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Objetos;
