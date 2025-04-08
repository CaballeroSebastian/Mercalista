import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';

// 🔹 Simulación de datos (pueden venir de un formulario, API, etc.)
const productos = [
    {
        nombre: "Papa pastusa",
        precio: "$3'000.000.00",
        peso: "100 Cargas",
        ciudad: "Boyacá",
        imagen: "./LandingPage/img/productos/papa.png"
    },
    {
        nombre: "Cebolla larga",
        precio: "$1'200.000.00",
        peso: "50 Cargas",
        ciudad: "Cundinamarca",
        imagen: "./LandingPage/img/productos/cebolla.png"
    },
    {
        nombre: "Tomate chonto",
        precio: "$900.000.00",
        peso: "80 Cargas",
        ciudad: "Valle del Cauca",
        imagen: "./LandingPage/img/productos/tomate.png"
    }
];

const ProductCart = () => {
    return (
        <section className="productos">
            <div className="contenedor">
                <h3 className="titulo">Productos</h3>
                <div className="contenedor-cards">
                    {productos.map((producto, index) => (
                        <a key={index} href="#" className="producto">
                            <div className="thumb">
                                <img src={producto.imagen} alt={producto.nombre} />
                            </div>
                            <div className="informacion-producto">
                                <p className="nombre">{producto.nombre}</p>
                                <p className="precio">{producto.precio}</p>
                                <p className="peso">{producto.peso}</p>
                                <p className="ciudad">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                    {producto.ciudad}
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
