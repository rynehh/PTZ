import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register2 from './Register2';

function Router() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/" element={<Register2/>}/>
            </Routes>
        </BrowserRouter>
     );
}

export default Router;