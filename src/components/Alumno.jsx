import React, { useState } from 'react';
import './alumno.css'


const imagen1 = require('./dracode.png')
const imagen2 = require('./goten.jpg')

const Alumno = () => {

  const AlumnosInicial = [
    {id:201923172, nombre:'Luis', carrera: 'ISIC', foto: imagen1},
    {id:201923173, nombre:'Fernando', carrera: 'MECA', foto: imagen2},
  ]
  const [alumnos, setAlumnos]=useState(AlumnosInicial)
  const [imagenRuta, setImagenRuta] = useState(AlumnosInicial.foto); 
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const editarAlumno=(i,n,c,f)=>{

    document.querySelector('.nuevoM').value = i
    document.querySelector('.nuevoN').value =n
    document.querySelector('.nuevoC').value = c
    document.querySelector('.nuevoF').value = ''

    if(i && n && c){
      const nuevosAlumnos = alumnos.filter(alumno => alumno.id !== i);
      setAlumnos(nuevosAlumnos);

      const editAlumno = {i, n, c, f: imagenRuta};
      alert(editAlumno)
     

    }else{
      alert('Datos Incorrectos')
    }
 
  }

  const obtenerRuta = (e) => {
    const file = e.target.files[0];
    const directory = URL.createObjectURL(file);
    setImagenRuta(directory);
    alert(directory)
  };


  

  const agregarAlumno = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.elements.matricula.value);
    const nombre = e.target.elements.nombre.value;
    const carrera = e.target.elements.carrera.value;
    const foto = imagenRuta


    if (id && nombre && carrera) {
      const nuevoAlumno = { id, nombre, carrera, foto};
      setAlumnos([...alumnos, nuevoAlumno]);
      alert('Alumno registrado exitosamente')
      e.target.reset();
    }else{
      alert('campos necesarios incorrectos')
    }
  }
  const borrarAlumno = (id) => {
    const nuevosAlumnos = alumnos.filter(alumno => alumno.id !== id);
    setAlumnos(nuevosAlumnos);
  }

  return (
    <>
    <div className='capa'></div>
    <div className='formularioAlumno' style={{display: mostrarTabla ? 'none' : 'block',}}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"></link>
        <form onSubmit={agregarAlumno}>
          <h3>REGISTRO ALUMNOS</h3>
          <h5>Matricula</h5>
          <input type="text" id="matricula" className='matricula nuevoM'/>

          <h5>Nombre</h5>
          <input type="text" id="nombre" className='nombre nuevoN'/>

          <h5>Carrera</h5>
          <select id="carrera" className='carrera nuevoC'>
            <option value="">Selecciona una carrera</option>
            <option value="ISIC">Ingenieria en Sistemas Computacionales</option>
            <option value="MECA">Mecatronica</option>
            <option value="IQUI">Ingenieria Quimica</option>
            <option value="ADMIN">Administracion</option>
            <option value="CIVIL">Civil</option>
            <option value="LOGI">Logistica</option>
          </select>

          <h5>Imagen</h5>
          <input className='fotoUser nuevoF' type="file" id="imagen" onChange={obtenerRuta}/>
          <br /><br />
          <button type="submit" className='btnEnviar' style={{marginLeft:'125px'}}>Registrar</button>
          
        </form>
       
      </div>
        <h3 className='alumnos' style={{color:'red', marginTop:'20px', width:'100%'}}>Alumnos </h3>
        <div className='contenedorTabla'>
          
            <div >
            <table className='tabla table-success table-striped'>
            <thead className='arriba'>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Foto</th>
                <th>Eliminar</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(alumno => (
                <tr className='contenido' key={alumno.id}>
                  <td>{alumno.id}</td>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.carrera}</td>
                  <td><img className='imagenTabla' src={alumno.foto} width={"100px"} height={"100px"} /></td>
                  <td><button className='btnEliminar'  onClick={() => borrarAlumno(alumno.id)}> ELIMINAR</button></td>
                  <td><button className='btnEditar'  onClick={() => editarAlumno(alumno.id, alumno.nombre, alumno.carrera, alumno.foto)}> EDITAR</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          
          </div>
       
        </div>
    </>
  );
}

export default Alumno;
