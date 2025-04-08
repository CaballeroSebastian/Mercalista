import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

// Importar las imágenes correctamente
import logo from '../../assets/Image/logo.png';
import ventasIcon from '../../assets/Icons/Ventas.png';
import premiumIcon from '../../assets/Icons/Premium.png';
import comprasIcon from '../../assets/Icons/Compras.png';

const NavBar = () => {
    return (
        <>
        <div className='d-flex contenedor-principal'>
            <nav id="barraLateral" className="border-right d-none d-md-block">
                <div className="barra-fija">
                    <div className="navbar-brand p-3">
                        <a href="Index.html">
                            <img className="logo" src={logo} alt="Mercalista" />
                        </a>
                    </div>
                    <ul className="nav flex-column" id="nav-horizontal">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <img className="icon" src={ventasIcon} alt="Ventas" />
                                Mis Ventas
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="suscripcion.html" style={{ color: "rgb(255, 238, 0)" }}>
                                <img className="icon" src={premiumIcon} alt="Premium" />
                                Premium
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <img className="icon" src={comprasIcon} alt="Compras" />
                                Mis Compras
                            </a>
                        </li>
                        <li className="create-product">
                            <a className="nav-link create-product" href="publicar.html">Crear producto</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="w-100">
                <nav className="barra_sup navbar navbar-expand-md navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <button
                            className="navbar-toggler d-md-none"
                            type="button"
                            data-toggle="collapse"
                            data-target="#colapsarBarraLateral"
                            aria-controls="colapsarBarraLateral"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="btn-ind" href="Index.html">
                            <span className="navbar-text">Mercalista</span>
                        </a>
                        <div className="collapse navbar-collapse justify-content-center">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="bton-search btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <a className="nav-link ml-auto" href="#">Cuenta</a>
                    </div>
                </nav>

                {/* Botón en pantallas pequeñas */}
                <div className="collapse d-md-none" id="colapsarBarraLateral">
                    <nav className="bg-light p-3">
                        <ul className="nav_dispo nav flex-column" id="nav-collapse">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <img className="icon" src={ventasIcon} alt="Ventas" />
                                    Mis Ventas
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="suscripcion.html">
                                    <img className="icon" src={premiumIcon} alt="Premium" />
                                    Premium
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <img className="icon" src={comprasIcon} alt="Compras" />
                                    Mis Compras
                                </a>
                            </li>
                            <li className="create-product">
                                <a className="nav-link create-product" href="publicar.html">Crear producto</a>
                            </li>
                        </ul>

                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="bton-search btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </nav>
                </div>
            </div>
        </div>
        </>
    );
};

export default NavBar;