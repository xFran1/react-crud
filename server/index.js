const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados_crud"
});

// Conectar a MySQL
function connectDB() {
    db.connect((err) => {
        if (err) {
            console.error("Error al conectar con MySQL:", err);
            setTimeout(connectDB, 2000); // Intenta reconectar después de 2 segundos
        } else {
            console.log("Conectado a MySQL");
        }
    });

    db.on("error", (err) => {
        console.error("Error en la conexión MySQL:", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("Reconectando...");
            connectDB();
        } else {
            throw err;
        }
    });
}

connectDB(); // Llamar a la función para establecer la conexión
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre; 
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo; 
    const anios = req.body.anios;

    db.query("INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)",[nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send("Empleado registrado con éxito!!");
            }
        }
    )

});

app.listen(3001,()=>{
    console.log('Corriendo en el puerto 3001')
})