import { FormRegisterPassword } from './FormRegisterPassword';
import './RegisterPassword.css';
import { SectionLeftRegisterPassword } from './SectionLeftRegisterPassword';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

interface RegisterPassword {
  name: string;
  apellido: string;
  telefono: string;
  correo: string;
  cedula: string;
  tipousuario: string;
  ciudad: string;
  departamento: string;
}

function RegisterPassword() {
  const location = useLocation();
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
            usuario={username}
            setUsuario={setUsername}
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