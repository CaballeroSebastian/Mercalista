import { useState } from 'react';
import React from 'react';

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

  const [User, SetUser] = useState('');
  const [Password, SetPassword] = useState('');

  return (
    <>
      
      <form className="form-register" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="user">User:</label>
        <input 
          type="text" 
          id="user" 
          name="user"
          value={usuario}
          onChange={(e)=>setUsuario(e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value)}
          required />
        <br />
        <label htmlFor="password">Password:</label>
        <input
         type="text" 
         id="password" 
         name="password"
         value={contraseña}
         onChange={(e) => setContraseña(e.target.value)}
         onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target.value = e.target.value)} />
        <br />
        <input type="submit" value="Continuar" onClick={onConfirmar} />
        {/* <p> {usuario} {contraseña}</p> */}
      </form>
    </>
  ) 
} 