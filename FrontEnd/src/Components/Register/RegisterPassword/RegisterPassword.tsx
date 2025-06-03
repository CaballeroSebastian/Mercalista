import { FormRegisterPassword } from './FormRegisterPassword';
import './RegisterPassword.css';
import { SectionLeftRegisterPassword } from './SectionLeftRegisterPassword';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface RegisterPassword {
  name: string;
  apellido: string;
  telefono: string;
  correo: string;
  ciudad: string;
  departamento: string;
}

function RegisterPassword() {
  const location = useLocation();
  const { name, apellido, telefono, correo, ciudad, departamento } = location.state || {};

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
      ciudad,
      departamento,
      usuario,
      contraseña,
    };

    // Aquí puedes enviar los datos al backend o manejarlos según sea necesario
    console.log('Datos completos:', datosCompletos);
    
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
            usuario={usuario}
            setUsuario={setUsuario}
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