
import React, { useState, useEffect } from 'react';
import './LoginPassword.css';
import logo from '../../assets/Image/logo.png';
import collage from '../LoginEmail/img/collage.png';
import googleIcon from '../LoginEmail/img/google.png';
import { Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPassword: React.FC = () => {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Estado para contraseña
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const [eyeIcon, setEyeIcon] = useState(<EyeClosed />);
  const [error, setError] = useState(''); //Estado para errores
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

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


   // ⭐ Función para manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError('Por favor, ingresa tu contraseña');
      return;
    }

    setIsLoading(true); // ⭐ Activar estado de carga
    setError(''); // Limpiar errores previos

    try {
      console.log('Enviando petición a:', 'http://localhost:8000/Password/verificar-password/');
      console.log('Datos enviados:', { correo: email, contraseña: password });
      
      const response = await fetch('http://localhost:8000/Password/verificar-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          correo: email, 
          contraseña: password 
        }),
      });

      console.log('Status de respuesta:', response.status);
      console.log('Response OK:', response.ok);

      const data = await response.json();
      console.log('Datos recibidos:', data);

      // ⭐ LÓGICA DE RESPUESTA
      if (response.ok && data.contraseña_valida) {
        console.log('Login exitoso');
        
        // ⭐ GUARDAR TOKENS Y DATOS DEL USUARIO
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('userData', JSON.stringify(data.usuario));
        
        // ⭐ REDIRIGIR AL DASHBOARD O PÁGINA PRINCIPAL
        navigate('/logged'); // Cambia por tu ruta
        
      } else if (response.ok && !data.contraseña_valida) {
        console.log('Contraseña incorrecta');
        setError('Contraseña incorrecta');
      } else {
        console.log('Error del servidor');
        setError('Contraseña incorrecta.');
      }

    } catch (err) {
      console.error('Error completo:', err);
      if (err instanceof Error) {
        console.error('Tipo de error:', err.name);
        console.error('Mensaje de error:', err.message);
      } else {
        console.error('Tipo de error desconocido');
      }
      setError('Error al verificar la contraseña. Intenta de nuevo.');
    } finally {
      setIsLoading(false); //Desactivar estado de carga
    }
  };
  return (
    <div className="body">
      <header className="header-login">
        <h1 className="titulo-login-password">MercaLista</h1>
      </header>

      <div className="logo-container-password">
        <img className="logo-mercalista-password" src={logo} alt="Logo de MercaLista" />
      </div>

      <div className="contenedor-izquierdo">
        <h4 className="text-login-password">
          Ingresá tu contraseña para comenzar
          <br />
          tu sesión de forma segura.
        </h4>
        <img src={collage} alt="Collage de productos" className="img-collage-password" />
      </div>

      <div className="contenedor-derecho-login-password col-13 col-md-4 right-side">
        <form className="formulario-login-password text-center" onSubmit={handleSubmit}>
          <div className="email-group mb-4 text-start">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control-password"
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
                className="form-control-password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password} // Conectar con el estado
                onChange={e => setPassword(e.target.value)} //Actualizar estado
                disabled={isLoading} // Deshabilitar mientras carga
              />
              <button
                type="button"
                className="button-view toggle-password btn btn-sm"
                onClick={togglePasswordInputType}
                disabled={isLoading} //Deshabilitar mientras carga
              >
                {eyeIcon}
              </button>
            </div>

            {/* ⭐ Mostrar errores */}
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

            <p className="password-olvido">
              <a href="#" className="olvido">
                ¿Olvidaste tu Contraseña?
              </a>
            </p>
          </div>

          <div className="boton-continuar">
            <button 
              type="submit" 
              className="btn-continuar"
              disabled={isLoading} // Deshabilitar botón mientras carga
            >
              {isLoading ? 'Verificando...' : 'Continuar'} {/*Cambiar texto */}
            </button>
          </div>

          <div className="linea-media text-center">
            <span>o</span>
          </div>

          <div className="boton-google">
            <button 
              type="button" 
              className="btn-google"
              disabled={isLoading} //Deshabilitar mientras carga
            >
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