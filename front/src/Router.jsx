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
import ProtectedRoute from './ProtectedRoute';  

function Router() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register2/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/Home" element={<Home/>}/>
                
                <Route path="/Pkdx" element={<ProtectedRoute><Pkdx /></ProtectedRoute>} />
                <Route path="/Objetos" element={<ProtectedRoute><Objetos /></ProtectedRoute>} />
                <Route path="/Tipos" element={<ProtectedRoute><Tipos /></ProtectedRoute>} />
                <Route path="/Debil" element={<ProtectedRoute><Debil /></ProtectedRoute>} />
                <Route path="/Edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
                <Route path="/Perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                <Route path="/Modal/:id" element={<ProtectedRoute><ModalPkmn /></ProtectedRoute>} />
                <Route path="/ModalObj/:id" element={<ProtectedRoute><ModalObj /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
     );
}

export default Router;