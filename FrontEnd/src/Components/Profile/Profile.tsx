
import { useEffect, useState } from "react";
import "./profile.css";
import NavBar from "../LoggedNav/LoggedNav";
import '../LoggedNav/LoggedNav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import editarIcon from './assets/boton-editar.png';
import checkIcon from './assets/check.png';
import suscripcionIcon from './assets/suscripcion.png';
import perfilIcon from './assets/perfil.png';
import mapaIcon from './assets/mapa.png';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../../Context/AuthContext'; 


interface datosUser {
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
  image_profile: string;
}

const Profile = () => {
  const { user, accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const { cedula } = useParams<{ cedula: string }>();

  // Agregar los estados faltantes
  const [datosUsuario, setDatosUsuario] = useState<datosUser | null>(null);
  const [formData, setFormData] = useState<Partial<datosUser>>({});
  const [isEditing, setIsEditing] = useState<{ [key in keyof datosUser]?: boolean }>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //ruta del back
  const backendUrl = "http://127.0.0.1:8000/";


  // Función para mostrar alertas
  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  useEffect(() => {
    if (!user || !accessToken) {
      navigate('/LoginEmail');
      return;
    }

    // Verificar si el usuario está intentando ver un perfil que no es el suyo
    if (user.cedula !== cedula) {
      navigate(`/Profile/${user.cedula}`);
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        const response = await axios.get(
          `http://127.0.0.1:8000/profile/${cedula}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDatosUsuario(response.data);
        setFormData({ ...response.data, contraseña: "" });
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        setError("Error al cargar los datos del perfil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, accessToken, navigate, cedula]);

  const validateField = (field: keyof datosUser, value: string): boolean => {
    switch (field) {
      case "correo":
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      case "telefono":
        return /^\d{10}$/.test(value);
      case "contraseña":  
        return /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])(?=.*\d)[A-Za-zÁÉÍÓÚáéíóúÑñ\d!@#$%^&*()_+=\-{}[\]:;"'|<>,.?/~`]{8,}$/.test(value);
      default:
        return true;
    }
  };

  const getValidationErrorMessage = (field: keyof datosUser) => {
    switch (field) {
      case "correo":
        return "El correo debe tener un formato válido, por ejemplo: usuario@dominio.com";
      case "telefono":
        return "El teléfono debe contener exactamente 10 dígitos numéricos.";
      case "contraseña":
        return "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.";
      default:
        return "Valor inválido.";
    }
  };

  const handleEditClick = (field: keyof datosUser) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

    if (isEditing[field] && datosUsuario) {
      setFormData((prev) => ({
        ...prev,
        [field]: datosUsuario[field],
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof datosUser) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

const handleConfirmEdit = async (field: keyof datosUser) => {
  if (!formData || !datosUsuario) return;
  const value = formData[field];

  // Validar campos si son string (como correo, teléfono, contraseña)
  if (typeof value === "string" && !validateField(field, value)) {
    const errorMessage = getValidationErrorMessage(field);
    showAlert(errorMessage);
    return;
  }

  try {
    // Solo incluir el campo que se está editando
    const updatedData: Partial<datosUser> = {};

    if (field === "contraseña") {
      // Enviar contraseña solo si tiene contenido
      if (value && typeof value === "string" && value.trim() !== "") {
        updatedData.contraseña = value;
      } else {
        showAlert("La contraseña no puede estar vacía.");
        return;
      }
    } else {
      if (value !== undefined && value !== datosUsuario[field]) {
        updatedData[field] = value as never;
      } else {
        showAlert("No hay cambios para actualizar.");
        setIsEditing((prev) => ({ ...prev, [field]: false }));
        return;
      }
    }
    const response = await axios.put(
      `http://127.0.0.1:8000/profile/${cedula}/`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setDatosUsuario(response.data);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    showAlert("Campo actualizado correctamente.");
  } catch (error: any) {
    console.error("Error al actualizar", error);
    const errData = error.response?.data;

    if (errData) {
      if (errData.telefono) {
        showAlert(`Error en teléfono: ${errData.telefono.join(", ")}`);
      } else if (errData.contraseña) {
        showAlert(`Error en contraseña: ${errData.contraseña.join(", ")}`);
      } else if (typeof errData === "string") {
        showAlert(`Error: ${errData}`);
      } else {
        showAlert("Error al actualizar el campo. Intenta de nuevo.");
      }
    } else {
      showAlert("Error al actualizar el campo. Intenta de nuevo.");
    }
  }
};




  useEffect(() => {
    if (datosUsuario) {
      const ciudadUsuario = `${datosUsuario.ciudad}, Colombia`;
      const tamaño = "400x200";
      const zoom = 12;
      const tipoMapa = "roadmap";
      const claveAPI = "AIzaSyDJ3hJPOOmYKWq4j-rWqRe9IeIlGI49P04";
      const urlMapa = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
        ciudadUsuario
      )}&zoom=${zoom}&size=${tamaño}&maptype=${tipoMapa}&markers=color:red%7C${encodeURIComponent(
        ciudadUsuario
      )}&key=${claveAPI}`;

      const mapaImagen = document.getElementById("mapa-imagen") as HTMLImageElement;
      if (mapaImagen) {
        mapaImagen.src = urlMapa;
      }
    }
  }, [datosUsuario]);

  if (isLoading) {
    return <div >Cargando perfil...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datosUsuario) {
    return <div>No se encontraron datos del usuario</div>;
  }

  return (
    <NavBar>
      {alertMessage && (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1050 }}
        >
          <div className="toast show align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" style={{ minWidth: '250px' }}>
            <div className="d-flex">
              <div className="toast-body">{alertMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setAlertMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}
          {alertMessage && (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "fixed", top: 20, right: 20, zIndex: 1050 }}
      >
        <div className="toast show align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" style={{ minWidth: '250px' }}>
          <div className="d-flex">
            <div className="toast-body">{alertMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => setAlertMessage(null)}
            ></button>
          </div>
        </div>
      </div>
    )}
      <div className="perfil">
        <h1 className="title-perfil">Perfil</h1>

        <div className="contenedor-perfil d-flex flex-wrap justify-content-between gap-3 row">

          {/* Bloque 1 - Información Personal */}
          <div className="bloque-1 col-12 col-md-6 col-lg-4">
            <div className="contenido-bloque1">
              <div className="info-personal">
                <h2 className="title-info">Información Personal</h2>
                <div className="bloque-info">
                  <div className="info-line">
                    <h2 className="h2-info">Usuario</h2>
                    <div className="li-contenedor d-flex justify-content-between align-items-center">
                      {isEditing["username"] ? (
                        <>
                          <input
                            className="form-control"
                            value={formData.username || ""}
                            onChange={(e) => handleInputChange(e, "username")}
                          />
                          <img
                            className="icons"
                            src={checkIcon}
                            alt="confirmar"
                            onClick={() => handleConfirmEdit("username")}
                            style={{ cursor: "pointer" }}
                          />
                        </>
                      ) : (
                        <>
                          <span className="li-info">{datosUsuario?.username}</span>
                          <a onClick={() => handleEditClick("username")}>
                            <img className="icons" src={editarIcon} alt="editar" />
                          </a>
                        </>
                      )}
                    </div>
                    <p className="nota-usuario">Cambia el usuario cada 30 días.</p>
                  </div>

                  {/* EMAIL */}
                  <div className="info-line">
                    <h2 className="h2-info">Email</h2>
                    <div className="li-container d-flex justify-content-between align-items-center">
                      {isEditing["correo"] ? (
                        <>
                          <input
                            className="form-control"
                            value={formData.correo || ""}
                            onChange={(e) => handleInputChange(e, "correo")}
                          />
                          <img
                            className="icons"
                            src={checkIcon}
                            alt="confirmar"
                            onClick={() => handleConfirmEdit("correo")}
                            style={{ cursor: "pointer" }}
                          />
                        </>
                      ) : (
                        <>
                          <span className="li-info">{datosUsuario?.correo}</span>
                          <a onClick={() => handleEditClick("correo")}>
                            <img className="icons" src={editarIcon} alt="editar" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* TELÉFONO */}
                  <div className="info-line">
                    <h2 className="h2-info">Teléfono</h2>
                    <div className="li-container d-flex justify-content-between align-items-center">
                      {isEditing["telefono"] ? (
                        <>
                          <input
                            className="form-control"
                            value={formData.telefono || ""}
                            onChange={(e) => handleInputChange(e, "telefono")}
                            inputMode="numeric"
                          />
                          <img
                            className="icons"
                            src={checkIcon}
                            alt="confirmar"
                            onClick={() => handleConfirmEdit("telefono")}
                            style={{ cursor: "pointer" }}
                          />
                        </>
                      ) : (
                        <>
                          <span className="li-info">{datosUsuario?.telefono}</span>
                          <a onClick={() => handleEditClick("telefono")}>
                            <img className="icons" src={editarIcon} alt="editar" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 2 - Contraseña y Suscripción */}
          <div className="bloque-2 col-12 col-md-6 col-lg-4">
            <div className="contenido-bloque2">
              <div className="contraseña">
                <h2 className="title-info">Contraseña:</h2>
                <div className="bloque-info">
                  <h2 className="info-contraseña">Contraseña:</h2>
                  <div className="info-contraseña">
                    <div className="li-contraseña d-flex justify-content-between align-items-center">
                      {isEditing["contraseña"] ? (
                        <>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Dejar en blanco para no cambiar"
                          value={isEditing["contraseña"] ? formData.contraseña || "" : ""}
                          onChange={(e) => handleInputChange(e, "contraseña")}
                        />
                          <img
                            className="icons"
                            src={checkIcon}
                            alt="confirmar"
                            onClick={() => handleConfirmEdit("contraseña")}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                          />
                        </>
                      ) : (
                        <>
                          <span className="li-info">***********</span>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditClick("contraseña");
                            }}
                          >
                            <img className="icons" src={editarIcon} alt="editar" />
                          </a>
                        </>
                      )}
                    </div>
                    <p className="nota-usuario">Cambia la contraseña cada 30 días.</p>
                  </div>
                </div>
              </div>

              <div className="suscripcion">
                <h2 className="title-info">Suscripción</h2>
                <div className="bloque-info bloque-subs text-center">
                  <div className="contenedor-suscripcion">
                    <img className="img-suscripcion" src={suscripcionIcon} alt="Suscripción" />
                    <h2 className="h2-suscripcion">Estado</h2>
                  </div>
                  <span className="li-info-suscripcion text-danger mb-2">No suscrito</span>
                  <button className="boton-suscripcion btn btn-warning">Suscribirse</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 3 - Foto de Perfil */}
          <div className="bloqueFotoP bloque-3 col-12 col-md-6 col-lg-3 text-center">
            <div className="contenido-bloque3">
              <h2 className="title-info">Foto de Perfil</h2>
              <div className="foto-perfil-container">
                <img
                  src={
                    datosUsuario?.image_profile
                      ? (datosUsuario.image_profile.startsWith(backendUrl)
                          ? `${datosUsuario.image_profile}?${Date.now()}`
                          : `${datosUsuario.image_profile}?${Date.now()}`)
                      : perfilIcon
                  }
                  alt="Foto de perfil"
                  className="foto-perfil"
                  style={{ objectFit: "cover", width: 150, height: 150, borderRadius: "50%" }}
                />
                <div className="d-flex justify-content-center mt-2">
                  <label htmlFor="profile-image-upload" style={{ cursor: "pointer" }}>
                    <img className="icons icons-perfil" src={editarIcon} alt="editar foto" />
                  </label>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      if (!e.target.files || e.target.files.length === 0) return;
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("image_profile", file);

                      try {
                        console.log("Token enviado:", accessToken);
                        setIsLoading(true);
                        await axios.patch(
                          `http://127.0.0.1:8000/profile/${cedula}/`,
                          formData,
                          { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" }}
                        );
                        // Espera un poco para asegurar que el backend procese la imagen
                        setTimeout(async () => {
                          const response = await axios.get(
                            `http://127.0.0.1:8000/profile/${cedula}/`,
                            { headers: { Authorization: `Bearer ${accessToken}` } }
                          );
                          setDatosUsuario(response.data);
                          showAlert("Foto de perfil actualizada correctamente");
                          setIsLoading(false);
                        }, 500);
                      } catch (err: any) {
                        console.error("Detalles del error:", err.response?.data || err.message);
                        showAlert("Error al subir la foto de perfil");
                        setIsLoading(false);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 5 - Ubicación */}
          <div className="bloque-5 col-12 col-md-6 col-lg-4">
            <div className="contenido-bloque5">
              <div className="ubicacion mt-3">
                <h2 className="title-info">Ubicación</h2>
                <div className="conteiner-ubicacion">
                  <div className="bloque-info">
                    <img className="img-map" src={mapaIcon} alt="Mapa" />
                    <h2 className="h2-ciudad">Ciudad</h2>
                    <div className="ubicacion-content">
                      <div className="li-ubicacion d-flex justify-content-between align-items-center">
                        {/* Solo mostramos la ciudad en modo lectura */}
                        <span className="li-info">{datosUsuario?.ciudad}</span>
                      </div>
                      <div className="mapa-estatico">
                        <img id="mapa-imagen" src="./map.png" alt="Mapa Estático" className="img-fluid rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="bloque-4 text-center">
          <button 
  className="btn-cerrar-sesion btn w-md-auto"
  onClick={() => {
    logout();
    // Puedes agregar aquí navegación después del logout si lo necesitas
  }}
>
  Cerrar Sesión
</button>
        </div>
      </div>
    </NavBar>
  );
};

export default Profile;
