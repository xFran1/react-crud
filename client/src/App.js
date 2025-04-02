import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {

  const [nombre,setNombre] = useState(""); 
  const [edad,setEdad] = useState(0); 
  const [pais,setPais] = useState(""); 
  const [cargo,setCargo] = useState(""); 
  const [anios,setAnios] = useState(0); 

  const add = () =>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios 
    }).then(()=>{
      alert("Empleado registrado")
    })
  }

  return (
    <div className="App">
      <div className="datos">
        <label>Nombre: <input type="text"
          onChange={(event)=>{
          setNombre(event.target.value);
        }}
        /></label>
        <label>Edad: <input type="text"
         onChange={(event)=>{
          setEdad(event.target.value);
        }}
        /></label>
        <label>País: <input type="text"
         onChange={(event)=>{
          setPais(event.target.value);
        }}
        /></label>
        <label>Cargo: <input type="text"
         onChange={(event)=>{
          setCargo(event.target.value);
        }}
        /></label>
        <label>Años: <input type="number"
         onChange={(event)=>{
          setAnios(event.target.value);
        }}
        /></label>
        <button onClick={ add }>Registrar</button>
      </div>
    </div>
  );
}

export default App;
