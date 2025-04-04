import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [nombre,setNombre] = useState(""); 
  const [edad,setEdad] = useState(0); 
  const [pais,setPais] = useState(""); 
  const [cargo,setCargo] = useState(""); 
  const [anios,setAnios] = useState(0); 
  const [id,setId] = useState(0); 
  
  const [editar,setEditar] = useState(false); 

  const [empleadosList,setEmpleados] = useState([]);

  const add = () =>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios 
    }).then(()=>{
      alert("Empleado registrado")
      getEmpleados();

    });
  }
  const update = () =>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios 
    }).then(()=>{
      alert("Actualizado")
      getEmpleados();
      limpiarCampos();
    });
  }

  const limpiarCampos = () =>{
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAnios(0);

  }


  const editarEmpleado = (val) => {
    setEditar(true)

    setNombre(val.nombre)
    setEdad(val.edad)
    setCargo(val.cargo)
    setPais(val.pais)
    setAnios(val.anios)
    setId(val.id)
  }

  const getEmpleados = () =>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }

  // Llamar a getEmpleados solo al montar el componente
  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">

    

        <div className="card">
      <div className="card-header">
        GESTIÓN DE EMPLEADOS
      </div>
      <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text"  id="basic-addon1">Nombre:</span>
              <input type="text" 
              onChange={(event)=>{
                setNombre(event.target.value);
              }}
              className="form-control" value={nombre} placeholder="Ingrese un nombre" 
              aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"  id="basic-addon1">Edad:</span>
              <input type="number" 
              onChange={(event)=>{
                setEdad(event.target.value);
              }}
              className="form-control" value={edad} placeholder="Ingrese una edad" 
              aria-label="Edad" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"  id="basic-addon1">Pais:</span>
              <input type="text" 
              onChange={(event)=>{
                setPais(event.target.value);
              }}
              className="form-control" value={pais} placeholder="Ingrese su país" 
              aria-label="País" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"  id="basic-addon1">Cargo:</span>
              <input type="text" 
              onChange={(event)=>{
                setCargo(event.target.value);
              }}
              className="form-control" value={cargo} placeholder="Ingrese su cargo" 
              aria-label="Cargo" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"  id="basic-addon1">Años de experiencia:</span>
              <input type="text" 
              onChange={(event)=>{
                setAnios(event.target.value);
              }}
              className="form-control" value={anios} placeholder="Ingrese sus años" 
              aria-label="Anios" aria-describedby="basic-addon1" />
            </div>
            <div className="card-footer text-muted" >

              {
                editar
                ?
                <div>
                <button className='btn btn-warning me-2' onClick={ update }>
                Actualizar
                </button>
                <button className='btn btn-info' onClick={ limpiarCampos }>
                Cancelar
                </button>
                </div>
              :
                <button className='btn btn-success' onClick={ add }>
                Registrar
               </button>
              }

         
            </div>
    
      </div>

      <div className="card-footer text-muted">
        
              <table className="table table-stripped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Edad</th>
                  <th scope="col">País</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Experiencia</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>

              {
                empleadosList.map((val,key)=>{
                  return <tr key={val.id}>
                            <th>{ val.id }</th>
                            <td>{ val.nombre }</td>
                            <td>{ val.edad }</td>
                            <td>{ val.pais }</td>
                            <td>{ val.cargo }</td>
                            <td>{ val.anios }</td>
                            <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                              <button type="button" 
                              onClick={()=>{
                                editarEmpleado(val)
                              }}
                              className="btn btn-info">Editar</button>
                              <button type="button" className="btn btn-danger">Eliminar</button>
                            </div>
                            
                            </td>

                          </tr> 
                })
              }

                
               
                
              </tbody>
              </table>


      </div>
    </div>

    </div>

  );
}

export default App;
