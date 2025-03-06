const express = require ('express');
const app = express();
const cors = require ('cors');
const mysql = require ('mysql2');

app.use (cors());
app.use (express.json());

app.listen(3001,
    ()=>{console.log("Escuchando en el servidor");}
)

const db = mysql.createConnection(

    {

        host: "localhost",
        user: "root",
        password: "",
        database: "ejercicios",
        port: 3306

    }
)

app.post('/register', 
    (req, resp)=>{
        const usuName = req.body.name;
        const usuEmail = req.body.email;
        const usuPssw = req.body.pssw;

        db.query('INSERT INTO USUARIO(NOMBRE, EMAIL, PSSW) VALUES(?,?,?)',
            [usuName, usuEmail, usuPssw], 
            (error, data)=>{
                if(error){
                    console.log(error);
                    resp.json({
                        "message": "Error"
                    })
                    
                }
                else{
                    console.log(data);
                    resp.json({
                        "message": "Registrado"
                    })
                }
            }
        )
    }
)

app.post('/login',
    (req, resp)=>{
        db.query("SELECT * FROM USUARIO WHERE EMAIL=? AND PSSW=?",
           [req.body.email, req.body.pssw],
           (error, data)=>{
                if(error){
                    console.log(error)
                }else 
                    if(data.length>0){
                        console.log("ola")
                    resp.json({
                        "msg": "Encontrado",
                        "name": data[0].nombre
                    })
                }else{
                    resp.json({
                        "msg": "No encontrado"
                    })
                    console.log("ola 2")
                }
           }
        )
    }
)