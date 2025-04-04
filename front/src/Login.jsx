import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {

   
    const [user, setUser] = useState('');
    const [pssw, setPssw] = useState('');
    const nav = useNavigate();

    const validarFormulario = () => {
        if (!user.trim() || !pssw.trim()) {
            alert("Por favor, completa todos los campos.");
            return false;
        }
        
        return true;
    };

    const enviarDatos = (event) =>{

        event.preventDefault(); 

        if (!validarFormulario()) {
            return;
        }

        axios.post("http://localhost:3001/login",{

            user: user,
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
        ).catch(() => {
            alert("Verifica los datos ingresados.");
        });
    };

    return (  
        <>
           <div className='logbody'>
                <section class="logsec">
                    <h2>Bienvenido a Pokemón Training Zone</h2>
                    <form className='logform'  onSubmit={enviarDatos}>
                        <label>Usuario:</label>
                        <input onChange={(e)=>setUser(e.target.value)} type="text" id="usuario" placeholder="Ingresa tu usuario"/>
                        
                        <label>Contraseña:</label>
                        <input onChange={(e)=>setPssw(e.target.value)} type="password" id="password" placeholder="Ingresa tu contraseña"/>
                        
                        <button type="submit">Iniciar Sesión</button>
                        <Link to="/register" className='loglink'>¿No tienes cuenta? Regístrate</Link>
                        
                    </form>
                </section>
            </div>
            
        </>
    );
}

export default Login;