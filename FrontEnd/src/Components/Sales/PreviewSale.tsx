import './PreviewSale.css'
import { useState } from "react"
import "./PreviewSale.css"
import {
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingBag,
  DollarSign,
} from "lucide-react"


interface Sale {
    id?: number;
    comprador?: string;
    producto?: string;
    fecha?: string;
    direccion?: string;
    cantidad?: string;
    total?: string;
    pedidoId?: string;
    telefono?: string;
    email?: string;
    precioUnidad?: string;
    estado?: string;
    imagen?: string;
  }



  interface SalesHistoryModalProps {
    onClose: () => void
    datosVenta: Sale
  }

const PreviewSale = ({ onClose, datosVenta }:SalesHistoryModalProps) => {
    const [activeTab, setActiveTab] = useState<"details" | "buyer">("details")
  
    const backendUrl = "http://127.0.0.1:8000/";

  
    return (
      <div className="sales-modal-overlay">
        <div className="sales-modal-container">
          <div className="sales-modal-header">
            <div className="sales-modal-title">
              <h2>MercaLista</h2>
              <span className="sales-modal-subtitle">Detalles de la venta</span>
            </div>
            <button className="sales-modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
  
          <div className="sales-modal-content">
            <div className="sales-modal-product-section">
              <div className="sales-modal-product-image-container">
                <button className="sales-modal-nav-button left">
                  <ChevronLeft size={20} />
                </button>
                <div className="sales-modal-product-image">
                  <img src={`${backendUrl}media/${datosVenta.imagen || "/placeholder.svg"}`} alt={datosVenta.producto} />
                </div>
                <button className="sales-modal-nav-button right">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="sales-modal-product-name">{datosVenta.producto}</div>
            </div>
  
            <div className="sales-modal-tabs">
              <button
                className={`sales-modal-tab-button ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Detalles de la venta
              </button>
              <button
                className={`sales-modal-tab-button ${activeTab === "buyer" ? "active" : ""}`}
                onClick={() => setActiveTab("buyer")}
              >
                Información del comprador
              </button>
            </div>
  
            {activeTab === "details" && (
              <div className="sales-modal-details">
                <div className="sales-modal-detail-row">
                  <div className="sales-modal-detail-item">
                    <div className="sales-modal-detail-icon">
                      <FileText size={18} />
                    </div>
                    <div className="sales-modal-detail-content">
                      <span className="sales-modal-detail-label">Factura</span>
                      <span className="sales-modal-detail-value">{datosVenta.pedidoId}</span>
                    </div>
                  </div>
                  <div className="sales-modal-detail-item">
                    <div className="sales-modal-detail-icon">
                      <Calendar size={18} />
                    </div>
                    <div className="sales-modal-detail-content">
                      <span className="sales-modal-detail-label">Fecha</span>
                      <span className="sales-modal-detail-value">{datosVenta.fecha}</span>
                    </div>
                  </div>
                </div>
  
                <div className="sales-modal-detail-row">
                  <div className="sales-modal-detail-item">
                    <div className="sales-modal-detail-icon">
                      <CreditCard size={18} />
                    </div>
                    <div className="sales-modal-detail-content">
                      <span className="sales-modal-detail-label">Método de pago</span>
                      <span className="sales-modal-detail-value">Transaccion</span>
                    </div>
                  </div>
                  <div className="sales-modal-detail-item">
                    <div className="sales-modal-detail-icon">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="sales-modal-detail-content">
                      <span className="sales-modal-detail-label">Cantidad</span>
                      <span className="sales-modal-detail-value">{datosVenta.cantidad}</span>
                    </div>
                  </div>
                </div>
  
                <div className="sales-modal-detail-row">
                  <div className="sales-modal-detail-item">
                    <div className="sales-modal-detail-icon">
                      <DollarSign size={18} />
                    </div>
                    <div className="sales-modal-detail-content">
                      <span className="sales-modal-detail-label">Precio unitario</span>
                      <span className="sales-modal-detail-value">{datosVenta.precioUnidad}</span>
                    </div>
                  </div>
                  <div className="sales-modal-detail-item">
                    <div className="sales-modal-detail-icon">
                      <DollarSign size={18} />
                    </div>
                    <div className="sales-modal-detail-content">
                      <span className="sales-modal-detail-label">Total</span>
                      <span className="sales-modal-detail-value highlight">{datosVenta.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {activeTab === "buyer" && (
              <div className="sales-modal-buyer-info">
                <div className="sales-modal-buyer-header">
                  <div className="sales-modal-buyer-avatar">{datosVenta.comprador?.charAt(0)}</div>
                  <div className="sales-modal-buyer-name">{datosVenta.comprador}</div>
                </div>
  
                <div className="sales-modal-buyer-details">
                  <div className="sales-modal-buyer-detail-item">
                    <div className="sales-modal-buyer-detail-icon">
                      <Phone size={18} />
                    </div>
                    <div className="sales-modal-buyer-detail-content">
                      <span className="sales-modal-buyer-detail-label">Teléfono</span>
                      <span className="sales-modal-buyer-detail-value">{datosVenta.telefono}</span>
                    </div>
                  </div>
  
                  <div className="sales-modal-buyer-detail-item">
                    <div className="sales-modal-buyer-detail-icon">
                      <Mail size={18} />
                    </div>
                    <div className="sales-modal-buyer-detail-content">
                      <span className="sales-modal-buyer-detail-label">Email</span>
                      <span className="sales-modal-buyer-detail-value">{datosVenta.email}</span>
                    </div>
                  </div>
  
                  <div className="sales-modal-buyer-detail-item">
                    <div className="sales-modal-buyer-detail-icon">
                      <MapPin size={18} />
                    </div>
                    <div className="sales-modal-buyer-detail-content">
                      <span className="sales-modal-buyer-detail-label">Dirección</span>
                      <span className="sales-modal-buyer-detail-value">{datosVenta.direccion}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            <div className="sales-modal-summary">
              <div className="sales-modal-summary-table">
                <div className="sales-modal-summary-header">
                  <div className="sales-modal-summary-cell">Producto</div>
                  <div className="sales-modal-summary-cell">Cantidad</div>
                  <div className="sales-modal-summary-cell">Precio U.</div>
                  <div className="sales-modal-summary-cell">Subtotal</div>
                  <div className="sales-modal-summary-cell">Estado</div>
                </div>
                <div className="sales-modal-summary-row">
                  <div className="sales-modal-summary-cell">{datosVenta.producto}</div>
                  <div className="sales-modal-summary-cell">{datosVenta.cantidad}</div>
                  <div className="sales-modal-summary-cell">{datosVenta.precioUnidad}</div>
                  <div className="sales-modal-summary-cell">{datosVenta.total}</div>
                  <div className="sales-modal-summary-cell">
                    <span className={`sales-modal-status-badge ${datosVenta.estado}`}>
                      {datosVenta.estado === "Verde" ? "Verde" : datosVenta.estado === "Maduro" ? "Maduro" : "Sin estado"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="sales-modal-footer">
            <button className="sales-modal-action-button primary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
}

export default PreviewSale