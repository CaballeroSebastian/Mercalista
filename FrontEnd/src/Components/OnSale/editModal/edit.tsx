import {useState} from 'react'
import type React from "react"
import { X, Upload, Edit3, Trash2, Save } from "lucide-react"
import './editModal.css'

interface informacion {
    idproducto: number;
    nombre: string;
    categoriaproducto?: string;
    cantidadstock?: number;
    precio: string;
    descripcion?: string;
    estado?: string;
    fotos: string;
    unidadmedida?: string;
    
  }

interface Props{
    cerrar: ()=> void,
    informacion: informacion
    
    
}

const Edit =({cerrar, informacion}: Props)=>{

    const onDelete = () =>{

    }
    const onSave = (data: any) =>{
        console.log(`informacion guardada correctamente: ${data}`)
    }

    const [formData, setFormData] = useState({
        nombre: informacion?.nombre || "",
        categoriaproducto: informacion?.categoriaproducto || "",
        cantidadstock: informacion?.cantidadstock || 0,
        unidadmedida: informacion?.unidadmedida || "",
        descripcion: informacion?.descripcion || "",
        estado: informacion?.estado || "",
        precio: informacion?.precio || 0,
        foto: informacion?.fotos || "",
      })
    
      const [imagePreview, setImagePreview] = useState(informacion?.fotos || "")
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
          ...prev,
          [name]: name === "cantidadstock" || name === "precio" ? Number(value) : value,
        }))
      }
    
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result as string
            setImagePreview(result)
            setFormData((prev) => ({ ...prev, foto: result }))
          }
          reader.readAsDataURL(file)
        }
      }
    
      const handleSave = () => {
        onSave?.(formData)
        cerrar()
      }
    
      const handleDelete = () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este informacion?")) {
          onDelete?.()
          cerrar()
        }
      }
    
    
      return (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-title">
                <Edit3 className="title-icon" />
                <h2>Editar informacion</h2>
              </div>
              <button className="close-button" onClick={cerrar}>
                <X size={24} />
              </button>
            </div>
    
            <div className="modal-content">
              <div className="form-grid">
                <div className="form-section">
                  <div className="input-group">
                    <label htmlFor="nombre">Nombre del informacion</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ingrese el nombre del informacion"
                    />
                  </div>
    
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="categoriaproducto">Categoría</label>
                      <select
                        id="categoriaproducto"
                        name="categoriaproducto"
                        value={formData.categoriaproducto}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="frutas">Frutas</option>
                        <option value="verduras">Verduras</option>
                        <option value="granos">Granos</option>
                        <option value="lacteos">Lácteos</option>
                        <option value="carnes">Carnes</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
    
                    <div className="input-group">
                      <label htmlFor="estado">Estado</label>
                      <select id="estado" name="estado" value={formData.estado} onChange={handleInputChange}>
                        <option value="">Seleccionar estado</option>
                        <option value="disponible">Disponible</option>
                        <option value="agotado">Agotado</option>
                        <option value="descontinuado">Descontinuado</option>
                      </select>
                    </div>
                  </div>
    
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="cantidadstock">Cantidad en Stock</label>
                      <input
                        type="number"
                        id="cantidadstock"
                        name="cantidadstock"
                        value={formData.cantidadstock}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="0"
                      />
                    </div>
    
                    <div className="input-group">
                      <label htmlFor="unidadmedida">Unidad de Medida</label>
                      <select
                        id="unidadmedida"
                        name="unidadmedida"
                        value={formData.unidadmedida}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar unidad</option>
                        <option value="kg">Kilogramos</option>
                        <option value="g">Gramos</option>
                        <option value="lb">Libras</option>
                        <option value="unidad">Unidad</option>
                        <option value="litros">Litros</option>
                        <option value="ml">Mililitros</option>
                      </select>
                    </div>
                  </div>
    
                  <div className="input-group">
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
    
                  <div className="input-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      placeholder="Describe las características del informacion..."
                      rows={4}
                    />
                  </div>
                </div>
    
                <div className="image-section">
                  <label className="image-label">Imagen del informacion</label>
                  <div className="image-upload-container">
                    {imagePreview ? (
                      <div className="image-preview">
                        <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                        <div className="image-overlay">
                          <label htmlFor="foto" className="change-image-btn">
                            <Upload size={20} />
                            Cambiar imagen
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label htmlFor="foto" className="upload-placeholder">
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
    
            <div className="modal-footer">
              <button className="btn-secondary" onClick={cerrar}>
                Cancelar
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                <Trash2 size={18} />
                Eliminar
              </button>
              <button className="btn-primary" onClick={handleSave}>
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