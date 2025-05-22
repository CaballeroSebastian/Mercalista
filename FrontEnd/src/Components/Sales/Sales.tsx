import React, { useState } from 'react';
import './styles.css';
import papa from './img/papa.jpeg';
import Menu from '../LoggedNav/LoggedNav';
import PreviewSale from './PreviewSale'



interface Sale {
  id?: number;
  comprador?: string;
  producto?: string;
  fecha?: string;
  direccion?: string;
  cantidad?: string;
  total?: string;
  metodoPago?: string;
  pedidoId?: string;
  telefono?: string;
  email?: string;
  precioUnidad?: string;
  estado?: string;
  imagen?: string;
}

const Sales: React.FC = () => {
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const sales: Sale[] = [
    {
      id: 1,
      comprador: 'Sebastián',
      producto: 'Papa pastusa maluca',
      fecha: '02/22/2025',
      direccion: "Pereira, Risaralda",
      cantidad: "100000",
      total: '$20.000',
      metodoPago: "transaccion",
      pedidoId: "1",
      telefono: "3118074248",
      email:"brayan@gmail.com",
      precioUnidad:"10.000",
      estado: "Maduro",
      imagen: papa,
    },
    {
      id: 2,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
    {
      id: 3,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
    {
      id: 4,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
    {
      id: 5,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
    {
      id: 6,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
    {
      id: 7,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
    {
      id: 8,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
    {
      id: 9,
      comprador: 'Sebastián',
      producto: 'Papá',
      fecha: '02/22/2025',
      total: '$20.000',
      imagen: papa,
    },
  ];

  const openModal = (sale: Sale) => {
    setSelectedSale(sale);
  };

  const closeModal = () => {
    setSelectedSale(null);
  };

  return (
    <Menu>
      <div className="sales-container">
        <h1 className="sales-title">Mis ventas</h1>

        {/* Contenedor con grid que organiza las tarjetas */}
        <div className="sale-card-container">
          {sales.map((sale) => (
            <div
              className="sale-card"
              key={sale.id}
              onClick={() => openModal(sale)}
            >
              <div className="sale-imagen-container">
                <img src={sale.imagen} alt={sale.producto} className="sale-imagen" />
              </div>

              <div className="sale-details">
                <div className="sale-row">
                  <div className="sale-label">
                    Cliente: <span className="sale-value">{sale.comprador}</span>
                  </div>
                  <div className="sale-fecha">
                    Fecha: <span className="sale-value">{sale.fecha}</span>
                  </div>
                </div>

                <div className="sale-row">
                  <div className="sale-label">
                    productoo: <span className="sale-value">{sale.producto}</span>
                  </div>
                  <div className="sale-total">
                    Total: <span className="sale-value">{sale.total}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSale && (
        <PreviewSale datosVenta={selectedSale} onClose={closeModal} />
      )}
    </Menu>
  );
};

export default Sales;
