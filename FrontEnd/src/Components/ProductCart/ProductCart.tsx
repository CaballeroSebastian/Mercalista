import React, { useState, useEffect } from 'react';
import './ProductCart.css';
import ModalProductCard from './modalCard'

interface Product {
    idproducto: number;
    nombre: string;
    precio: number;
    cantidadstock: number;
    fotos: string | null;
    categoriaproducto: string;
    descripcion: string;
}

const ProductCart = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    //estados ventana modal
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Product | false>(false)

    //funcion para determina que producto abrira la ventana modal
    const OpenCard = (producto: Product) =>{
        setSelectedCard(producto)
    }

    const Cerrar = () =>{
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/productos/');
                if (!response.ok) throw new Error('Error al cargar productos');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error:', err);
                setError('No se pudieron cargar los productos.');
            }
        };

        fetchData();
    }, []);

    return (
        <section className="productos-carts">
            <div className="contenedor">
                <h3 className="tituloPrew">Productos</h3>
                <div className="contenedor-cards">
                    {error ? (
                        <p>{error}</p>
                    ) : products.length === 0 ? (
                        <p>Cargando productos...</p>
                    ) : (
                        products.map(product => {
                            const imagenUrl = product.fotos
                                ? (product.fotos.startsWith('http')
                                    ? product.fotos
                                    : `http://127.0.0.1:8000/media/producto/${product.fotos}`)  // Aquí está la corrección
                                : null; 

                            return (
                                <a href="#" className="producto-carts" key={product.idproducto} onClick={()=> {OpenCard(product); Cerrar()} }> 
                                    <div className="thumb" >
                                        {imagenUrl ? (
                                            <img src={imagenUrl} alt={product.nombre} />
                                        ) : (
                                            <div className="no-image">No img</div>
                                        )}
                                    </div>
                                    <div className="informacion-productoPrew">
                                        <p className="nombrePrew">{product.nombre}</p>
                                        <p className="CategoriaPrew">{product.categoriaproducto}</p>                                        
                                        <p className="descripcionPrew">{product.descripcion || "Sin descripción"}</p>
                                        <p className="precioPrew">${product.precio}</p>                                    
                                    </div>
                                    <button className="ComprarPrew">Añadir al Carrito</button>
                                </a>
                            );
                        })
                    )}
                </div>
                {isOpen &&(
                    <ModalProductCard close = {Cerrar} data = {selectedCard} />
                    )

                }
            </div>
        </section>
    );
};

export default ProductCart;