import './OnSalePreview.css'
import productoImg from './img/producto.jpeg';
interface Producto {
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
    close: ()=> void
    datosProducto : Producto
}

const OnSalePreview = ({close, datosProducto}: Props) =>{

    return (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{datosProducto.nombre}</h2>
              <button className="close-button" onClick={close}>
                ×
              </button>
            </div>
    
            <div className="modal-content">
              <div className="product-info">
                <div className="info-row">
                  <span className="info-label">Categoría:</span>
                  <span className="info-value status-badge">{datosProducto.categoriaproducto}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Stock:</span>
                  <span className="info-value status-badge">
                    {datosProducto.cantidadstock} {datosProducto.unidadmedida}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Precio:</span>
                  <span className="info-value status-badge">{datosProducto.precio}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Estado:</span>
                  <span className="info-value status-badge">{datosProducto.estado}</span>
                </div>
              </div>
    
              <div className="photo-container">
                <div className="photo-wrapper">
                  <img src={productoImg || "/placeholder.svg"} alt={datosProducto.nombre} className="product-photo" />
                </div>
              </div>
    
              <div className="description-container">
                <h3>Descripción</h3>
                <p> {datosProducto.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      )
}

export default OnSalePreview