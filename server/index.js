const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log("Escuchando en el servidor");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ptzu",
    port: 3306
});


function validarPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

function validarFechaNacimiento(fecha) {
    const fechaNacimiento = new Date(fecha);
    const fechaActual = new Date();
    return fechaNacimiento <= fechaActual;
}

app.post('/register', (req, resp) => {
    const { name, email, pssw, user, gen, nac} = req.body;


    if (!name || !email || !pssw || !user || !gen || !nac) {
        return resp.status(400).json({ "message": "Todos los campos son obligatorios." });
    }
   

    if (!validarPassword(pssw)) {
        return resp.status(400).json({ "message": "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número." });
    }

    
    if (!validarFechaNacimiento(nac)) {
        return resp.status(400).json({ "message": "La fecha de nacimiento no puede ser posterior a hoy." });
    }

    
    db.query('SELECT * FROM USUARIO WHERE CORREOE = ? OR USERNAME = ?', [email, user], (error, results) => {
        if (error) {
            console.log(error);
            return resp.status(500).json({ "message": "Error en el servidor." });
        }
        if (results.length > 0) {
            return resp.status(400).json({ "message": "El correo o el usuario ya están registrados." });
        }

        
        db.query('INSERT INTO USUARIO(NOMBRE, CORREOE, PSSW, USERNAME, GENERO, FECNAC) VALUES(?,?,?,?,?,?)',
            [name, email, pssw, user, gen, nac],
            (error, data) => {
                if (error) {
                    console.log(error);
                    return resp.status(500).json({ "message": "Error al registrar usuario." });
                } else {
                    return resp.json({ "message": "Registrado" });
                }
            }
        );
    });
});


app.post('/login', (req, resp) => {
    const { user, pssw } = req.body;

    if (!user || !pssw) {
        return resp.status(400).json({ "message": "Usuario y contraseña son obligatorios." });
    }

    db.query("SELECT * FROM USUARIO WHERE USERNAME=? AND PSSW=?", [user, pssw], (error, data) => {
        if (error) {
            console.log(error);
            return resp.status(500).json({ "message": "Error en el servidor." });
        }
        if (data.length > 0) {
            resp.json({ "msg": "Encontrado", "name": data[0].NOMBRE });
        } else {
            resp.status(401).json({ "msg": "No encontrado" });
        }
    });
});