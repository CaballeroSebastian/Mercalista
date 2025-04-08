import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';

const ProductCart = () => {
    return (
        <>
            <section className="productos">
                <div className="contenedor">
                    <h3 className="titulo">Productos</h3>
                    <div className="contenedor-cards">
                        <a href="#" className="producto">
                            <div className="thumb">
                                <img src="./LandingPage/img/productos/papa.png" alt="Lorem Ipsum" />
                            </div>
                            <div className="informacion-producto">
                                <p className="nombre">Papa pastusa</p>
                                <p className="precio">$3'000.000.00</p>
                                <p className="peso">100 Cargas</p>
                                <p className="ciudad">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                    Boyacá
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductCart;
