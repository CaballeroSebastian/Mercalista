import React, { useState, useEffect } from 'react';
import './ProductCart.css';
import ModalProductCard from './modalCard';

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
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Product | false>(false)
    const [priceRange, setPriceRange] = useState<{minPrice: number, maxPrice: number}>({
        minPrice: 0,
        maxPrice: Infinity
    });

    //funcion para determina que producto abrira la ventana modal
    const OpenCard = (producto: Product) =>{
        setSelectedCard(producto)
    }

    
    const Cerrar = () =>{
        setIsOpen(!isOpen)
    }

    // Efecto para cargar productos y calcular conteos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/productos/');
                if (!response.ok) throw new Error('Error al cargar productos');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);

                // Calcular conteos por categoría
                const counts = data.reduce((acc: {[key: string]: number}, product: Product) => {
                    const category = product.categoriaproducto.toLowerCase();
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});

                // Emitir evento con los conteos actualizados
                const event = new CustomEvent('categoryCountsUpdate', {
                    detail: counts
                });
                window.dispatchEvent(event);
            } catch (err) {
                console.error('Error:', err);
                setError('No se pudieron cargar los productos.');
            }
        };

        fetchData();

        // Limpiar al desmontar
        return () => {
            window.removeEventListener('categoryCountsUpdate', () => {});
        };
    }, []);

    // Escuchar cambios de categoría
    useEffect(() => {
        const handleCategoryChange = (event: CustomEvent<{category: string}>) => {
            setSelectedCategory(event.detail.category);
        };

        window.addEventListener('categoryChange', handleCategoryChange as EventListener);
        
        return () => {
            window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
        };
    }, []);

    // Escuchar cambios de precio
    useEffect(() => {
        const handlePriceChange = (event: CustomEvent<{minPrice: number, maxPrice: number}>) => {
            setPriceRange(event.detail);
        };

        window.addEventListener('priceChange', handlePriceChange as EventListener);
        
        return () => {
            window.removeEventListener('priceChange', handlePriceChange as EventListener);
        };
    }, []);

    // Efecto para filtrar productos cuando cambia la categoría o el precio
    useEffect(() => {
        let filtered = [...products];

        // Filtrar por categoría si hay una seleccionada
        if (selectedCategory) {
            filtered = filtered.filter(product => 
                product.categoriaproducto.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Filtrar por rango de precio
        filtered = filtered.filter(product => 
            product.precio >= priceRange.minPrice && 
            product.precio <= priceRange.maxPrice
        );

        setFilteredProducts(filtered);
    }, [selectedCategory, products, priceRange]);

    return (
        <section className="productos-carts">
            <div className="contenedor">
                <h3 className="tituloPrew">
                    Productos   {/* {selectedCategory ? `Productos - ${selectedCategory}` : 'Todos los Productos'} */}
                </h3>
                <div className="contenedor-cards">
                    {error ? (
                        <p>{error}</p>
                    ) : filteredProducts.length === 0 ? (
                        <p>No hay productos en esta categoría</p>
                    ) : (
                        filteredProducts.map(product => {
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