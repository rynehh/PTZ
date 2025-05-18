const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const secretKey = 'mew151';

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
    port: 3306,
    multipleStatements: true 
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

const fileFltr = (req, file, callback) => {
    const formatos = ['image/png', 'image/jpeg', 'image/jpg'];

    if (formatos.includes(file.mimetype)) {
        callback(null, true);
    } else {
        //callback(null, false);
        return callback(new Error('Archivo no aceptado'));
    }
}

const temp = multer.memoryStorage();
const archivo = multer({
    storage: temp,
    fileFilter: fileFltr
})

function verifyToken(req, resp) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        resp.status(401).json({ message: 'Token no proporcionado' });
        return null;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.id;
    } catch (err) {
        resp.status(403).json({ message: 'Token inválido o expirado' });
        return null;
    }
}

app.post('/register', archivo.single('fileImg'), (req, resp) => {
    const { name, email, pssw, user, gen, nac } = req.body;
    const img64 = req.file.buffer.toString('base64');


    if (!name || !email || !pssw || !user || !gen || !nac || !img64) {
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


        db.query('INSERT INTO USUARIO(NOMBRE, CORREOE, PSSW, USERNAME, GENERO, FECNAC, PFP) VALUES(?,?,?,?,?,?,?)',
            [name, email, pssw, user, gen, nac, img64],
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

            const payload = {
                id: data[0].ID_USUARIO,
                user: data[0].USERNAME
            };

            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

            resp.json({ msg: "Encontrado", token: token, user: { id: payload.id, username: payload.user } });
        } else {
            resp.status(401).json({ "msg": "No encontrado" });
        }
    });
});

app.get('/gethomeuser',
    (req, resp) => {
        const id_usuario = verifyToken(req, resp);
        if (!id_usuario) return;

        db.query("CALL GetHomeUserData(?)", [id_usuario], (err, results) => {
            if (err) {
                console.error(err);
                return resp.json({ msg: "Error" });
            }
    
            if (!results || results.length < 3) {
                return resp.json({ msg: "No info" });
            }
    
            const pfp = results[0][0]?.PFP;
            const equipo = results[1][0];
            const objetos = results[2][0];
    
            resp.json({
                PFP: pfp,
                EQUIPO: equipo,
                OBJETOS: objetos
            })
        })
    }
)

app.get('/getprofile',
    (req, resp) => {
        const id_usuario = verifyToken(req, resp);
        if (!id_usuario) return;

        db.query("CALL GetProfileData(?)", [id_usuario], (err, result) => {
            if (err) {
                console.log(err);
                return resp.json({ msg: "Error" });
            }
    
            const usuario = result[0][0]; 
            const equipo = result[1][0];  
            if (!usuario) {
                return resp.json({ msg: "No info" });
            }
    
            return resp.json({
                ...usuario,
                EQUIPO: equipo
            });
        })
    }
)

app.get('/geteditprofile',
    (req, resp) => {
        const id_usuario = verifyToken(req, resp);
        if (!id_usuario) return;

        db.query("CALL GetEditProfile(?)", [id_usuario], (err, results) => {
            if (err) {
                console.log(err);
                return resp.json({ msg: "Error" });
            }
    
            const data = results[0]; 
            if (data.length > 0) {
                console.log(data)
                resp.json(data);
            } else {
                resp.json({ msg: "No info" });
            }
        });
    }
)

app.put('/edit', archivo.single('fileImg'), (req, resp) => {
    const id_usuario = verifyToken(req, resp);
    const { name, user, nac } = req.body;
    const img64 = req.file ? req.file.buffer.toString('base64') : null;

    if (!name || !user || !nac) {
        return resp.status(400).json({ "message": "Todos los campos son obligatorios." });
    }

    if (!validarFechaNacimiento(nac)) {
        return resp.status(400).json({ "message": "La fecha de nacimiento no puede ser posterior a hoy." });
    }

    db.query('SELECT * FROM USUARIO WHERE USERNAME = ? AND ID_USUARIO != ?', [user, id_usuario], (error, results) => {
        if (error) {
            console.log(error);
            return resp.status(500).json({ "message": "Error en el servidor." });
        }
        if (results.length > 0) {
            return resp.status(400).json({ "message": "El correo o el usuario ya están registrados." });
        }

        let query = 'UPDATE USUARIO SET ';
        let params = [];

        if (name) {
            query += 'NOMBRE = ?, ';
            params.push(name);
        }
        if (user) {
            query += 'USERNAME = ?, ';
            params.push(user);
        }
        if (nac) {
            query += 'FECNAC = ?, ';
            params.push(nac);
        }
        if (img64) {
            query += 'PFP = ?, ';
            params.push(img64);
        }
        query = query.slice(0, -2);

        query += ' WHERE ID_USUARIO = ?';
        params.push(id_usuario);

        db.query(query, params, (err, result) => {
            if (err) {
                console.error(err);
                if (!resp.headersSent) {
                    return resp.json({ message: 'Error' });
                }
            } else {

                db.query('SELECT ID_USUARIO, USERNAME FROM USUARIO WHERE ID_USUARIO = ?', [id_usuario], (error, data) => {
                    if (error) {
                        console.error(error);
                        return resp.status(500).json({ message: 'Error al obtener usuario actualizado' });
                    }

                    const payload = {
                        id: data[0].ID_USUARIO,
                        user: data[0].USERNAME
                    };

                    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

                    return resp.json({ message: 'Modificado', token: token, user: { id: payload.id, username: payload.user } });
                });
            }
        });
    });
});

app.post('/api/equipo', (req, res) => {
    const { userId, pokemonId, slot } = req.body;

    db.query('CALL GuardarPokemon(?, ?, ?)', [userId, pokemonId, slot], (err, results) => {
        if (err) {
            console.error('Error al ejecutar el procedimiento:', err);
            return res.status(500).json({ error: 'Error al guardar el Pokémon' });
        }

        res.status(200).json({ success: true });
    });
});

app.post('/api/objeto', (req, res) => {
    const { userId, objetoId, slot } = req.body;

    db.query('CALL GuardarObjeto(?, ?, ?)', [userId, objetoId, slot], (err, results) => {
        if (err) {
            console.error('Error al ejecutar el procedimiento:', err);
            return res.status(500).json({ error: 'Error al guardar el Pokémon' });
        }

        res.status(200).json({ success: true });
    });
});

app.get('/api/review/:pokemonId', (req, res) => {
    const id_usuario = verifyToken(req, res);
    if (!id_usuario) return;

    const id_pokemon = req.params.pokemonId;

    const sql = "CALL GETREVIEW(?, ?, @calificacion); SELECT @calificacion AS calificacion;";
    db.query(sql, [id_usuario, id_pokemon], (err, results) => {
        if (err) {
            console.error("Error en GETREVIEW:", err); 
            return res.status(500).json({ message: "Error al obtener la review" });
        }
        
        const calificacion = results[1][0].calificacion;
        res.json({ calificacion: calificacion === 0 ? null : calificacion });
    });
});

app.post('/api/review', (req, res) => {
    const id_usuario = verifyToken(req, res);
    if (!id_usuario) return;

    const { id_pokemon, calificacion } = req.body;

    if (!id_pokemon || !calificacion || calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ message: "Datos inválidos" });
    }

    const sql = "CALL INSERTORUPDATEREVIEW(?, ?, ?)";
    db.query(sql, [id_usuario, id_pokemon, calificacion], (err) => {
        if (err) {
            console.error("Error en INSERTORUPDATEREVIEW:", err);
            return res.status(500).json({ message: "Error al guardar la review" });
        }
        res.json({ message: "Review guardada" });
    });
});

app.delete('/api/review/:pokemonId', (req, res) => {
    const id_usuario = verifyToken(req, res);
    if (!id_usuario) return;

    const id_pokemon = req.params.pokemonId;

    const sql = "CALL DELETEREVIEW(?, ?)";
    db.query(sql, [id_usuario, id_pokemon], (err) => {
        if (err) {
            return res.status(500).json({ message: "Error al eliminar la review" });
        }
        res.json({ message: "Review eliminada" });
    });
});

app.get('/api/pokerank', (req, res) => {
    const sql = "CALL GetTopRatedPokemon()";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error en GetTopRatedPokemon:", err);
            return res.status(500).json({ message: "Error al obtener el Poké Rank" });
        }

        res.json(results[0]);
    });
});

app.delete("/deleteaccount/:id", (req, res) => {
    const userId = req.params.id;
    const sql = `CALL DeleteUser(?)`;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ msg: "Error" });
        }
        res.status(200).json({ msg: "Deleted" });
    });
});



