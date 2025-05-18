import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Registro.css';
import Swal from 'sweetalert2';


function Register2() {

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


    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [pssw, setPssw] = useState('');
    const [user, setUser] = useState('');
    const [gen, setGen] = useState('');
    const [nac, setNac] = useState('');
    const [fileImg, setFileImg] = useState(null);


    const validarFormulario = () => {
        if (!nombre || !correo || !pssw || !user || !gen || !nac || !fileImg) {
            AlertDef("Todos los campos son obligatorios");
            return false;
        }
        if (pssw.length < 8 || !/[A-Z]/.test(pssw) || !/[0-9]/.test(pssw)) {
            AlertDef("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número");
            return false;
        }
        if (new Date(nac) > new Date()) {
            AlertDef("La fecha de nacimiento no puede ser posterior al día de hoy");
            return false;
        }
        return true;
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const output = document.getElementById('output');
                output.src = reader.result

            };
            reader.readAsDataURL(file);
        }
    };

    const enviarDatos = (event) => {
        event.preventDefault();
        if (!validarFormulario()) return;

        const data = new FormData();
        data.append('name', nombre);
        data.append('email', correo);
        data.append('pssw', pssw);
        data.append('user', user);
        data.append('gen', gen);
        data.append('nac', nac);
        data.append('fileImg', fileImg);


        axios.post("http://localhost:3001/register", data, {

            headers: { 'Content-Type': 'multipart/form-data' }

        }).then((resp) => {
            if (resp.data.message === "Registrado") {
                AlertTrue("Se ha registrado correctamente");
                setTimeout(() => {
                    nav("/");
                }, 2000);
            }
        })
            .catch((error) => {
                if (error.response) {
                    AlertErr(error.response.data.message);
                } else {
                    AlertErr("Error en el servidor.");
                }
            });
    };

    return (
        <>
            <div className='regisbody'>
                <section className='regissec1'>

                    <form className='regisform' name="registerForm" id="registerForm" onSubmit={enviarDatos} >

                        <div className="regisdiv">
                            <h2>Regístrate en Pokemón Training Zone</h2>

                            <label class="profile-label" for="profile-pic">Foto de perfil:</label>
                            <input onChange={(e) => { setFileImg(e.target.files[0]); handleImageChange(e); }} type="file" id="profile-pic" accept="image/jpeg, image/png" />
                            <img id="output" class="profile-pic" alt="" />

                            <label>Nombre:</label>
                            <input onChange={(e) => setNombre(e.target.value)} type="text" id="name" placeholder="Ingresa tu nombre" />
                        </div>

                        <div className="regisdiv">
                            <label>Correo Electrónico:</label>
                            <input onChange={(e) => setCorreo(e.target.value)} type="email" id="email" placeholder="Ingresa tu correo" />

                            <label>Usuario</label>
                            <input onChange={(e) => setUser(e.target.value)} type="text" id="usuario" placeholder="Crea tu usuario" />

                            <label>Género:</label>
                            <select onChange={(e) => setGen(e.target.value)} id="gender" >
                                <option value="">Selecciona una opción</option>
                                <option value="1">Niño</option>
                                <option value="2">Niña</option>
                            </select>

                            <label>Fecha de Nacimiento:</label>
                            <input onChange={(e) => setNac(e.target.value)} type="date" id="birth" />

                            <label>Contraseña:</label>
                            <input onChange={(e) => setPssw(e.target.value)} type="password" id="password" placeholder="Crea una contraseña" />

                            <button type="submit">Crear Cuenta</button>
                        </div>

                    </form>

                </section>

                <section className="footer">
                    <Link to="/" className='regislink'>¿Tienes cuenta? Inicia sesión</Link>
                </section>
            </div>

        </>
    );
}

export default Register2;