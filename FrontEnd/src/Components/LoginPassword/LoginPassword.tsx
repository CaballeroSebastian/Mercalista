import React, { useState, useEffect } from 'react';
import './LoginPassword.css';
import logo from '../../assets/Image/logo.png';
import collage from '../LoginEmail/img/collage.png';
import googleIcon from '../LoginEmail/img/google.png';

import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';

const LoginPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const [eyeIcon, setEyeIcon] = useState(<EyeClosed />);

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const togglePasswordInputType = () => {
    const newType = passwordType === 'password' ? 'text' : 'password';
    setPasswordType(newType);
    setEyeIcon(newType === 'password' ? <EyeClosed /> : <Eye />);
  };

  return (
    <div className="body">
      <header className="header-login">
        <h1 className="titulo-login-password">MercaLista</h1>
      </header>

      <div className="logo-container">
        <img className="logo-mercalista" src={logo} alt="Logo de MercaLista" />
      </div>

      <div className="contenedor-izquierdo">
        <h4 className="text">
          Ingresá tu contraseña para comenzar
          <br />
          tu sesión de forma segura.
        </h4>
        <img src={collage} alt="Collage de productos" className="img-collage" />
      </div>

      <div className="contenedor-derecho-login-password col-13 col-md-4 right-side">
        <form className="formulario-login-password text-center">
          <div className="email-group mb-4 text-start">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu e-mail"
              value={email}
              readOnly // El campo es solo lectura
            />
            <br />

            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <div className="password-container position-relative">
              <input
                type={passwordType}
                className="form-control"
                id="password"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                className="button-view toggle-password btn btn-sm"
                onClick={togglePasswordInputType}
              >
                {eyeIcon}
              </button>
            </div>

            <p className="password-olvido">
              <a href="#" className="olvido">
                ¿Olvidaste tu Contraseña?
              </a>
            </p>
          </div>

          <div className="boton-continuar">
            <button type="submit" className="btn-continuar">
              Continuar
            </button>
          </div>

          <div className="linea-media text-center">
            <span>o</span>
          </div>

          <div className="boton-google">
            <button type="button" className="btn-google">
              <img src={googleIcon} alt="Google icon" className="google-icon" />
              Iniciar sesión con Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPassword;