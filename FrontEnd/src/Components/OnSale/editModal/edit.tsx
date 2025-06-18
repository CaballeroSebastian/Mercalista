import {useState} from 'react'
import type React from "react"
import axios from 'axios'
import { X, Upload, Edit3, Trash2, Save } from "lucide-react"
import './editModal.css'
import { useAuth } from '../../../Context/AuthContext'; 


interface informacion {
    idproducto: number;
    nombre: string;
    categoriaproducto?: string;
    cantidadstock?: number;
    precio: string;
    descripcion?: string;
    estado?: string;
    fotos: string | File;
    unidadmedida?: string;
    
  }

interface Props{
    cerrar: ()=> void,
    informacion: informacion
    
    
}

const Edit =({cerrar, informacion}: Props)=>{
  
    const backendUrl = "http://127.0.0.1:8000/";
    const { user, accessToken, logout } = useAuth();
    const Usuario = user?.idusuario ?? '';

    const onDelete = async(pk: number) =>{
      try{
        const response = await axios.delete(`${backendUrl}/producto/eliminarProducto/${pk}`)
        alert("Producto eliminado exitosamente");
      }
      catch (error){
        console.log('error al eliminar el producto:', error)
        alert('hubo un error al eliminar el producto')
      }
    };

    const onSave = async (data: any) =>{
      
      try{

        const formDataToSend = new FormData();
        formDataToSend.append('idProducto', data.idProducto.toString());
        formDataToSend.append('nombre', data.nombre);
        formDataToSend.append('categoriaproducto', data.categoriaproducto);
        formDataToSend.append('cantidadstock', data.cantidadstock.toString());
        formDataToSend.append('unidadmedida', data.unidadmedida);
        formDataToSend.append('descripcion', data.descripcion);
        formDataToSend.append('estado', data.estado);
        formDataToSend.append('precio', data.precio.toString());
          if (data.fotos) {
            formDataToSend.append('fotos', data.fotos);
          }

        const response = await axios.patch(`${backendUrl}producto/actualizarProducto/${Usuario}`, formDataToSend,{
          headers:{
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          }
        })
        console.log('respuesta del servidor: ', response)
        console.log(`informacion guardada correctamente: ${data}`)
      }catch(error: any){
        console.error("Detalles del error:", error.response?.data || error.message);
        alert('hubo un problema al guardar la informacion')
      }
        
    }
    
    const [formData, setFormData] = useState({
        idProducto: informacion?.idproducto,
        nombre: informacion?.nombre || "",
        categoriaproducto: informacion?.categoriaproducto || "",
        cantidadstock: informacion?.cantidadstock || 0,
        unidadmedida: informacion?.unidadmedida || "",
        descripcion: informacion?.descripcion || "",
        estado: informacion?.estado || "",
        precio: informacion?.precio || 0,
        fotos: informacion?.fotos || "",
      })
    
    
      const [imagePreview, setImagePreview] = useState<string>(
        informacion?.fotos ? `${backendUrl}media/${informacion.fotos}` : "/placeholder.svg"
      );
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
          ...prev,
          [name]: name === "cantidadstock" || name === "precio" ? Number(value) : value,
        }))
      }
    
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          // Actualiza el estado con el File
          setFormData(prev => ({
            ...prev,
            fotos: file
          }));
      
          // Genera la URL local de la imagen para el preview
          const previewURL = URL.createObjectURL(file);
          setImagePreview(previewURL);
        }
      };
      
    
      const handleSave  =  () => {
        onSave?.(formData)
        cerrar()
      }
    
      const handleDelete = () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este informacion?")) {
          onDelete?.(informacion.idproducto)
          cerrar()
        }
      }
    
    
      return (
        <div className="product-edit-overlay">
          <div className="product-edit-container">
            <div className="product-edit-header">
              <div className="product-edit-title">
                <Edit3 className="product-edit-title-icon" />
                <h2>Editar Producto</h2>
              </div>
              <button className="product-edit-close-button" onClick={cerrar}>
                <X size={24} />
              </button>
            </div>
    
            <div className="product-edit-content">
              <div className="product-edit-form-grid">
                <div className="product-edit-form-section">
                  <div className="product-edit-input-group">
                    <label htmlFor="nombre">Nombre del Producto</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ingrese el nombre del producto"
                    />
                  </div>
    
                  <div className="product-edit-input-row">
                    <div className="product-edit-input-group">
                      <label htmlFor="categoriaproducto">Categoría</label>
                      <select
                        id="categoriaproducto"
                        name="categoriaproducto"
                        value={formData.categoriaproducto}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="frutas">Frutas</option>
                        <option value="legumbres">legumbres</option>
                        <option value="verduras">verduras</option>
                        <option value="tuberculos">tuberculos</option>
                        <option value="nueces">nueces</option>
                        <option value="especias">Otros</option>
                      </select>
                    </div>
    
                    <div className="product-edit-input-group">
                      <label htmlFor="estado">Estado</label>
                      <select id="estado" name="estado" value={formData.estado} onChange={handleInputChange}>
                        <option value="Sin tipo">Sin tipo</option>
                        <option value="Verde">Verde</option>
                        <option value="Maduro">Maduro</option>
                        
                      </select>
                    </div>
                  </div>
    
                  <div className="product-edit-input-row">
                    <div className="product-edit-input-group">
                      <label htmlFor="cantidadstock">Cantidad en Stock</label>
                      <input
                        type="number"
                        id="cantidadstock"
                        name="cantidadstock"
                        value={formData.cantidadstock}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>
    
                    <div className="product-edit-input-group">
                      <label htmlFor="unidadmedida">Unidad de Medida</label>
                      <select
                        id="unidadmedida"
                        name="unidadmedida"
                        value={formData.unidadmedida}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Elegir...</option>
                        <option value="kilogramos">kilogramos</option>
                        <option value="tonelada">Tonelada</option>
                        <option value="Carga">Carga</option>
                        <option value="arroba">arroba</option>
                      </select>
                    </div>
                  </div>
    
                  <div className="product-edit-input-group">
                    <label htmlFor="precio">Precio ($)</label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      value={formData.precio}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
    
                  <div className="product-edit-input-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      placeholder="Describe las características del producto..."
                      rows={4}
                    />
                  </div>
                </div>
    
                <div className="product-edit-image-section">
                  <label className="product-edit-image-label">Imagen del Producto</label>
                  <div className="product-edit-image-upload-container">
                    {imagePreview ? (
                      <div className="product-edit-image-preview">
                        <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                        <div className="product-edit-image-overlay">
                          <label htmlFor="foto" className="product-edit-change-image-btn">
                            <Upload size={20} />
                            Cambiar imagen
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label htmlFor="foto" className="product-edit-upload-placeholder">
                        <Upload size={32} />
                        <span>Subir imagen</span>
                        <small>PNG, JPG hasta 5MB</small>
                      </label>
                    )}
                    <input
                      type="file"
                      id="foto"
                      name="foto"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
    
            <div className="product-edit-footer">
              <button className="product-edit-btn-secondary" onClick={cerrar}>
                Cancelar
              </button>
              <button className="product-edit-btn-danger" onClick={handleDelete}>
                <Trash2 size={18} />
                Eliminar
              </button>
              <button className="product-edit-btn-primary" onClick={handleSave}>
                <Save size={18} />
                Guardar Cambios
              </button>
            </div>
          </div>
    
        </div>
      )
   
}

export default Edit

// const prductoArray = [informacion]
// return(
//     <>
       
//     </>
// )


