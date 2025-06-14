import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import logo from '../../assets/Image/logo.png';
import './Manuals.css';

import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Manuals = () => {
    const [collageOpen1, setCollageOpen1] = useState(false);
    const [collageOpen2, setCollageOpen2] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [activeSection, setActiveSection] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);

    const handleCollageToggle = () => {
        setCollageOpen1(!collageOpen1);
        setCollageOpen2(false); 
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'Registrarse':
                return <h2>Registrarse - Formulario de registro</h2>;
            case 'verCollages':
                return <h2>Ver collages - Lista de collages</h2>;
            case 'dashboard':
                return <h2>Dashboard - Estadísticas generales</h2>;
            case 'orders':
                return <h2>Orders - Órdenes recientes</h2>;
            case 'products':
                return <h2>Products - Gestión de productos</h2>;
            case 'customers':
                return <h2>Customers - Lista de clientes</h2>;
            default:
                return <h2>Bienvenido a Mercalista</h2>;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 770);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="d-flex flex-column flex-md-row w-100">
            {/* Toggle para mobile */}
            {isMobile && (
                <div className="p-2 bg-dark text-white d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="MercalistaLogo" className="logoMerc me-2" />
                        <span className="fs-5">Mercalista</span>
                    </div>
                    <button
                        className="btonMenu btn btn-outline-light"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#mobileSidebar"
                        aria-controls="mobileSidebar"
                    >
                        ☰
                    </button>
                </div>
            )}

            {/* Sidebar para desktop */}
            {!isMobile && sidebarVisible && (
                <div className="contNavManual d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: 230 }}>
                    <a href="/" className="cont-title d-flex align-items-center mb-3 me-md-auto text-white text-decoration-none">
                        <img src={logo} alt="MercalistaLogo" className="logoMerc" />
                        <span className="titleMercalista fs-4">Mercalista</span>
                    </a>
                    <hr />
                    <SidebarContent
                        collageOpen={collageOpen1}
                        handleCollageToggle={handleCollageToggle}
                        setActiveSection={setActiveSection}
                    />
                </div>
            )}

            {/* Botón de toggle para desktop */}
            {!isMobile && (
                <>
                    {sidebarVisible ? (
                        <div className="sidebar-tab sidebar-tab-open" onClick={toggleSidebar}>
                            <ArrowLeft size={18} />
                        </div>
                    ) : (
                        <div className="sidebar-tab sidebar-tab-closed" onClick={toggleSidebar}>
                            <ArrowRight size={18} />
                        </div>
                    )}
                </>
            )}

            {/* Offcanvas para mobile */}
            {isMobile && (
                <div className="contMobile offcanvas offcanvas-top " tabIndex={-1} id="mobileSidebar" aria-labelledby="mobileSidebarLabel"> 
                    <div className="HeaderMovil offcanvas-header">
                        <h5 className="offcanvas-title" id="mobileSidebarLabel">Manuales de Mercalista</h5>
                        <button type="button" className="btonMovil btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <SidebarContent
                            collageOpen={collageOpen1}
                            handleCollageToggle={handleCollageToggle}
                            setActiveSection={(section) => {
                                setActiveSection(section);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Contenido principal */}
            <div className="contenManual p-4 flex-grow-1 content-area">
                {renderContent()}
            </div>
        </div>
    );
};

type SidebarContentProps = {
    collageOpen: boolean;
    handleCollageToggle: () => void;
    setActiveSection: (section: string) => void;
};

const SidebarContent: React.FC<SidebarContentProps> = ({ collageOpen, handleCollageToggle, setActiveSection }) => (
    <>
        <ul className="nav nav-pills flex-column mb-auto">
            <li>
                <button
                    className="nav-link text-white d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#submenuCollage"
                    aria-expanded={collageOpen}
                    onClick={handleCollageToggle}
                    type="button" 
                >
                    {collageOpen ? <ArrowDown size={18} /> : <ArrowRight size={18} />}
                    <span><i className="me-2"></i> Manual de Usuario</span>
                </button>
                <div className={`collapse${collageOpen ? ' show' : ''}`} id="submenuCollage">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('Registrarse')}>
                                <i className="bi bi-plus-circle me-2"></i> 1. Registrarse
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 2. Iniciar Sesión
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 3. Crear Producto
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 4. Mis Productos
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 5. Premium
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 6. Mis Compras
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 7. Mi Perfil
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 8. Buscador (Search)
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 9. Chats
                            </button>
                        </li>        
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 10. Notificaciones
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 11. Carro Compras
                            </button>
                        </li>                                                                                                                                                                                                                  
                    </ul>
                </div>
            </li>
                        <li>
                <button
                    className="nav-link text-white d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse2"
                    data-bs-target="#submenuCollage2"
                    aria-expanded={collageOpen}
                    onClick={handleCollageToggle}
                    type="button" // <-- Añade esto
                >
                    {collageOpen ? <ArrowDown size={18} /> : <ArrowRight size={18} />}
                    <span><i className="me-2"></i> Manual de Usuario</span>
                </button>
                <div className={`collapse2${collageOpen ? ' show' : ''}`} id="submenuCollage2">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('Registrarse')}>
                                <i className="bi bi-plus-circle me-2"></i> 1. Registrarse
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 2. Iniciar Sesión
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 3. Crear Producto
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 4. Mis Productos
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 5. Premium
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 6. Mis Compras
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 7. Mi Perfil
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 8. Buscador (Search)
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 9. Chats
                            </button>
                        </li>        
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 10. Notificaciones
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-white ps-4" onClick={() => setActiveSection('verCollages')}>
                                <i className="bi bi-collection me-2"></i> 11. Carro Compras
                            </button>
                        </li>                                                                                                                                                                                                                  
                    </ul>
                </div>
            </li>
        </ul>
        <hr />
    </>
);

export default Manuals;
