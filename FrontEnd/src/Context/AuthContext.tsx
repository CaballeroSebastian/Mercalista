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
  tempEmail: string | null;
  setTempEmail: (email: string | null) => void;
  login: (token: string, userData: Usuario) => Promise<void>;
  logout: () => void;
  updateUserData: (newUserData: Partial<Usuario>) => Promise<void>;
  fetchWithToken: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tempEmail, setTempEmail] = useState<string | null>(
    sessionStorage.getItem('tempEmail') // Usar sessionStorage para persistencia
  );

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) throw new Error('No refresh token');

      const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refresh
        }),
      });

      if (!response.ok) throw new Error('Failed to refresh token');

      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      setAccessToken(data.access);
      return data.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  };

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

  useEffect(() => {
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
    window.location.href = '/LoginEmail'; // Redirigir al login
  };

  // Función para actualizar el usuario sin cerrar sesión
  const updateUserData = async (newUserData: Partial<Usuario>) => {
    if (user) {
      const updatedUser = { ...user, ...newUserData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  // Verificar token antes de cada petición
  const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    let token = localStorage.getItem('access_token');
    
    try {
      // Verificar si el token actual está por expirar
      if (token) {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const currentTime = Date.now() / 1000;
        
        // Si el token expira en menos de 5 minutos, refrescarlo
        if (decodedToken.exp - currentTime < 300) {
          token = await refreshToken();
        }
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      console.error('Error en fetchWithToken:', error);
      throw error;
    }
  };

  const handleSetTempEmail = (email: string | null) => {
    setTempEmail(email);
    if (email) {
      sessionStorage.setItem('tempEmail', email);
    } else {
      sessionStorage.removeItem('tempEmail');
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      loading,
      tempEmail,
      setTempEmail: handleSetTempEmail,
      login,
      logout,
      updateUserData,
      fetchWithToken 
    }}>
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
