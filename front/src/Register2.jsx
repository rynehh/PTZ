import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register2() {

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [pssw, setPssw] = useState('');

    const enviarDatos = () =>{
        axios.post("http://localhost:3001/register",{

            name: nombre,
            email: correo,
            pssw: pssw

        }
        ).then(
            (resp)=>{
                if(resp.data.message === "Error"){
                    alert("Error al registrarse");
                }else if(resp.data.message === "Registrado"){
                    console.log(resp)
                    alert("Se ha registrado correctamente");
                }
            }
        )
    }

    return (  
        <>
        <h1>Registro de cuenta</h1>

            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input onChange={(e)=>setNombre(e.target.value)} type="text" class="form-control"/>          
            </div>

            <div class="mb-3">
                <label class="form-label">Correo</label>
                <input onChange={(e)=>setCorreo(e.target.value)} type="email" class="form-control"/>          
            </div>

            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input onChange={(e)=>setPssw(e.target.value)} type="password" class="form-control"/>          
            </div>

            <button onClick={enviarDatos} type='button' class="button-primary">Registrarse</button>

            <Link to="/Login" className='btn btn-outline-info'>Iniciar Sesion</Link>
   
        </>
    );
}

export default Register2;