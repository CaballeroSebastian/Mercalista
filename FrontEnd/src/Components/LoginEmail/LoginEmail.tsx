import React, { useState } from 'react';
import './LoginEmail.css';
import collage from './img/collage.png';
import logo from '../../assets/Image/logo.png';
import googleIcon from './img/google.png';
import { useNavigate, Link } from 'react-router-dom';

const LoginEmail: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo) {
      setError('Por favor, ingresa tu correo electrónico');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login/VerificarEmailView', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      const data = await response.json();

      if(response.status == 200){
        navigate('/LoginEmail/LoginPassword');} 

      if (!response.ok || !data.correo_valido) {
        setError('Correo no registrado o inválido');
        return;
      }

    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error al verificar el correo. Intenta de nuevo.');
}
  };

  return (
    <div className="body">
      <header className="contenedor-header">
        <h1 className="titulo-login">MercaLista</h1>
      </header>

      <div className="contenedor-logo">
        <img className="logo-merca" src={logo} alt="Logo de MercaLista" />
      </div>

      <div className="contenedor-izquierdo1">
        <h4 className="text2">
          Ingresá tu e-mail para comenzar tu
          <br /> sesión de forma segura.
        </h4>
        <img src={collage} alt="Collage de productos" className="collage-fruit" />
      </div>

      <div className="contenedor-derecho1 col-13 col-md-4 right-side">
        <form className="form-login text-center" onSubmit={handleSubmit}>
          <div className="email-login mb-4 text-start">
            <label htmlFor="correo" className="form-label1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control2"
              id="correo"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
            />
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </div>

          <div className="button-continuar">
            <button type="submit" className="btn-conti">
              Continuar
            </button>
          </div>

          <div className="button-crearcuenta">
            <Link to="/register">Crear cuenta</Link>
          </div>

          <div className="lineas-medio text-center">
            <span>o</span>
          </div>

          <div className="icon-google">
            <button type="button" className="btn-google-img">
              <img src={googleIcon} alt="Google icon" className="icon-google-v" />
              Iniciar sesión con Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginEmail;
