import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register2 from './Register2';

function Router() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register2/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
     );
}

export default Router;