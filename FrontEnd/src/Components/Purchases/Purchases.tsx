import React, { useState } from 'react';
import './Purchases.css';
import papa from './img/papa.jpeg';
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
      vendor: 'Sebastián',
      product: 'Papa pastusa maluca',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 2,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 3,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 4,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 5,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 6,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 7,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 8,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
    },
    {
      id: 9,
      vendor: 'Sebastián',
      product: 'Papá',
      date: '02/22/2025',
      total: '$20.000',
      image: papa,
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
