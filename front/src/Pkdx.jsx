import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import Pokecard from './Components/Pokecard';
import './Pkdx.css';

function Pkdx() {

    return (
        <>
            <div className="home-container">
                <SidebarLeft />

                <main className="main-content">
                    <Navbar />

                    <div className='Cards'>
                        <h1 className='Pkdxtitle'>Pokédex</h1>

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

export default Pkdx;