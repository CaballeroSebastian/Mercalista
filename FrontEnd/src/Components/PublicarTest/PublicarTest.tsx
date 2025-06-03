import Menu from '../LoggedNav/LoggedNav';
import './PublicarTest.css';
import type React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function ProductRegistrationForm() {
  const idUsuario = 1
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    stock: 0,
    UnidadMedida: "",
    Descripcion: "",
    estado: "",
    precio: 0,
    foto: "" // Aquí puedes guardar una URL o nombre de archivo
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));

    }     
  };

  const handleDeleteFile = () => {  
    setSelectedFile(null);
    setImagePreview("");
    setFormulario({ ...formulario, foto: "" });

    const fileInput = document.getElementById("photos") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //envia datos a la base de datos


    const formData = new FormData();
    formData.append("nombre", formulario.nombre);
    formData.append("categoria", formulario.categoria);
    formData.append("stock", String(formulario.stock));
    formData.append("UnidadMedida", formulario.UnidadMedida);
    formData.append("Descripcion", formulario.Descripcion);
    formData.append("estado", formulario.estado);
    formData.append("precio", String(formulario.precio));
    if (selectedFile) {
      formData.append("foto", selectedFile);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/producto/crearProducto/${idUsuario}`,
        formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    
      if (response.status === 201) {
        console.log(response.data.mensaje);
      }
    } catch (error: any) {
      if (error.response) {
        // El servidor respondió con un código fuera del rango 2xx
        console.error('Error:', error.response.data);
      } else if (error.request) {
        // La petición fue hecha pero no hubo respuesta
        console.error('No hubo respuesta del servidor');
      } else {
        // Otro error
        console.error('Error:', error.message);
      }
    }
    
     
    // Resetear formulario
    setFormulario({
      nombre: "",
      categoria: "",
      stock: 0,
      UnidadMedida: "",
      Descripcion: "",
      estado: "",
      precio: 0,
      foto: ""
    });

    setSelectedFile(null);
    setImagePreview("");

    // Resetear input de archivos
    const fileInput = document.getElementById("photos") as HTMLInputElement;
    if (fileInput) fileInput.value = "";


   

    // Redirigir
    navigate('/onSale');
  };


  return (
    <Menu>
      <div className="contenedor-publicar-producto">
        <h1 className="titulo-publicar-producto">Registrar producto</h1>

        <form id="form-publicar" onSubmit={enviar}>
          <div className="grid-publicar-producto">
            {/* Columna izquierda: información del producto */}
            <div className="columna-info-producto">
              <h2 className="subtitulo-publicar-producto">Información del producto</h2>

              <div className="grupo-campos-publicar">
                <div className="campo-publicar-producto">
                  <label htmlFor="productName" className="etiqueta-publicar-producto">
                    Nombre del producto
                  </label>
                  <input
                    id="productName"
                    className="entrada-publicar-producto"
                    type="text"
                    placeholder="Ingresa nombre"
                    value={formulario.nombre}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      (e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''))
                    }
                    onChange={(e) =>
                      setFormulario({ ...formulario, nombre: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="campo-publicar-producto">
                  <label htmlFor="quantity" className="etiqueta-publicar-producto">
                    Cantidad en stock
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    placeholder="Ingresa cantidad"
                    className="entrada-publicar-producto"
                    value={formulario.stock}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      (e.target.value = e.target.value.replace(/[^\d]/g, ''))
                    }
                    onChange={(e) =>
                      setFormulario({ ...formulario, stock: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>

                <div className="campo-publicar-producto">
                  <label htmlFor="description" className="etiqueta-publicar-producto">
                    Descripción <span className="texto-opcional-publicar">(Opcional)</span>
                  </label>
                  <textarea
                    id="description"
                    className="area-texto-publicar"
                    rows={3}
                    style={{ width: '100%', height: '100px', resize: 'none' }}
                    maxLength={1000}
                    value={formulario.Descripcion}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormulario({ ...formulario, Descripcion: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="campo-publicar-producto">
                  <label htmlFor="price" className="etiqueta-publicar-producto">
                    Precio
                  </label>
                  <div className="contenedor-precio-publicar">
                    <div className="simbolo-precio-publicar">$</div>
                    <input
                      id="price"
                      type="number"
                      className="entrada-precio-publicar"
                      required
                      inputMode="numeric"
                      value={formulario.precio}
                      min={0.01}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormulario({ ...formulario, precio: parseFloat(e.target.value) })
                      }
                    />
                    <div className="decimales-precio-publicar">.00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: categorías, unidad, estado, foto */}
            <div className="columna-categoria-fotos">
              <div className="grupo-campos-publicar">
                <div className="campo-publicar-producto">
                  <label htmlFor="category" className="etiqueta-publicar-producto">
                    Categoría del producto
                  </label>
                  <select
                    id="category"
                    className="selector-publicar-producto"
                    required
                    value={formulario.categoria}
                    onChange={(e) =>
                      setFormulario({ ...formulario, categoria: e.target.value })
                    }
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="frutas">Frutas</option>
                    <option value="legumbres">Legumbres</option>
                    <option value="cereales">Cereales o granos</option>
                    <option value="tuberculos">Tubérculos y raíces</option>
                    <option value="nueces">Nueces y semillas</option>
                    <option value="especias">Especias y hierbas</option>
                  </select>
                </div>

                <div className="campo-publicar-producto">
                  <label htmlFor="unit" className="etiqueta-publicar-producto">
                    Unidad de medida
                  </label>
                  <select
                    id="unit"
                    className="selector-publicar-producto"
                    required
                    value={formulario.UnidadMedida}
                    onChange={(e) =>
                      setFormulario({ ...formulario, UnidadMedida: e.target.value })
                    }
                  >
                    <option value="" disabled>Elegir...</option>
                    <option value="kg">Kilogramo (kg)</option>
                    <option value="toneladas">Toneladas</option>
                  </select>
                </div>

                <div className="campo-publicar-producto">
                  <label htmlFor="state" className="etiqueta-publicar-producto">
                    Estado <span className="texto-opcional-publicar">(Opcional)</span>
                  </label>
                  <select
                    id="state"
                    className="selector-publicar-producto"
                    value={formulario.estado}
                    onChange={(e) =>
                      setFormulario({ ...formulario, estado: e.target.value })
                    }
                  >
                    <option value="" disabled>Elegir...</option>
                    <option value="verde">Verde</option>
                    <option value="maduro">Maduro</option>
                  </select>
                </div>
              </div>

              {/* Sección de fotos */}
              <div className="seccion-fotos-publicar">
                <div className="encabezado-fotos-publicar">
                  <h2 className="subtitulo-publicar-producto">Tu foto</h2>
                  <span className="maximo-fotos-publicar">1 máximo</span>
                </div>

                <section className="contenedor-carga-fotos-publicar">
                  <label htmlFor="photos" className="etiqueta-elegir-foto-publicar">
                    <div className="boton-elegir-foto-publicar">Elegir foto</div>
                  </label>
                  <div className="info-archivos-publicar">
                    <div className="texto-examinar-publicar">Examinar...</div>
                    <div className="texto-seleccionados-publicar">
                      {selectedFile ? selectedFile.name : "No se ha seleccionado archivo."}
                    </div>

                    <input
                      id="photos"
                      type="file"
                      accept="image/*"
                      onChange={(e)=>{
                        handleFileChange(e)
                      }}
                      className="entrada-archivo-oculta-publicar"
                    />

                    {imagePreview && (
                      <div className="contenedor-previsualizaciones-publicar">
                        <div className="contenedor-miniatura-publicar">
                          <img
                            src={imagePreview}
                            alt="Vista previa"
                            className="imagen-miniatura-publicar"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <button
                  className="boton-eliminar-datos-publicar"
                  type="button"
                  onClick={handleDeleteFile}
                >
                  Eliminar Foto
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="contenedor-boton-publicar-producto">
          <button className="boton-publicar-producto" type="submit" form="form-publicar">
            Publicar producto
          </button>
        </div>

      </div>
    </Menu>
  );
}
}
