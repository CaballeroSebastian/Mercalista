import React, { useState, useEffect } from 'react';
import './Purchases.css';
import Menu from '../LoggedNav/LoggedNav';
import Preview from '../Preview/Preview';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios'

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

const Purchases: React.FC = () => {
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const { user } = useAuth();
  const backendUrl = 'http://127.0.0.1:8000/';
  const Usuario = user?.idusuario;
  

  useEffect(() => {

    axios.get<Purchase[]>(`${backendUrl}producto/verCompras/${Usuario}`)
      .then(response => setPurchases(response.data))
      .catch(error => console.error("Error al obtener compras:", error));
  }, [user]);

  const openModal = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
  };

  const closeModal = () => {
    setSelectedPurchase(null);
  };

  return (
    <Menu>
      <div className="purchases-container">
        <h1 className="purchases-title">Mis compras</h1>

        {/* Contenedor con grid que organiza las tarjetas */}
        <div className="purchase-card-container">
          {purchases.map((purchase) => (
            <div
              className="purchase-card"
              key={purchase.id}
              onClick={() => openModal(purchase)}
            >
              <div className="purchase-image-container">
                <img src={purchase.image} alt={purchase.producto} className="purchase-image" />
              </div>

              <div className="purchase-details">
                <div className="purchase-row">
                  <div className="purchase-label">
                    Vendedor: <span className="purchase-value">{purchase.vendedor}</span>
                  </div>
                  <div className="purchase-date">
                    Fecha: <span className="purchase-value">{purchase.fecha}</span>
                  </div>
                </div>

                <div className="purchase-row">
                  <div className="purchase-label">
                    Producto: <span className="purchase-value">{purchase.producto}</span>
                  </div>
                  <div className="purchase-total">
                    Total: <span className="purchase-value">{purchase.total}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPurchase && (
        <Preview purchase={selectedPurchase} onClose={closeModal} />
      )}
    </Menu>
  );
};

export default Purchases;
