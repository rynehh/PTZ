import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

   
    const [correo, setCorreo] = useState('');
    const [pssw, setPssw] = useState('');
    const nav = useNavigate();

    const enviarDatos = () =>{
        axios.post("http://localhost:3001/login",{

            email: correo,
            pssw: pssw

        }
        ).then(
            (resp)=>{
                if(resp.data.msg === "No encontrado"){
                    alert("Usuario no registrado");
                }else if(resp.data.msg === "Encontrado"){
                    console.log(resp)
                    alert("Bienvenido");
                    nav("/Home")
                }
            }
        )
    }

    return (  
        <>
        <h1>Inicio de Sesion</h1>

            <div class="mb-3">
                <label class="form-label">Correo</label>
                <input onChange={(e)=>setCorreo(e.target.value)} type="email" class="form-control"/>          
            </div>

            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input onChange={(e)=>setPssw(e.target.value)} type="password" class="form-control"/>          
            </div>

            <button onClick={enviarDatos} type='button' class="button-primary">Iniciar Sesion</button>

            <Link to="/" className='btn btn-outline-info'>Registrarse</Link>
   
        </>
    );
}

export default Login;