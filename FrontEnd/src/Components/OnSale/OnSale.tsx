import { Eye } from "lucide-react"
import { PenSquare } from "lucide-react"
import {useState} from 'react'
import "./OnSale.css"
import productoImg from './img/producto.jpeg';
import Menu from '../LoggedNav/LoggedNav';
import OnSalePreview from './OnSalePreview'
import Edit from './editModal/edit'

interface Producto{
    id: number,
    nombre: string,
    categoria?: string,
    stock?: number,
    UnidadMedida?: string,
    Descripcion?: string,
    precio: string,
    estado?: string,
    foto: string
}

const ProductCard = () => {
    const [selectOnSale, setSelectOnSale] = useState<Producto | false>(false)
    const [openEdit, setOpenEdit] = useState<Producto | false>(false)


    const productos: Producto[] =[
    {
        id: 1,
        nombre: "Papa",
        categoria: "tuberculos",
        stock: 2.300,
        UnidadMedida: "KG",
        Descripcion: "papa cultivada con el amor de mamá",
        estado: "madura",
        precio: "2.00", 
        foto:productoImg
    },

    {
        id: 2,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },

    {
        id: 3,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },

    {
        id: 4,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },

    {
        id: 6,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 7,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 8,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 9,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 10,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 11,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 12,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 13,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 14,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 15,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 16,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    {
        id: 17,
        nombre: "Papa",
        precio: "2.00", 
        foto:productoImg
    },
    ]
    //funciones para ver el producto
    const selected = (producto: Producto) =>{
        setSelectOnSale(producto)
    }

    const cerrar = () =>{
        setSelectOnSale(false)
    }

    //funciones para editar producto
    const productToEdit = (prodcuto: Producto)=>{
        setOpenEdit(prodcuto)
    }

    const closeEdit =()=>{
        setOpenEdit(false)
    }

  return (
    <Menu>
        <div className="Onsale-container">
            <h1 className="venta-title">En Venta</h1>
            <div className="product-grid">
                {productos.map((producto)=>(
                    <div className="product-card" key={producto.id}>
                        <div className="product-image">
                            <img src={producto.foto} alt={producto.nombre} />
                        </div>
                        <div className="product-info">
                            <h3 className="product-nombre">{producto.nombre}</h3>
                            <p className="product-precio">${producto.precio}</p>
                        </div>
                        <div className="product-actions">
                            <button onClick={()=> productToEdit(producto)} className="edit-button">
                            <PenSquare size={16} />
                            <span>Editar</span>
                            </button>
                            <button onClick={()=> selected(producto)}  className="view-button">
                            <Eye size={16} />
                            <span>Ver</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {selectOnSale &&(
            <OnSalePreview close = {()=> cerrar()} datosProducto ={selectOnSale}/>
        )}

        {openEdit &&(
            <Edit cerrar ={()=> closeEdit()} informacion={openEdit} />
        )}

    </Menu>
  )
}

export default ProductCard
