import { FormRegisterPassword } from './FormRegisterPassword';
import './RegisterPassword.css';
import { SectionLeftRegisterPassword } from './SectionLeftRegisterPassword';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
=======
import axios from 'axios'
>>>>>>> 380b7fe967fb4da12bf11230b9b6100881b9b3af

interface RegisterPassword {
  name: string;
  apellido: string;
  telefono: string;
  correo: string;
<<<<<<< HEAD
=======
  cedula: string;
  tipousuario: string;
>>>>>>> 380b7fe967fb4da12bf11230b9b6100881b9b3af
  ciudad: string;
  departamento: string;
}

function RegisterPassword() {
  const location = useLocation();
<<<<<<< HEAD
  const { name, apellido, telefono, correo, documento, ciudad, departamento } = location.state || {};

  // Estado para usuario y contraseña
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleConfirmar = () => {
    // Combina los datos del formulario anterior con usuario y contraseña
    const datosCompletos = {
      name,
      apellido,
      telefono,
      correo,
      documento,
      ciudad,
      departamento,
      usuario,
      contraseña,
    };

    // Aquí puedes enviar los datos al backend o manejarlos según sea necesario
    console.log('Datos completos:', datosCompletos);
    
  };
=======
  const { nombre, apellido, telefono, correo, cedula, ciudad, tipousuario,  departamento } = location.state || {};

  // Estado para usuario y contraseña
  const [username, setUsername] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleConfirmar = async () => {
  // Combina los datos del formulario anterior con usuario y contraseña
  const datosCompletos = {
  nombre,
  apellido,
  telefono,
  correo,
  cedula,
  ciudad,
  tipousuario,
  departamento,
  username,
  contraseña,
};

  console.log('Datos completos a enviar:', datosCompletos);

      try {
    const response = await axios.post(
      'http://localhost:8000/Register/crearUsuario/',
      datosCompletos,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      }
    );
    console.log('✅ Usuario registrado con éxito:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('❌ Error del backend:', error.response.data);
    } else {
      console.error('❌ Error desconocido:', error.message);
    }
  }
};


>>>>>>> 380b7fe967fb4da12bf11230b9b6100881b9b3af

  return (
    <>
      <header className="header-banner">
        <h1 className="header-title">Mercalista</h1>
      </header>
      <main className="main-mercalista-register">
        <section className="section-mercalista-register">
          <SectionLeftRegisterPassword />
        </section>
        <aside className="aside-mercalista-register">
          <FormRegisterPassword
<<<<<<< HEAD
            usuario={usuario}
            setUsuario={setUsuario}
=======
            usuario={username}
            setUsuario={setUsername}
>>>>>>> 380b7fe967fb4da12bf11230b9b6100881b9b3af
            contraseña={contraseña}
            setContraseña={setContraseña}
            onConfirmar={handleConfirmar}
          />
        </aside>
      </main>
    </>
  );
}

export default RegisterPassword;