import React, { useState, useEffect} from 'react';
import './LoginPassword.css';
import logo from '../../assets/Image/logo.png';
import collage from '../LoginEmail/img/collage.png';
import googleIcon from '../LoginEmail/img/google.png';
import { Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; 


const LoginPassword: React.FC = () => {
  const { login } = useAuth(); // ✅ Usar el hook personalizado

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
    setIsLoading(true);
    setError('');

    try {
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

        const data = await response.json();

        if (response.ok && data.contraseña_valida) {
            const userData = {
                idusuario: data.usuario.idusuario,
                tipousuario: data.usuario.tipousuario,
                nombre: data.usuario.nombre,
                apellido: data.usuario.apellido,
                telefono: data.usuario.telefono,
                cedula: data.usuario.cedula,
                ciudad: data.usuario.ciudad,
                correo: data.usuario.correo,
                contraseña: data.usuario.contraseña,
                departamento: data.usuario.departamento,
                username: data.usuario.username,
                image_profile: data.usuario.image_profile
            };

            // Solo llamamos a login una vez y dejamos que AuthContext maneje el resto
            await login(data.access_token, userData);
            navigate(`/logged/${userData.username}`, { replace: true });
            
        } else if (response.ok && !data.contraseña_valida) {
            setError('Contraseña incorrecta');
        } else {
            setError('Error al iniciar sesión');
        }
        } catch (err) {
            console.error('Error:', err);
            setError('Error al verificar la contraseña. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
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