import './preview.css'
import productImg from '../Purchases/img/papa.jpeg'
import React from 'react'


interface Purchase {
    id: number;
    vendor: string;
    product: string;
    date: string;
    total: string;
    image: string;
  }

interface PreviewProps {
    purchase: Purchase;
    onClose: () => void;
  }

const Preview : React.FC<PreviewProps> = ({ onClose }) =>{

    
        return (
            <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
              <div className="modal-card">
                <div className="modal-header">
                  <div className="modal-title">MercaLista</div>
                  <button className="close-btn" onClick={onClose} aria-label="Cerrar modal">  &times;</button>
                </div>
                <div className="modal-row">
                  <div className="modal-info">
                    <div><b>Factura:</b> MI-306</div>
                    <div><b>Fecha:</b> 5/03/2025</div>
                    <div><b>Método de pago:</b> <span style={{ fontWeight: 400 }}>Transaccion</span></div>
                  </div>
                  <div className="modal-product">
                    <div className="modal-product-title">Papa</div>
                    <div className="modal-product-img-row">
                      <span className="modal-arrow">{'<'}</span>
                      <img src={productImg} alt="Papa" className="modal-product-img" />
                      <span className="modal-arrow">{'>'}</span>
                    </div>
                  </div>
                </div>
                <hr className="modal-divider" />
                <div className="modal-section">
                  <div className="modal-section-title">Información del vendedor</div>
                  <div><b>Nombre:</b> Sebastian</div>
                  <div><b>Ciudad:</b> Bogota</div>
                  <div><b>Teléfono:</b> 31182489632</div>
                  <div><b>Email:</b> sebas@boboHpt.com</div>
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
                      <div>Papa</div>
                      <div>10KG</div>
                      <div>$10.000</div>
                      <div>$100.000</div>
                      <div>N/A</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          );
}

export default Preview