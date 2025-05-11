import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register2 from './Register2';
import Home from './Home';
import Pkdx from './Pkdx';
import Objetos from './Objetos';
import Tipos from './Tipos';
import Debil from './Debil';
import Edit from './Editperfil';
import Perfil from './Perfil';
import ModalPkmn from './Components/ModalPkmn';
import ModalObj from './Components/ModalObj';

function Router() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register2/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/Pkdx" element={<Pkdx/>}/>
                <Route path="/Objetos" element={<Objetos/>}/>
                <Route path="/Tipos" element={<Tipos/>}/>
                <Route path="/Debil" element={<Debil/>}/>
                <Route path="/Edit" element={<Edit/>}/>
                <Route path="/Perfil" element={<Perfil/>}/>
                <Route path="/Modal" element={<ModalPkmn/>}/>
                <Route path="/ModalObj" element={<ModalObj/>}/>
            </Routes>
        </BrowserRouter>
     );
}

export default Router;