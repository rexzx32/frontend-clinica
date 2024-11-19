import React from 'react'

export const TablaPacientes: React.FC = (pacientes: Paciente[]) => {
  return (
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
  )
}

