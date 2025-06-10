import React, { createContext, useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

interface Usuario {
  idusuario: number;
  tipousuario: string;
  nombre: string;
  apellido: string;
  telefono: string;
  cedula: string;
  ciudad: string;
  correo: string;
  contraseña: string;
  departamento: string;
  username: string;
  image_profile?: string;
}

interface AuthContextType {
  user: Usuario | null;
  accessToken: string | null;
  loading: boolean;
  login: (token: string, userData: Usuario) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem('access_token');
      const storedUserData = localStorage.getItem('userData');

      if (storedToken && storedUserData) {
        try {
          const decodedToken = jwtDecode<{ exp: number }>(storedToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            setAccessToken(storedToken);
            setUser(JSON.parse(storedUserData));
          } else {
            console.log('Token expirado');
          }
        } catch (error) {
          console.error('Error al decodificar token:', error);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (token: string, userData: Usuario) => {
    localStorage.setItem('access_token', token);

    try {
      const response = await fetch(`http://127.0.0.1:8000/profile/${userData.cedula}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('No se pudo obtener el perfil completo');
      const perfilCompleto = await response.json();

      localStorage.setItem('userData', JSON.stringify(perfilCompleto));
      setAccessToken(token);
      setUser(perfilCompleto);
    } catch (error) {
      localStorage.setItem('userData', JSON.stringify(userData));
      setAccessToken(token);
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userData');
    setAccessToken(null);
    setUser(null);
    window.location.href = 'http://localhost:5173/';
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export default AuthContext;
