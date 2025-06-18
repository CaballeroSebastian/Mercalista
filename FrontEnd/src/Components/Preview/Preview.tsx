import './preview.css'
import productImg from '../Purchases/img/papa.jpeg'
import React from 'react'


interface Purchase {
  id: number;
  vendedor: string;
  producto: string;
  total: string;
  image: string;
  fecha?: string;
  ciudad?: string;
  telefono?: string;
  correo?: string;
  cantidad?: string;
  precioUnidad?: string;
  estado?: string; 
  unidadMedida?: string; 
}

interface PreviewProps {
    purchase: Purchase;
    onClose: () => void;
  }

const Preview : React.FC<PreviewProps> = ({ purchase, onClose }) =>{

  const backendUrl = 'http://127.0.0.1:8000/';
    
        return (
            <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
              <div className="modal-card">
                <div className="modal-header">
                  <div className="modal-title">MercaLista</div>
                  <button className="close-btn" onClick={onClose} aria-label="Cerrar modal">  &times;</button>
                </div>
                <div className="modal-row">
                  <div className="modal-info">
                    <div><b>Factura:</b> {purchase.id}</div>
                    <div><b>Fecha:</b> {purchase.fecha}</div>
                    <div><b>Método de pago:</b> <span style={{ fontWeight: 400 }}>Transaccion</span></div>
                  </div>
                  <div className="modal-product">
                    <div className="modal-product-title">{purchase.producto}</div>
                    <div className="modal-product-img-row">
                      <span className="modal-arrow">{'<'}</span>
                      <img src={`${backendUrl}media/${purchase.image}`} alt="Papa" className="modal-product-img" />
                      <span className="modal-arrow">{'>'}</span>
                    </div>
                  </div>
                </div>
                <hr className="modal-divider" />
                <div className="modal-section">
                  <div className="modal-section-title">Información del vendedor</div>
                  <div><b>Nombre:</b> {purchase.vendedor}</div>
                  <div><b>Ciudad:</b> {purchase.ciudad}</div>
                  <div><b>Teléfono:</b> {purchase.telefono}</div>
                  <div><b>Email:</b> {purchase.correo}</div>
                </div>
                <hr className="modal-divider" />
                <div className="modal-section">
                  <div className="modal-section-title">Detalles pedido</div>
                  <div className="modal-table">
                    <div className="modal-table-header">
                      <div>Producto</div>
                      <div>Cantidad</div>
                      <div>Precio U.</div>  
                      <div>Subtotal</div>
                      <div>Estado</div>
                    </div>
                    <div className="modal-table-row">
                      <div>{purchase.producto}</div>
                      <div>{purchase.cantidad}{purchase.unidadMedida}</div>
                      <div>{purchase.precioUnidad}</div>
                      <div>{purchase.total}</div>
                      <div>{purchase.estado}</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          );
}

export default Preview