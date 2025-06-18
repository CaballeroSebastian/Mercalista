import React, { useState, useEffect} from 'react';
import './styles.css';
import '../Purchases/Purchases.css'
import papa from './img/papa.jpeg';
import Menu from '../LoggedNav/LoggedNav';
import PreviewSale from './PreviewSale'
import { useAuth } from '../../Context/AuthContext'; 
import axios from 'axios'



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

const Sales: React.FC = () => {
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);


  const { user } = useAuth();
  const backendUrl = "http://127.0.0.1:8000/";

  const idUsuario = user?.idusuario;

  
  useEffect(() => {
    if (!idUsuario) return;
    
    axios.get<Sale[]>(`${backendUrl}producto/misVentas/${idUsuario}`)
      .then(response => {
        setSales(response.data); // ✅ Directamente seteas los datos
      })
      .catch(error => {
        console.error("Error al obtener los productos:", error);
      });
  }, [idUsuario]);

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
              <div className="purchase-image-container ">
                <img src={`${backendUrl}media/${sale.imagen}`} alt={sale.producto} className="purchase-image" />
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
