import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLeft from './Components/SidebarLeft';
import Navbar from './Components/Navbar';
import './Debil.css';

function Debil() {

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

                        <div className='effects-container'>

                            <h2 className='effect-title'>Efectivo</h2>

                            <div className='effects'>
                            <img className='type-effect' src="/types/Water.png"/>   
                            <img className='type-effect' src="/types/Water.png"/>   
                            <img className='type-effect' src="/types/Water.png"/>  
                            </div> 

                            <h2 className='effect-title'>No efectivo</h2> 

                            <div className='effects'>
                            <img className='type-effect' src="/types/Water.png"/>   
                            <img className='type-effect' src="/types/Water.png"/>   
                            <img className='type-effect' src="/types/Water.png"/>   
                            <img className='type-effect' src="/types/Water.png"/>  
                            </div> 

                            <h2 className='effect-title'>Débil Contra</h2> 

                            <div className='effects'>
                            <img className='type-effect' src="/types/Water.png"/>   
                            <img className='type-effect' src="/types/Water.png"/>   
                            <img className='type-effect' src="/types/Water.png"/>   
                            </div>

                            <h2 className='effect-title'>Inmune</h2>     

                            <div className='effects'>
                            <img className='type-effect' src="/types/Water.png"/> 
                            </div>                   

                        </div>

                    </div>

                </main>

            </div>
        </>
    );
}

export default Debil;