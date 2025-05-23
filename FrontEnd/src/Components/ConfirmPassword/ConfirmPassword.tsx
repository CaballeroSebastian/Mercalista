import React, { useRef } from 'react';
import './style.css';
import collage from './img/collage.png';
import logo from './img/logo.png';

const ConfirmPassword: React.FC = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
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
            Ingresa el código que te enviamos 
            <br/> por e-mail.
            <h6>El codigo que enviamos a tu e-mail es de 6 digitos</h6>
        </h4>
        <img src={collage} alt="Collage de productos" className="img-collage" />
      </div>

        <div className="contenedor-derecho col-13 col-md-4 right-side">
        <div className="verification-container">
            <h3>Ingresa el código</h3>
            <div className="code-inputs">
                {Array.from({ length: 6 }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="code-box"
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                />
                ))}
            </div>
            <div className="actions">
                <a href="#" className="resend-link">Reenviar código</a>
                <div className="buttons">
                <button className="confirm-btn">Confirmar código</button>
                <a href="#" className="choose-method">Elegir otro método</a>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ConfirmPassword;