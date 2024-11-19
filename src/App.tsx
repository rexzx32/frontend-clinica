import React, { useEffect, useState } from 'react';

import api from './api'; // Asegúrate de que el archivo api.ts exista en src y tenga la configuración correcta

interface Paciente {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  id: number
}

const App : React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [data, setData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    telefono: ''
  }) // Estado para almacenar la lista de pacientes

  const fetchListPacientes = () => {
     // Llamada a la API para obtener pacientes
     api.get('/clinicadental/pacientes') // Cambia '/api/pacientes' al endpoint correcto de tu API
     .then((response) => {
       console.log(response);
       setPacientes(response.data); // Almacena los datos en el estado
     })
     .catch((error) => {
       console.error('Error al obtener los pacientes:', error); // Imprime errores en la consola
     });
  }

  // function to delete patient in database

  const deletePaciente : any = (id: number) => {
    api.delete(`/clinicadental/pacientes/${id}`).
    then((response) => {
      console.log(response);
      setPacientes(pacientes.filter((paciente) => paciente.id !== id));
    })	
    .catch((error) => {
      console.error('Error al eliminar el paciente:', error); // Imprime errores en la consola
    });
  }

  const addPaciente = (e: React.FormEvent) => {
    e.preventDefault()
    // Llamada a la API para agregar un paciente
    api.post('/clinicadental/pacientes', data) // Cambia '/api/pacientes' al endpoint correcto de tu API
    .then((response) => {
      console.log(response);
     setPacientes([...pacientes, response.data ]);
      setData({ nombre: '', apellido: '', fechaNacimiento: '', telefono: '' }) // Agrega el nuevo paciente al estado
    })
    .catch((error) => {
      console.error('Error al agregar el paciente:', error); // Imprime errores en la consola
    });
  }

  useEffect(() => {
    fetchListPacientes();
  }, []);

  return (
    <div style={{
      width: "100vw",
      boxSizing: "border-box",
      padding: "24px"
    }}>
      
        <h1>Lista Pacientes</h1>
  
      <div style={{ display: 'flex', gap: "24px" }}>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha Nacimiento</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente : Paciente) => (
              <tr key={paciente.nombre}>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.fechaNacimiento}</td>
                <td>{paciente.telefono}</td>
                <td><button onClick={() =>deletePaciente(paciente.id)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <form style={{ display: 'flex', flexDirection: 'column', width: "40%" }} onSubmit={addPaciente}>
          <input placeholder='Ingresar nombre' type="text" value={data.nombre} onChange={(e) => setData({ ...data, nombre: e.target.value })} />
          <input placeholder='Ingresar apellido' type="text" value={data.apellido} onChange={(e) => setData({ ...data, apellido: e.target.value })} />
          <input placeholder='Ingresar fecha de nacimiento' type="date" value={data.fechaNacimiento} onChange={(e) => setData({ ...data, fechaNacimiento: e.target.value })} />
          <input  type="text" value={data.telefono} onChange={(e) => setData({ ...data, telefono: e.target.value })} />
          <button type="submit">Agregar Paciente</button>
        </form>
      </div>
    </div>
  );
};

export default App;

