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
    //const [pic, setPic] = useState('');


    /*const handleImageChange = (e) => {
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
    };*/

    const enviarDatos = () =>{
        axios.post("http://localhost:3001/register",{
            
            name: nombre,
            email: correo,
            pssw: pssw,
            user: user,
            gen: gen,
            nac: nac,
            /*pic: pic*/

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
            <div className='regisbody'>
                <section className='regissec1'>
                    
                    <form className='regisform' onSubmit={enviarDatos} >

                        <div className="regisdiv">
                            <h2>Regístrate en Pokemón Training Zone</h2>

                            <label class="profile-label">Foto de perfil:</label>
                            <input type="file" id="profile-pic" accept="image/jpeg, image/png" /*onChange={handleImageChange}*//>
                            <img id="output" class="profile-pic"/>

                            <label>Nombre:</label>
                            <input onChange={(e)=>setNombre(e.target.value)} type="text" id="name" placeholder="Ingresa tu nombre" required/>
                        </div>
                        
                        <div className="regisdiv">
                            <label>Correo Electrónico:</label>
                            <input onChange={(e)=>setCorreo(e.target.value)} type="email" id="email" placeholder="Ingresa tu correo" required/>

                            <label>Usuario</label>
                            <input onChange={(e)=>setUser(e.target.value)} type="text" id="usuario" placeholder="Crea tu usuario" required/>
                            
                            <label>Género:</label>
                            <select onChange={(e)=>setGen(e.target.value)} id="gender" required>
                                <option value="">Selecciona una opción</option>
                                <option value="1">Niño</option>
                                <option value="2">Niña</option>
                            </select>
                            
                            <label>Fecha de Nacimiento:</label>
                            <input onChange={(e)=>setNac(e.target.value)} type="date" id="birth" required/>
                            
                            <label>Contraseña:</label>
                            <input onChange={(e)=>setPssw(e.target.value)} type="password" id="password" placeholder="Crea una contraseña" required/>

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