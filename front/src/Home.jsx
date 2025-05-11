import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import SidebarRight from './Components/SidebarRight';
import Navbar from './Components/Navbar';
import './Home.css';

function Home() {

    return (
        <>
            <div className="home-container">
                <SidebarLeft />

                <main className="main-content">
                    <Navbar />

                    <section className="poke-rank-section">
                        <h2 className="section-title">Poké Rank</h2>
                        <div className="pokeball-list">
                            <img className="pokeball-icon" src="/mew.jpg" />
                            <img className="pokeball-icon" src="/pkball.png" />
                            <img className="pokeball-icon" src="/pkball.png" />
                            <img className="pokeball-icon" src="/pkball.png" />
                        </div>
                    </section>

                    <section className="poke-random-section">
                        <h2 className="section-title">
                            Poké Random <span className="question-mark">💭</span>
                        </h2>
                        <div className="random-pokemon-grid">
                            <img className="pokemon-bubble" src="/pkball.png" />
                            <img className="pokemon-bubble" src="/pkball.png" />
                            <img className="pokemon-bubble" src="/pkball.png" />                            
                        </div>
                        <div className="random-pokemon-grid2">                            
                            <img className="pokemon-bubble2" src="/pkball.png" />
                            <img className="pokemon-bubble2" src="/pkball.png" />
                            <img className="pokemon-bubble2" src="/pkball.png" />
                        </div>
                    </section>
                </main>

                <SidebarRight />
            </div>
        </>
    );
}

export default Home;