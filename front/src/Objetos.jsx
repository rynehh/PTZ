import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import Objcard from './Components/Objcard';
import './Pkdx.css';

function Objetos() {

    return (
        <>
            <div className="home-container">
                <SidebarLeft />

                <main className="main-content">
                    <Navbar />

                    <div className='Cards'>
                        <h1 className='Pkdxtitle'>Objetos</h1>

                        <div className='cards-container'>

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            /> 

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            />   

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            />   

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            />   

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            />   

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            />   

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            />   

                            <Objcard title="Incienso"
                                text="#1"
                                image="InciensoMarino.png"
                                link="#"
                            />             

                        </div>

                    </div>

                </main>


            </div>
        </>
    );
}

export default Objetos;