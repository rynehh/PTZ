import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import Pokecard from './Components/Pokecard';
import './Tipos.css';

function Tipos() {

    return (
        <>
            <div className="home-container">
                <SidebarLeft />

                <main className="main-content">
                    <Navbar />

                    <div className='Cards'>
                        <h1 className='Pkdxtitle'>Tipos</h1>

                        <div className='type-container'>

                         <img className='type-image' src="/types/Psychic.png"/>   
                         <img className='type-image' src="/types/Bug.png"/>   
                         <img className='type-image' src="/types/Dark.png"/>   
                         <img className='type-image' src="/types/Dragon.png"/>   
                         <img className='type-image' src="/types/Electric.png"/>   
                         <img className='type-image' src="/types/Fairy.png"/>   
                         <img className='type-image' src="/types/Fighting.png"/>   
                         <img className='type-image' src="/types/Fire.png"/>   
                         <img className='type-image' src="/types/Flying.png"/>   
                         <img className='type-image' src="/types/Ghost.png"/>   
                         <img className='type-image' src="/types/Grass.png"/>   
                         <img className='type-image' src="/types/Ground.png"/>   
                         <img className='type-image' src="/types/Ice.png"/>   
                         <img className='type-image' src="/types/Normal.png"/>   
                         <img className='type-image' src="/types/Poison.png"/>   
                         <img className='type-image' src="/types/Rock.png"/>   
                         <img className='type-image' src="/types/Steel.png"/>   
                         <img className='type-image' src="/types/Water.png"/>   

                        </div>

                        <div className='cards-container'>

                            <Pokecard title="Mew"
                                text="#151"
                                image="mew.jpg"
                                link="#"
                            />

                            <Pokecard title="Mew"
                                text="#151"
                                image="mew.jpg"
                                link="#"
                            />

                            <Pokecard title="Mew"
                                text="#151"
                                image="mew.jpg"
                                link="#"
                            />

                            <Pokecard title="Mew"
                                text="#151"
                                image="mew.jpg"
                                link="#"
                            />

                        </div>

                    </div>

                </main>


            </div>
        </>
    );
}

export default Tipos;