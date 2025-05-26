import { useState } from 'react';

export function FormRegisterPassword() {

  const [User, SetUser] = useState('');
  const [Password, SetPassword] = useState('');

  return (
    <>
      
      <form className="form-register">
        <label htmlFor="user">User:</label>
        <input 
          type="text" 
          id="user" 
          name="user"
          value={User}
          onChange={(e)=>SetUser(e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value)}
          required />
        <br />
        <label htmlFor="password">Password:</label>
        <input
         type="text" 
         id="password" 
         name="password"
         value={Password}
         onChange={(e) => SetPassword(e.target.value)}
         onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target.value = e.target.value)} />
        <br />
        <input type="submit" value="Continuar" />
        <p> {User} {Password}</p>
      </form>
    </>
  ) 
} 