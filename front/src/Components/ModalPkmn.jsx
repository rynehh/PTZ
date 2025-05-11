import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Styles/ModalPkmn.css';

const ModalPkmn = () => {

    return (
        <>
            <div className="home-container-user">

                <main className="main-content-user">
                    <div className="container-user">
                        <div className="close-icon-user">
                            <Link to="/Pkdx"><img src="close2.png" alt="Cerrar" /></Link>
                        </div>

                        <div className="main-section-user">

                            <div className="pokemon-left-user">
                                <div className="pokemon-label-user">PIKACHU</div>
                                <div className="pokemon-image-user">
                                    <img src="mew.jpg" alt="Pikachu" />
                                </div>
                            </div>

                            <div className="pokemon-right-user">
                                <div className="pokemon-info-user">
                                    <div className="data-item-user">
                                        <div className="data-label-user">ALTURA</div>
                                        <div className="data-value-user">0,4 m</div>
                                    </div>
                                    <div className="data-item-user">
                                        <div className="data-label-user">PESO</div>
                                        <div className="data-value-user">6,0 kg</div>
                                    </div>
                                    <div className="data-item-user">
                                        <div className="data-label-user">SEXO</div>
                                        <div className="data-value-user">M/F</div>
                                    </div>
                                    <div className="data-item-user">
                                        <div className="data-label-user">CATEGORÍA</div>
                                        <div className="data-value-user">Ratón</div>
                                    </div>
                                    <div className="data-item-user">
                                        <div className="data-label-user">HABILIDAD</div>
                                        <div className="data-value-user">Elc. Estática</div>
                                    </div>
                                </div>
                            </div>

                            <div className="hand-icon-user">
                                <img src="take.png" alt="Mano" />
                            </div>
                        </div>

                        <div className="bottom-section-user">
                            <div className="back-arrow-user">
                                <Link to="/Pkdx"><img src="back.png" alt="Atrás" /></Link>
                            </div>
                            <div className="pokeballs-user">
                                <img src="pkball.png" alt="Pokeball" />
                                <img src="pkball.png" alt="Pokeball" />
                                <img src="pkball.png" alt="Pokeball" />
                                <img src="pkball.png" alt="Pokeball" />
                                <img src="pkball.png" alt="Pokeball" />
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}

export default ModalPkmn;