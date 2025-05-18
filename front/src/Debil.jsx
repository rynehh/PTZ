import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import './Debil.css';

const typesList = [
    "psychic", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire",
    "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "rock", "steel", "water"
];

function Debil() {

    const [selectedType, setSelectedType] = useState("psychic");
    const [damageRelations, setDamageRelations] = useState({
        double_damage_to: [],
        half_damage_to: [],
        no_damage_to: [],
        double_damage_from: [],
        half_damage_from: [],
        no_damage_from: []
    });

    useEffect(() => {
        const fetchTypeData = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
                setDamageRelations(res.data.damage_relations);
            } catch (err) {
                console.error("Error fetching type data:", err);
            }
        };

        fetchTypeData();
    }, [selectedType]);

    const renderTypeImages = (typeArray) => (
        typeArray.map(type => (
            <img
                key={type.name}
                className='type-effect'
                src={`/types/${type.name.charAt(0).toUpperCase() + type.name.slice(1)}.png`}
                alt={type.name}
            />
        ))
    );

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

                        <div className='effects-container'>

                            <h2 className='effect-title'>Efectivo</h2>

                            <div className='effects'>
                                {renderTypeImages(damageRelations.double_damage_to)}
                            </div>

                            <h2 className='effect-title'>No efectivo</h2>

                            <div className='effects'>
                                {renderTypeImages(damageRelations.half_damage_to)}
                            </div>

                            <h2 className='effect-title'>Débil Contra</h2>

                            <div className='effects'>
                                {renderTypeImages(damageRelations.double_damage_from)}
                            </div>

                            <h2 className='effect-title'>Inmune</h2>

                            <div className='effects'>
                                {renderTypeImages(damageRelations.no_damage_from)}
                            </div>

                        </div>

                    </div>

                </main>

            </div>
        </>
    );
}

export default Debil;