import { Link, Navigate, useNavigate } from 'react-router-dom';
import ciudades from './ciudades';
import { useState } from 'react';
import React from 'react';

export function FormRegister() {

  const [terminosAceptados, setTerminosAceptados] = useState(false);

  const Navigate = useNavigate()
  
  const [name, Setname] = useState('')
  const [apellido, Setapellido] = useState('')
  const [telefono, Settelefono] = useState('')
  const [documento, Setdocumento] = useState('')

    // Estado para el departamento y la ciudad seleccionados
  const [departamento, setDepartamento] = useState('');
  const [listaCiudades, setListaCiudades] = useState([]);
  const [ciudad, setCiudad] = useState('');

    //Función para resetar campos de entrada del formulario

  const resetForm = () => {
    Setname('')
    Setapellido('')
    Settelefono('')
    Setdocumento('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Navigate('/RegisterPassword')
    resetForm()
  }

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
      <form className="form-register" onSubmit={handleSubmit}>
        <div className='div-form-register'>
        <label htmlFor="name">Nombre:</label>
        <input 
        type="text" 
        id="name" 
        name="name" 
        value = {name}
        onChange={(e)=>Setname(e.target.value)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''))}
        required
        
        />
        <br />
        <label htmlFor="apellido">Apellido:</label>
        <input 
          type="text" 
          id="apellido" 
          name="apellido" 
          value = {apellido}
          onChange={(e)=>Setapellido(e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''))}
          required
          />
        <br />
        <label htmlFor="telefono">Telefono:</label>
        <input 
          type="number" 
          id="telefono" 
          name="telefono" 
          value = {telefono}
          onChange={(e)=>Settelefono(e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value.replace(/^3\d{10}$/g, ''))}
          required
          />
        <br />
        <label htmlFor="documento">Documento:</label>
        <input 
          type="number" 
          id="documento" 
          name="documento"
          value = {documento}
          onChange={(e)=>Setdocumento(e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>)=> (e.target.value = e.target.value.replace(/^\d{11}$/g, ''))}
          required
        />
        <br />
        <div >
          <label htmlFor="dep-select" className="form-label">
            {" "}
            Departamento:
          </label>
          <select
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
          <label htmlFor="ciudad-select" className="form-label">
            Ciudad:
          </label>
          <select
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