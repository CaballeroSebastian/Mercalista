import React, { useState } from 'react';
import './LoginEmail.css';
import collage from './img/collage.png';
import logo from '../../assets/Image/logo.png';
import googleIcon from './img/google.png';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Asegúrate de que la ruta sea correcta

const LoginEmail: React.FC = () => {
  const { setTempEmail } = useAuth();
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // ⭐ Estado de carga
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo) {
      setError('Por favor, ingresa tu correo electrónico');
      return;
    }

    setIsLoading(true); // ⭐ Activar estado de carga
    setError(''); // Limpiar errores previos

    try {
      console.log('Enviando petición a:', 'http://localhost:8000/login/verificar-email/');
      console.log('Datos enviados:', { correo });
      
      const response = await fetch('http://localhost:8000/login/verificar-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      console.log('Status de respuesta:', response.status);
      console.log('Response OK:', response.ok);

      const data = await response.json();
      console.log('Datos recibidos:', data);

      // LÓGICA CORREGIDA: Guardar email en localStorage antes de navegar
      if (response.ok && data.correo_valido) {
        console.log('Correo válido, guardando y navegando...');
        
        setTempEmail(correo); // Guardar el email en el contexto
        navigate('/LoginPassword');
      } else if (response.ok && !data.correo_valido) {
        console.log('Correo no válido');
        setError('Correo invalido');
      } else {
        console.log('Error del servidor');
        setError('Error del servidor. Intenta de nuevo.');
      }

    } catch (err) {
      console.error('Error completo:', err);
      if (err instanceof Error) {
        console.error('Tipo de error:', err.name);
        console.error('Mensaje de error:', err.message);
      } else {
        console.error('Tipo de error desconocido');
      }
      setError('Error al verificar el correo. Intenta de nuevo.');
    } finally {
      setIsLoading(false); // ⭐ Desactivar estado de carga
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
              Email
            </label>
            <input
              type="email"
              className="form-control2"
              id="correo"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              disabled={isLoading} // ⭐ Deshabilitar input mientras carga
            />
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </div>

          <div className="button-continuar">
            <button 
              type="submit" 
              className="btn-conti"
              disabled={isLoading} // ⭐ Deshabilitar botón mientras carga
            >
              {isLoading ? 'Verificando...' : 'Continuar'} {/* ⭐ Cambiar texto */}
            </button>
          </div>

          <div className="button-crearcuenta">
            <Link to="/register">Crear cuenta</Link>
          </div>

          <div className="lineas-medio text-center">
            <span>o</span>
          </div>

          <div className="icon-google">
            <button type="button" className="btn-google-img" disabled={isLoading}>
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