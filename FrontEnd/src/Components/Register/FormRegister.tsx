import { Link, Navigate, useNavigate } from 'react-router-dom';
import ciudades from './ciudades';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';

export function FormRegister() {




  const [terminosAceptados, setTerminosAceptados] = useState(false);

  const Navigate = useNavigate()
  
  const [nombre, Setnombre] = useState('')
  const [apellido, Setapellido] = useState('')
  const [telefono, Settelefono] = useState('')
  const [correo, Setcorreo] = useState('')
  const [cedula, Setcedula] = useState('')
  const [tipousuario, Settipousuario] = useState('')

    // Estado para el departamento y la ciudad seleccionados
  const [departamento, setDepartamento] = useState('');
  const [listaCiudades, setListaCiudades] = useState([]);
  const [ciudad, setCiudad] = useState('');

  const [correoError, setCorreoError] = useState<string | null>(null);
  const [telefonoError, setTelefonoError] = useState<string | null>(null);
  const [cedulaError, setCedulaError] = useState<string | null>(null);


    //Función para resetar campos de entrada del formulario

  const resetForm = () => {
    Setnombre('')
    Setapellido('')
    Settelefono('')
    Setcorreo('')
    Setcedula('')
    Settipousuario('')
  }

  const verificarDatos = async () => {
  try {
    const response = await axios.post('http://localhost:8000/Register/verificarDatos/', {
      correo,
      telefono,
      cedula
    });

    const { correo_existe, telefono_existe , cedula_existe} = response.data;

    let hayErrores = false;

    if (correo_existe) {
      setCorreoError("Este correo ya está registrado.");
      hayErrores = true;
    } else {
      setCorreoError(null);
    }

    if (telefono_existe) {
      setTelefonoError("Este teléfono ya está registrado.");
      hayErrores = true;
    } else {
      setTelefonoError(null);
    }

    if (cedula_existe) {
      setCedulaError("Este número de cédula ya está registrado.");
      hayErrores = true;
    } else {
      setCedulaError(null);
    }

    return !hayErrores;
  } catch (error) {
    console.error('Error al verificar los datos:', error);
    setCorreoError("Error al verificar el correo.");
    return false;
  }
};


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const datosValidos = await verificarDatos();
  if (!datosValidos) {
    return; // Detener el envío si los datos ya existen
  }

  Navigate('/Register/RegisterPassword', {
    state: {
      nombre,
      apellido,
      telefono,
      correo,
      cedula,
      departamento,
      ciudad,
      tipousuario,
    },
  });
}; 

  // Maneja el cambio de departamento
  const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dep = e.target.value;
    setDepartamento(dep);
    // Actualiza la lista de ciudades según el departamento
    setListaCiudades(ciudades[dep] || []);
    // Resetea la ciudad seleccionada al cambiar de departamento
    setCiudad('');
  };



    return (
      <form className="form-register" onSubmit={handleSubmit} method='POST'>
        
        <div className='div-form-register'>
        <label className='label-register' htmlFor="name">Nombre:</label>
        <input
        className='form-input-register'
        type="text" 
        id="nombre" 
        name="nombre" 
        value = {nombre}
        onChange={(e)=>Setnombre(e.target.value)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''))}
        required
        
        />
        <br />
        <label className='label-register' htmlFor="apellido">Apellido:</label>
        <input
          className='form-input-register'
          type="text" 
          id="apellido" 
          name="apellido" 
          value = {apellido}
          onChange={(e)=>Setapellido(e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''))}
          required
          />
        <br />
        <label className='label-register' htmlFor="telefono">Telefono:</label>
        <input
          className='form-input-register'
          type="text"
          id="telefono"
          name="telefono"
          value={telefono}
          onChange={(e) => {
            const input = e.target.value;
            // Solo permitir dígitos y máximo 10 caracteres
            if (/^\d{0,10}$/.test(input)) {
              Settelefono(input);
              setTelefonoError(null);
            }
          }}
          onBlur={() => {
            if (!/^3\d{9}$/.test(telefono)) {
              setTelefonoError("Debe comenzar con 3 y tener exactamente 10 dígitos.");
            }
          }}
          required
        />
        {telefonoError && (
          <p style={{ color: 'red', fontSize: '0.9rem' }}>{telefonoError}</p>
        )}
        <br />

        <label className='label-register' htmlFor="correo">Correo:</label>
        <input
          className='form-input-register'
          type="email" 
          id="correo" 
          name="correo" 
          value = {correo}
          onChange={(e)=>{Setcorreo(e.target.value); setCorreoError(null);}}
          required
          />
          {correoError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{correoError}</p>}
        <br />

        <label className='label-register' htmlFor="documento">Documento:</label>
        <input 
          className='form-input-register'
          type="number" 
          id="cedula" 
          name="cedula"
          value = {cedula}
          onChange={(e)=>{Setcedula(e.target.value); setCedulaError(null);}}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value.replace(/^\d{11}$/g, ''))}
          required
        />
        {cedulaError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{cedulaError}</p>}
        <br />
        <label className='label-register' htmlFor="">Tipo de Usuario</label>
        <select 
          typeof='text'
          className="form-select"
          value={tipousuario} 
          onChange={(e) => Settipousuario(e.target.value)}
          name='tipousuario'
          id='tipousuario'
          required
        > 
          <option value="">-- Selecciona tipo de usuario --</option>
          <option value="comprador">Comprador</option>
          <option value="vendedor">Vendedor</option>
        </select>
        <br />

        <div >
          <label  htmlFor="dep-select" className="form-label-register">
            {" "}
            Departamento:
          </label>
          <select
            typeof='text'
            className="form-select"
            id="dep-select"
            value={departamento}
            onChange={handleDepartamentoChange}
            required
          >
            <option value="">-- Selecciona un departamento --</option>
            {Object.keys(ciudades).map((depName) => (
              <option key={depName} value={depName}>
                {depName}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            Por favor elegir un Departamento.
          </div>
        </div>

        <div >
          <label htmlFor="ciudad-select" className="form-label-register">
            Ciudad:
          </label>
          <select
            typeof='text'
            className="form-select"
            id="ciudad-select"
            value={ciudad}
            disabled={!departamento} // Deshabilitado hasta que el departamento esté seleccionado
            onChange={(e) => setCiudad(e.target.value)}
            required
          >
            <option value="">
              {departamento
                ? "-- Selecciona una ciudad --"
                : "-- Primero elige un departamento --"}
            </option>
            {listaCiudades.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Por favor elegir unidad ciudad</div>
        </div>
        

            <div className = 'div-terminos-register '>
          <input
            type="checkbox"
            id="terminos"
            name="terminos"
            required
            style={{ accentColor: 'white' }}
            checked={terminosAceptados}
            onChange={(e) => setTerminosAceptados(e.target.checked)}
          />
          <label htmlFor="terminos" style={{ marginLeft: '0.5rem' }}>
            <span style={{ color: 'black' }}>Acepto los </span>
            <a href='' style={{ color: 'red' }}><span   style={{ color: 'red' }}>Términos y Condiciones</span></a>
          </label>
        </div>

        <div>
          <button
            className='btn-continuar'
            type="submit"
            value="Continuar"
            disabled={!terminosAceptados}
          >
            Continuar
          </button>
        </div>
        </div>
        {/* <p>{name} {apellido} {telefono} {documento} {departamento} {ciudad}</p> */}
      </form>
      
    ); 
  } 