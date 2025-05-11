import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/SidebarLeft.css';

const SidebarLeft = () => {
  return (
    <aside className="sidebar-left">
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/Home"><img className="imgbar" src="/pikachu.png"/></Link><br></br>Inicio</li> 
          <li className="nav-item"><Link to="/Pkdx"><img className="imgbar2" src="/pokedex.png"/></Link><br></br>Pokédex</li>
          <li className="nav-item"><Link to="/Tipos"><img className="imgbar4" src="/tipos.png"/></Link><br></br>Tipos</li>
          <li className="nav-item"><Link to="/Objetos"><img className="imgbar3" src="/pkball.png"/></Link><br></br>Objetos</li>
          <li className="nav-item"><Link to="/Debil"><img className="imgbar3" src="/magikarp.png"/></Link><br></br>Debilidades</li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarLeft;
