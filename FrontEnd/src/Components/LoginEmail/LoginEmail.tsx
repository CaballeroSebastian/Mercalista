import React, { useState } from 'react';
import './LoginEmail.css';
import collage from './img/collage.png';
import logo from '../../assets/Image/logo.png';
import googleIcon from './img/google.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const LoginEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor ingresa tu e-mail');
      return;
    }
    setError('');
    localStorage.setItem('userEmail', email); // Guarda el correo en localStorage
    navigate('/LoginEmail/LoginPassword');
  };

  return (
    <div className="body">
      <header className="contenedor-header">
        <h1 className="titulo-login ">MercaLista</h1>
      </header>

      <div className="contenedor-logo ">
        <img
          className="logo-merca"
          src={logo}
          alt="Logo de MercaLista"
        />
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
            <label htmlFor="email" className="form-label1">
              E-mail
            </label>
            <input
              type="email"
              className="form-control2"
              id="email"
              placeholder="Ingresa tu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              <img
                src={googleIcon}
                alt="Google icon"
                className="icon-google-v"
              />
              Iniciar sesión con Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginEmail;