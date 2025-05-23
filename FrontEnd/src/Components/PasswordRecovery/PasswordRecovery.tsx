import React from 'react';
import './style.css';
import collage from './img/collage.png';
import logo from './img/logo.png';

const PasswordRecovery: React.FC = () => {
  return (
    <div className="body">
      <header className="header">
        <h1 className="titulo">MercaLista</h1>
      </header>

      <div className="logo-container">
        <img
          className="logo-mercalista"
          src={logo}
          alt="Logo de MercaLista"
        />
      </div>

      <div className="contenedor-izquierdo">
        <h4 className="text">
            Elige un método de verificación 
          <br /> para iniciar sesión.
        </h4>
        <img src={collage} alt="Collage de productos" className="img-collage" />
      </div>

        <div className="contenedor-derecho col-13 col-md-4 right-side">
        <div className="right-section">
          {/* Email Option */}
          <div className="option">
            <div className="flex items-center">
              <div className="text-2xl">📧</div>
              <div className="ml-4">
                <div className="font-bold">E-mail</div>
                <div className="text-sm text-gray-600">
                  Te enviaremos un código por correo electrónico.
                </div>
              </div>
            </div>
            <div className="text-xl">➔</div>
          </div>

          {/* SMS Option */}
          <div className="option">
            <div className="flex items-center">
              <div className="text-2xl">💬</div>
              <div className="ml-4">
                <div className="font-bold">Message</div>
                <div className="text-sm text-gray-600">
                  Te enviaremos un código por teléfono.
                </div>
              </div>
            </div>
            <div className="text-xl">➔</div>
          </div>
        </div>
          

          <div className="linea-media text-center">
            <span>:D</span>
          </div>
        </div>
    </div>
  );
};

export default PasswordRecovery;