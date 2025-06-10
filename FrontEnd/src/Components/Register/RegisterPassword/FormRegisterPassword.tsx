import { useState } from 'react';
import React from 'react';
import  axios from 'axios';

interface FormRegisterPassword {
  usuario: string;
  setUsuario: React.Dispatch<React.SetStateAction<string>>;
  contraseña: string;
  setContraseña: React.Dispatch<React.SetStateAction<string>>;
  onConfirmar: () => void;
}

export function FormRegisterPassword({
  usuario,
  setUsuario,
  contraseña,
  setContraseña,
  onConfirmar,
}: FormRegisterPassword) {

  const [usuarioError, setUsuarioError] = useState<string | null>(null);

  const verificarUsuario = async () => {
  try {
    const response = await axios.post('http://localhost:8000/Register/verificarDatos/', {
      username: usuario
    });

    if (response.data.username_existe) {
      setUsuarioError("El nombre de usuario ya está registrado.");
      return false;
    }

    setUsuarioError(null); // No hay error
    return true;

  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    setUsuarioError("Error al verificar el usuario.");
    return false;
  }
};



  return (
    <>
      
      <form className="form-register" onSubmit={(e) => e.preventDefault()}>
        <label className='form-label-register' htmlFor="user">User:</label>
        <input
          className='form-input-register'
          type="text" 
          id="user" 
          name="user"
          value={usuario}
          onChange={(e)=>{setUsuario(e.target.value); setUsuarioError(null)}}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value)}
          required />
          {usuarioError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{usuarioError}</p>}

        <br />
        <label className='form-label-register' htmlFor="password">Password:</label>
        <input
         className='form-input-register'
         type="password" 
         id="password" 
         name="password"
         value={contraseña}
         onChange={(e) => {setContraseña(e.target.value); setUsuarioError(null)}}
         onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target.value = e.target.value)} />
        <br />
        <input
          type="submit"
          value="Continuar"
          onClick={async () => {
            const valido = await verificarUsuario();
            if (valido) {
              onConfirmar(); // Solo continúa si no hay errores
            }
          }}
        />
        {/* <p> {usuario} {contraseña}</p> */}
      </form>
    </>
  ) 
} 