import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Footer from '../footer/Footer.tsx';
import './LoginNavbar.css';
import logo from '../../assets/Image/logo.png';
import ventasIcon from '../../assets/Icons/Ventas.png';
import premiumIcon from '../../assets/Icons/Premium.png';
import comprasIcon from '../../assets/Icons/Compras.png'
//importar librerias de react
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
// Importar las imágenes correctamente


type NavBarProps = {
    children?: ReactNode;
  };

const NavBar = ({children}: NavBarProps) => {
    return (
        <>
        <div className='d-flex contenedor-principal'>
            <nav id="barraLateral" className="border-right d-none d-md-block">
                <div className="barra-fija">
                    <div className="navbar-brand p-3">
                        <Link to = '/' >
                            <img className="logo" src={logo} alt="Mercalista" />
                        </Link>
                    </div>
                    <ul className="nav flex-column" id="nav-horizontal">
                        <li className="nav-item">
        
                            <Link to = '/LoginEmail' className="nav-link">
                                <img className="icon" src={ventasIcon} alt="Ventas" />
                                Mis Productos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/LoginEmail' className="nav-link" style={{ color: "rgb(255, 238, 0)" }}>
                                <img className="icon" src={premiumIcon} alt="Premium" />
                                Premium
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/LoginEmail' className="nav-link">
                                <img className="icon" src={comprasIcon} alt="Compras" />
                                Mis Compras
                            </Link>
                        </li>
                        <li className="create-product">
                            <Link to = '/LoginEmail' className="nav-link create-product">Crear producto</Link>
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
                            data-bs-toggle="collapse"
                            data-bs-target="#colapsarBarraLateral"
                            aria-controls="colapsarBarraLateral"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-text-center justify-content-center">
                            <Link to = '/' className="btn-ind" >
                                <span className="navbar-text">Mercalista</span>
                            </Link>
                        </div>
                        <div className="bton-menu collapse navbar-collapse">
                            <Link to = '/LoginEmail' className="bton-login2 ml-auto">Iniciar Sesión</Link>
                            <Link to = '/Register' className="bton-register2 ml-auto">Registrarse</Link>
                        </div>
                    </div>
                </nav>


                
                {/* Botón en pantallas pequeñas */}
                <div className="collapse d-md-none" id="colapsarBarraLateral">
                    <nav className="bg-light p-3">
                        <ul className="nav_dispo nav flex-column" id="nav-collapse">
                            <li className="nav-item">
                                
                                <Link to = '/LoginEmail' className="bton-login">
                                    Iniciar Sesión
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to = '/Register' className="bton-register">
                                    Registrarse
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>


                {children}
            <Footer />

            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
};

export default NavBar;