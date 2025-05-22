import React from 'react';
import './ProductCart.css';

const ProductCart = () => {
    // Datos de ejemplo
    const products = [
        {
            id: 1,
            name: 'Papa pastusa',
            price: '$3\'000.000.00',
            weight: '100 Cargas',
            city: 'Boyacá',
            image: './LandingPage/img/productos/papa.png',
        },
        {
            id: 2,
            name: 'Cebolla cabezona',
            price: '$180.000.00',
            weight: '5 Cargas',
            city: 'Boyacá',
            image: './LandingPage/img/productos/cebolla.jpeg',
        },
        {
            id: 3,
            name: 'Cilantro',
            price: '$50.000.00',
            weight: '2 Cargas',
            city: 'Cundinamarca',
            image: './LandingPage/img/productos/cilantro.jpg',
        },
        {
            id: 4,
            name: 'Plátano verde',
            price: '$200.000.00',
            weight: '10 Cargas',
            city: 'Antioquia',
            image: './LandingPage/img/productos/platanoverde.jpg',
        },
                {
            id: 4,
            name: 'Plátano verde',
            price: '$200.000.00',
            weight: '10 Cargas',
            city: 'Antioquia',
            image: './LandingPage/img/productos/platanoverde.jpg',
        },
                {
            id: 4,
            name: 'Plátano verde',
            price: '$200.000.00',
            weight: '10 Cargas',
            city: 'Antioquia',
            image: './LandingPage/img/productos/platanoverde.jpg',
        },  
    ];

    return (
        <section className="productos">
            <div className="contenedor">
                <h3 className="titulo">Productos</h3>
                <div className="contenedor-cards">
                    {products.map((product) => (
                        <a href="#" className="producto" key={product.id}>
                            <div className="thumb">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="informacion-producto">
                                <p className="nombre">{product.name}</p>
                                <p className="precio">{product.price}</p>
                                <p className="peso">{product.weight}</p>
                                <p className="ciudad">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-geo-alt-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                    {product.city}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCart;