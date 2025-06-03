import { useState, useEffect } from "react";
import { Eye, PenSquare } from "lucide-react";
import "./OnSale.css";
import productoImg from './img/producto.jpeg';
import Menu from '../LoggedNav/LoggedNav';
import OnSalePreview from './OnSalePreview';
import Edit from './editModal/edit';
import axios from "axios";

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

const OnSale = () => {
  const [selectOnSale, setSelectOnSale] = useState<Producto | false>(false);
  const [openEdit, setOpenEdit] = useState<Producto | false>(false);
  const [productos, setProductos] = useState<Producto[]>([]);

  const idUsuario = 1

  useEffect(() => {
    axios.get<Producto[]>(`http://127.0.0.1:8000/producto/verProductos/${idUsuario}`)
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const selected = (producto: Producto) => {
    setSelectOnSale(producto);
  };

  const cerrar = () => {
    setSelectOnSale(false);
  };

//funciones para la ventana de editar
  const productToEdit = (producto: Producto) => {
    setOpenEdit(producto);
  };

  const closeEdit = () => {
    setOpenEdit(false);
  };
  

  return (
    <Menu>
      <div className="Onsale-container">
        <h1 className="venta-title">En Venta</h1>
        <div className="product-grid">
          {productos.map((producto) => (
            <div className="product-card" key={producto.idproducto}>
              <div className="product-image">
                <img src={producto.fotos} alt={producto.nombre} />
              </div>
              <div className="product-info">
                <h3 className="product-nombre">{producto.nombre}</h3>
                <p className="product-precio">${producto.precio}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => productToEdit(producto)} className="edit-button">
                  <PenSquare size={16} />
                  <span>Editar</span>
                </button>
                <button onClick={() => selected(producto)} className="view-button">
                  <Eye size={16} />
                  <span>Ver</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectOnSale && (
        <OnSalePreview close={cerrar} datosProducto={selectOnSale} />
      )}

      {openEdit && (
        <Edit cerrar={closeEdit} informacion={openEdit} />
      )}
    </Menu>
  );
};

export default OnSale;