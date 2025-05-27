import { useEffect, useState } from "react";
import "./profile.css";
import NavBar from "../LoggedNav/LoggedNav";
import '../LoggedNav/LoggedNav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import editarIcon from './assets/boton-editar.png';
import checkIcon from './assets/check.png'; // NUEVO ÍCONO DE CHECK
import suscripcionIcon from './assets/suscripcion.png';
import perfilIcon from './assets/perfil.png';
import mapaIcon from './assets/mapa.png';
import { useParams } from 'react-router-dom';
import axios from "axios";

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
}

const Profile = () => {
  const { cedula } = useParams<{ cedula: string }>();

  const [datosUsuario, setDatosUsuario] = useState<datosUser | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key in keyof datosUser]?: boolean }>({});
  const [formData, setFormData] = useState<Partial<datosUser>>({});

  useEffect(() => {
    if (!cedula) return;

    axios
      .get<datosUser>(`http://127.0.0.1:8000/profile/${cedula}/`)
      .then((response) => {
        setDatosUsuario(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error con los datos del usuario", error);
      });
  }, [cedula]);

  const handleEditClick = (field: keyof datosUser) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

    // Reset form data field if cancelling edit
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

    try {
      const updatedData = { ...datosUsuario, ...formData };
      const response = await axios.put(`http://127.0.0.1:8000/profile/${cedula}/`, updatedData);
      setDatosUsuario(response.data);
      setIsEditing((prev) => ({
        ...prev,
        [field]: false,
      }));
    } catch (error) {
      console.error("Error al actualizar", error);
      alert("Error al actualizar el campo. Intenta de nuevo.");
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

  return (
    <NavBar>
      <div className="perfil">
        <h1 className="title-perfil">Perfil</h1>

        {/* Contenedor Principal */}
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
                      <span className="li-info">PepeLechuga</span>
                      <a href="#">
                        <img className="icons" src={editarIcon} alt="editar" />
                      </a>
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
          {/* Final Información Personal */}

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
                            value={formData.contraseña || ""}
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
          {/* Final Contraseña y Suscripción */}

          {/* Bloque 3 - Foto de Perfil */}
          <div className="bloqueFotoP bloque-3 col-12 col-md-6 col-lg-3 text-center">
            <div className="contenido-bloque3">
              <h2 className="title-info">Foto de Perfil</h2>
              <div className="foto-perfil-container">
                <img src={perfilIcon} alt="Foto de perfil" className="foto-perfil" />
                <div className="d-flex justify-content-center">
                  <a href="#">
                    <img className="icons icons-perfil" src={editarIcon} alt="editar foto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Final Foto de Perfil */}

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
                        {isEditing["ciudad"] ? (
                          <>
                            <input
                              className="form-control"
                              value={formData.ciudad || ""}
                              onChange={(e) => handleInputChange(e, "ciudad")}
                            />
                            <img
                              className="icons"
                              src={checkIcon}
                              alt="confirmar"
                              onClick={() => handleConfirmEdit("ciudad")}
                              style={{ cursor: "pointer" }}
                            />
                          </>
                        ) : (
                          <>
                            <span className="li-info">{datosUsuario?.ciudad}</span>
                            <a onClick={() => handleEditClick("ciudad")}>
                              <img className="icons" src={editarIcon} alt="editar" />
                            </a>
                          </>
                        )}
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
          {/* Final Ubicación */}
        </div>

        {/* Botón Cerrar Sesión */}
        <div className="bloque-4 text-center">
          <button className="btn-cerrar-sesion btn w-md-auto">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </NavBar>
  );
};

export default Profile;
