import { useState, useEffect } from "react";
import { Eye, PenSquare } from "lucide-react";
import "./OnSale.css";
import productoImg from './img/producto.jpeg';
import Menu from '../LoggedNav/LoggedNav';
import OnSalePreview from './OnSalePreview';
import Edit from './editModal/edit';
import axios from "axios";
import { useAuth } from '../../Context/AuthContext';

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

  //variable para traer usuario global
  const { user } = useAuth();
  const backendUrl = "http://127.0.0.1:8000/";

  // const Usuario = user?.idusuario ?? '';
  // console.log(Usuario)
  const Usuario = 35

  useEffect(() => {
    axios.get<Producto[]>(`${backendUrl}producto/verProductos/${Usuario}`)
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
                <img 
                  src={`${backendUrl}media/${producto.fotos}`}
                  alt={producto.nombre}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = productoImg;
                    console.log('Error al cargar imagen:', producto.fotos);
                  }}
                />
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