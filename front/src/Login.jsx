import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';


function Login() {


    const [user, setUser] = useState('');
    const [pssw, setPssw] = useState('');
    const nav = useNavigate();

    const AlertDef = (text) => {
        Swal.fire({
            title: '¡Aviso de la Pokédex!',
            text: text,
            imageUrl: 'ditto.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Imagen de ditto',
            timer: 2500, 
            showConfirmButton: false, 
            timerProgressBar: true,
            background: '#90c4d0',
            color: '#000000',
        });
    };

    const AlertErr = (text) => {
        Swal.fire({
            title: '¡Se ha escapado!',
            text: text,
            imageUrl: 'ditto.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Imagen de ditto',
            timer: 2500, 
            showConfirmButton: false, 
            timerProgressBar: true,
            background: '#ab3232',
            color: '#000000',
        });
    };

    const AlertTrue = (text) => {
        Swal.fire({
            title: '¡Capturado!',
            text: text,
            imageUrl: 'ditto.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Imagen de ditto',
            timer: 2000, 
            showConfirmButton: false, 
            timerProgressBar: true,
            background: '#3ea83d',
            color: '#000000',
        });
    };

    const validarFormulario = () => {
        if (!user.trim() || !pssw.trim()) {
            AlertDef('Por favor llena todos los datos',);
            return false;
        }

        return true;
    };

    const enviarDatos = (event) => {

        event.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        axios.post("http://localhost:3001/login", {

            user: user,
            pssw: pssw

        }
        ).then(
            (resp) => {
                if (resp.data.msg === "No encontrado") {
                    AlertErr("Usuario no registrado");
                } else if (resp.data.msg === "Encontrado") {
                    console.log(resp)

                    localStorage.setItem("token", resp.data.token);
                    localStorage.setItem("user", JSON.stringify(resp.data.user));
                    
                    AlertTrue("Bienvenido");
                    setTimeout(() => {
                        nav("/Home");
                    }, 2000);
                }
            }
        ).catch(() => {
            AlertDef("Verifica los datos ingresados.");
        });
    };

    return (
        <>
            <div className='logbody'>
                <section class="logsec">
                    <h2>Bienvenido a Pokemón Training Zone</h2>
                    <form className='logform' onSubmit={enviarDatos}>
                        <label>Usuario:</label>
                        <input onChange={(e) => setUser(e.target.value)} type="text" id="usuario" placeholder="Ingresa tu usuario" />

                        <label>Contraseña:</label>
                        <input onChange={(e) => setPssw(e.target.value)} type="password" id="password" placeholder="Ingresa tu contraseña" />

                        <button type="submit">Iniciar Sesión</button>
                        <Link to="/register" className='loglink'>¿No tienes cuenta? Regístrate</Link>

                    </form>
                </section>
            </div>

        </>
    );
}

export default Login;