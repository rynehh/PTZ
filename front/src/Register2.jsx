import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Registro.css';


function Register2() {

    
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [pssw, setPssw] = useState('');
    const [user, setUser] = useState('');
    const [gen, setGen] = useState('');
    const [nac, setNac] = useState('');

    const validarFormulario = () => {
        if (!nombre || !correo || !pssw || !user || !gen || !nac) {
            alert("Todos los campos son obligatorios");
            return false;
        }
        if (pssw.length < 8 || !/[A-Z]/.test(pssw) || !/[0-9]/.test(pssw)) {
            alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número");
            return false;
        }
        if (new Date(nac) > new Date()) {
            alert("La fecha de nacimiento no puede ser posterior al día de hoy");
            return false;
        }
        return true;
    };

    const [pic, setPic] = useState(null);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const output = document.getElementById('output');
                output.src = reader.result
                setPic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const enviarDatos = (event) => {
        event.preventDefault();
        if (!validarFormulario()) return;
        
        axios.post("http://localhost:3001/register", {
            name: nombre,
            email: correo,
            pssw: pssw,
            user: user,
            gen: gen,
            nac: nac,
            
        }).then((resp) => {
            if (resp.data.message === "Registrado") {
                alert("Se ha registrado correctamente");
            }
        })
        .catch((error) => {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Error en el servidor.");
            }
        });
    };

    return (  
        <>
            <div className='regisbody'>
                <section className='regissec1'>
                    
                    <form className='regisform' name="registerForm"onSubmit={enviarDatos} >

                        <div className="regisdiv">
                            <h2>Regístrate en Pokemón Training Zone</h2>

                            <label class="profile-label" for="profile-pic">Foto de perfil:</label>
                            <input type="file" id="profile-pic" accept="image/jpeg, image/png" onChange={handleImageChange}/>
                            <img id="output" class="profile-pic"/>

                            <label>Nombre:</label>
                            <input onChange={(e)=>setNombre(e.target.value)} type="text" id="name" placeholder="Ingresa tu nombre" />
                        </div>
                        
                        <div className="regisdiv">
                            <label>Correo Electrónico:</label>
                            <input onChange={(e)=>setCorreo(e.target.value)} type="email" id="email" placeholder="Ingresa tu correo" />

                            <label>Usuario</label>
                            <input onChange={(e)=>setUser(e.target.value)} type="text" id="usuario" placeholder="Crea tu usuario" />
                            
                            <label>Género:</label>
                            <select onChange={(e)=>setGen(e.target.value)} id="gender" >
                                <option value="">Selecciona una opción</option>
                                <option value="1">Niño</option>
                                <option value="2">Niña</option>
                            </select>
                            
                            <label>Fecha de Nacimiento:</label>
                            <input onChange={(e)=>setNac(e.target.value)} type="date" id="birth" />
                            
                            <label>Contraseña:</label>
                            <input onChange={(e)=>setPssw(e.target.value)} type="password" id="password" placeholder="Crea una contraseña" />

                            <button type="submit">Crear Cuenta</button>
                        </div>
                        
                    </form>
                    
                </section>
                
                <section className="footer">
                    <Link to="/Login" className='regislink'>¿Tienes cuenta? Inicia sesión</Link>
                </section>
            </div>
        
        </>
    );
}

export default Register2;