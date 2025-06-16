import React, { useState } from 'react';
import './Purchases.css';
import papa from './img/papa.jpeg';
import uva from './img/image.png';
import fresa from './img/fresa.png';
import Menu from '../LoggedNav/LoggedNav';
import Preview from '../Preview/Preview';

interface Purchase {
  id: number;
  vendor: string;
  product: string;
  date: string;
  total: string;
  image: string;
}

const Purchases: React.FC = () => {
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  const purchases: Purchase[] = [
    {
      id: 1,
      vendor: 'Brayan Fruits',
      product: 'Uva verde sin pepa', 
      date: '04/10/2025',
      total: '$10.650',
      image: uva,
    },
    {
      id: 2,
      vendor: 'JuliaPAPAS',
      product: 'Papá pastusa',
      date: '02/22/2025',
      total: '$120.000',
      image: papa,
    },
    {
      id: 3,
      vendor: 'Samuel Alvarez',
      product: 'Freza orgánica',
      date: '10/04/2025',
      total: '$20.000',
      image: fresa,
    },
  ];

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
                <img src={purchase.image} alt={purchase.product} className="purchase-image" />
              </div>

              <div className="purchase-details">
                <div className="purchase-row">
                  <div className="purchase-label">
                    Vendedor: <span className="purchase-value">{purchase.vendor}</span>
                  </div>
                  <div className="purchase-date">
                    Fecha: <span className="purchase-value">{purchase.date}</span>
                  </div>
                </div>

                <div className="purchase-row">
                  <div className="purchase-label">
                    Producto: <span className="purchase-value">{purchase.product}</span>
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
