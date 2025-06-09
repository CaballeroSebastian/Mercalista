import './modalCard.css'
import {useState} from 'react'
import productoImg from '../../assets/Image/ImgVerduras.jpeg'
import './modalCard.css'

interface Product {
    idproducto: number;
    nombre: string;
    precio: number;
    cantidadstock: number;
    fotos: string | null;
    categoriaproducto: string;
}

interface ModalProps {
    close: ()=>void
    data: Product | any
}

const ModalProductCard = ({close, data}: ModalProps) =>{

    return (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{data.nombre}</h2>
              <button className="close-button" onClick={close}>
                ×
              </button>
            </div>
    
            <div className="modal-content">
              <div className="product-info">
                <div className="info-row">
                  <span className="info-label">Categoría:</span>
                  <span className="info-value status-badge">{data.categoriaproducto || "Sin categoría"}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Stock:</span>
                  <span className="info-value status-badge">
                    {data.cantidadstock} kg
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Precio:</span>
                  <span className="info-value status-badge">{data.precio}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Estado:</span>
                  <span className="info-value status-badge">{data.estado || "Sin estado"}</span>
                </div>
              </div>
    
              <div className="photo-containerPrew">
                <div className="photo-wrapperPrew">
                  <img
                    src={
                      data.fotos
                        ? (data.fotos.startsWith('http')
                            ? data.fotos
                            : `http://127.0.0.1:8000/media/producto/${data.fotos}`)
                        : productoImg
                    }
                    alt={data.nombre}
                    className="product-photo"
                  />
                </div>
              </div>
    
              <div className="description-container">
                <h3>Descripción</h3>
                <p>{data.descripcion || "Sin descripción"}</p>
              </div>
                <button className="ComprarPrewCaja">Añadir al Carrito</button>
              
            </div>
          </div>
        </div>
      )

}

export default ModalProductCard