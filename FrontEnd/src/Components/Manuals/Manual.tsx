import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import logo from '../../assets/Image/logo.png';
import './Manuals.css';

import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Offcanvas from 'bootstrap/js/dist/offcanvas';


const Manuals = () => {
    const { user } = useAuth();
    const [collageOpen1, setCollageOpen1] = useState(false);
    const [collageOpen2, setCollageOpen2] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [activeSection1, setActiveSection1] = useState('');
    const [activeSection2, setActiveSection2] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);


    const handleCollage1Toggle = () => {
        setCollageOpen1(open => {
            // Siempre resetea la sección activa al abrir/cerrar
            setActiveSection1('');
            return !open;
        });
        setCollageOpen2(false);
    };

    const handleCollage2Toggle = () => {
        setCollageOpen2(open => {
            // Siempre resetea la sección activa al abrir/cerrar
            setActiveSection2('');
            return !open;
        });
        setCollageOpen1(false);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const renderContent1 = () => {
        switch (activeSection1) {
            case 'Registrarse':
                // Documentación: Imagen, pasos, alertas, cards de beneficios, animación.
                return (
                    <div className="container py-4 animate__animated animate__fadeIn" style={{ background: '#f5e9da', borderRadius: 12 }}>
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center animate__animated animate__fadeInLeft">
                                {/* Imagen de registro */}
                                <img src="https://img.freepik.com/vector-gratis/registro-movil_23-2147993868.jpg" alt="Registro" className="img-fluid rounded shadow" style={{ maxHeight: 250 }} />
                            </div>
                            <div className="col-md-6 animate__animated animate__fadeInRight">
                                <h2 className="mb-3" style={{ color: '#413620' }}>
                                    <i className="bi bi-person-plus-fill me-2" style={{ color: '#b99d65' }}></i>
                                    ¡Crea tu cuenta en <span style={{ color: '#b99d65' }}>Mercalista</span>!
                                </h2>
                                <ul className="list-group mb-3 animate__animated animate__fadeInUp">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Completa el formulario con tus datos personales.
                                    </li>
                                    <li className="list-group-item border-0 bg-transparent">
                                        <i className="bi bi-envelope-fill text-primary me-2"></i>
                                        Verifica tu correo electrónico.
                                    </li>
                                    <li className="list-group-item border-0 bg-transparent">
                                        <i className="bi bi-shield-lock-fill text-warning me-2"></i>
                                        Elige una contraseña segura.
                                    </li>
                                </ul>
                                <div className="alert alert-warning d-flex align-items-center animate__animated animate__pulse animate__delay-1s" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    Recuerda usar un correo válido y una contraseña fuerte.
                                </div>
                                {/* Cards de beneficios */}
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <div className="card border-0 shadow-sm h-100 animate__animated animate__zoomIn">
                                            <div className="card-body text-center">
                                                <i className="bi bi-gift-fill fs-2 text-success"></i>
                                                <h6 className="mt-2">¡Recibe ofertas!</h6>
                                                <small>Accede a promociones exclusivas solo para usuarios registrados.</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="card border-0 shadow-sm h-100 animate__animated animate__zoomIn animate__delay-1s">
                                            <div className="card-body text-center">
                                                <i className="bi bi-shield-check fs-2 text-primary"></i>
                                                <h6 className="mt-2">Seguridad</h6>
                                                <small>Tus datos están protegidos con nosotros.</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-lg w-100 animate__animated animate__bounceIn" style={{ background: '#b99d65', color: '#fff', fontWeight: 600 }}>
                                    <i className="bi bi-person-plus"></i> Registrarme ahora
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'Iniciar Sesión':
                // Documentación: Imagen, formulario, alertas, tips, animación.
                return (
                    <div className="container py-4 animate__animated animate__fadeIn" style={{ background: '#fff', borderRadius: 12, border: '2px solid #b99d65' }}>
                        <div className="row align-items-center">
                            <div className="col-md-6 order-md-2 text-center animate__animated animate__fadeInRight">
                                <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-iniciar-sesion_114360-757.jpg" alt="Login" className="img-fluid rounded shadow" style={{ maxHeight: 220 }} />
                            </div>
                            <div className="col-md-6 order-md-1 animate__animated animate__fadeInLeft">
                                <h2 style={{ color: '#413620' }}>
                                    <i className="bi bi-box-arrow-in-right me-2" style={{ color: '#7a8450' }}></i>
                                    Accede a tu cuenta
                                </h2>
                                <form className="mt-3 animate__animated animate__fadeInUp">
                                    <div className="mb-3">
                                        <label className="form-label">Correo electrónico</label>
                                        <input type="email" className="form-control" placeholder="ejemplo@email.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <input type="password" className="form-control" placeholder="********" />
                                    </div>
                                    <button type="submit" className="btn w-100 animate__animated animate__pulse animate__delay-1s" style={{ background: '#7a8450', color: '#fff' }}>
                                        <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                                    </button>
                                </form>
                                <div className="alert alert-info mt-3 animate__animated animate__fadeInDown">
                                    <i className="bi bi-info-circle"></i> ¿Olvidaste tu contraseña? <a href="#" className="alert-link">Recupérala aquí</a>
                                </div>
                                <div className="d-flex justify-content-between mt-2 animate__animated animate__fadeInUp">
                                    <span className="badge bg-success">Nuevo</span>
                                    <span className="badge bg-warning text-dark">Soporte 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Crear Producto':
                // Documentación: Imagen, campos, tips, cards de ejemplo, animación.
                return (
                    <div className="container py-4 animate__animated animate__fadeIn" style={{ background: '#f5e9da', borderRadius: 12 }}>
                        <div className="row">
                            <div className="col-md-4 text-center animate__animated animate__fadeInLeft">
                                <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-agregar-producto_114360-1435.jpg" alt="Crear producto" className="img-fluid rounded shadow" style={{ maxHeight: 180 }} />
                            </div>
                            <div className="col-md-8 animate__animated animate__fadeInRight">
                                <h2 style={{ color: '#413620' }}>
                                    <i className="bi bi-plus-circle-fill me-2" style={{ color: '#a65c38' }}></i>
                                    Publica un nuevo producto
                                </h2>
                                <div className="alert alert-info mt-3 animate__animated animate__pulse animate__delay-1s" style={{ background: '#e9f7fa', color: '#2c3e50' }}>
                                    <i className="bi bi-lightbulb-fill me-2"></i>
                                    Sube imágenes atractivas y describe bien tu producto para vender más rápido.
                                </div>
                                <ul className="list-group list-group-flush mb-3 animate__animated animate__fadeInUp">
                                    <li className="list-group-item">Nombre del producto <span className="badge bg-primary">Obligatorio</span></li>
                                    <li className="list-group-item">Descripción <span className="badge bg-secondary">Breve y clara</span></li>
                                    <li className="list-group-item">Precio <span className="badge bg-success">Competitivo</span></li>
                                    <li className="list-group-item">Categoría <span className="badge bg-warning text-dark">Selecciona bien</span></li>
                                    <li className="list-group-item">Imágenes <span className="badge bg-info text-dark">Mínimo 1</span></li>
                                </ul>
                                {/* Ejemplo de card de producto */}
                                <div className="card shadow-sm animate__animated animate__zoomIn" style={{ borderColor: '#b99d65', background: '#fffbe6' }}>
                                    <div className="row g-0 align-items-center">
                                        <div className="col-4">
                                            <img src="https://picsum.photos/seed/productoEjemplo/100/80" className="img-fluid rounded-start" alt="Ejemplo" />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <h5 className="card-title mb-1">Ejemplo: Manzanas Orgánicas</h5>
                                                <p className="card-text mb-1">Frescas, de calidad premium.</p>
                                                <span className="badge bg-success">Disponible</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Mis Productos':
                // Documentación: Cards, tooltips, badges, animación.
                return (
                    <div className="container py-4" style={{ background: '#fffbe6', borderRadius: 12 }}>
                        <h2 style={{ color: '#413620' }}>
                            <i className="bi bi-box-seam-fill me-2" style={{ color: '#b99d65' }}></i>
                            Tus productos publicados
                        </h2>
                        <div className="row mt-4">
                            {[1,2,3].map(i => (
                                <div className="col-md-4 mb-3" key={i}>
                                    <div className="card shadow-sm animate__animated animate__zoomIn" style={{ borderColor: '#b99d65' }}>
                                        <img src={`https://picsum.photos/seed/product${i}/200/120`} className="card-img-top" alt="Producto" />
                                        <div className="card-body">
                                            <h5 className="card-title">Producto {i}</h5>
                                            <p className="card-text">Descripción breve del producto {i}.</p>
                                            <span className="badge bg-success" data-bs-toggle="tooltip" title="¡Listo para vender!">Disponible</span>
                                            <button className="btn btn-sm btn-outline-danger float-end" data-bs-toggle="tooltip" title="Eliminar producto">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Premium':
                // Documentación: Imagen, beneficios, cards, animación.
                return (
                    <div className="container py-4 animate__animated animate__fadeIn" style={{ background: '#f5e9da', borderRadius: 12 }}>
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <h2 style={{ color: '#b99d65' }}>
                                    <i className="bi bi-star-fill me-2"></i>
                                    ¡Hazte Premium!
                                </h2>
                                <p>Disfruta de beneficios exclusivos:</p>
                                <ul>
                                    <li>Mayor visibilidad de tus productos</li>
                                    <li>Soporte prioritario</li>
                                    <li>Ofertas y descuentos especiales</li>
                                </ul>
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <div className="card border-0 shadow-sm h-100" style={{ background: '#fffbe6' }}>
                                            <div className="card-body text-center">
                                                <i className="bi bi-graph-up-arrow fs-2 text-success"></i>
                                                <h6 className="mt-2">Más ventas</h6>
                                                <small>Tu producto aparece primero.</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="card border-0 shadow-sm h-100" style={{ background: '#e9f7fa' }}>
                                            <div className="card-body text-center">
                                                <i className="bi bi-headset fs-2 text-primary"></i>
                                                <h6 className="mt-2">Soporte VIP</h6>
                                                <small>Atención preferencial.</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-warning text-white fw-bold w-100">
                                    <i className="bi bi-lightning-fill"></i> Activar Premium
                                </button>
                            </div>
                            <div className="col-md-5 text-center">
                                <img src="https://img.freepik.com/vector-gratis/ilustracion-premium_53876-43415.jpg" alt="Premium" className="img-fluid rounded animate__animated animate__fadeInRight" style={{ maxHeight: 180 }} />
                            </div>
                        </div>
                    </div>
                );
            case 'Mis Compras':
                // Documentación: Tabla, badges, animación, detalles.
                return (
                    <div className="container py-4" style={{ background: '#e9f7fa', borderRadius: 12 }}>
                        <h2 style={{ color: '#2c3e50' }}>
                            <i className="bi bi-bag-check-fill me-2" style={{ color: '#7a8450' }}></i>
                            Historial de compras
                        </h2>
                        <table className="table table-hover mt-3 animate__animated animate__fadeIn">
                            <thead style={{ background: '#b99d65', color: '#fff' }}>
                                <tr>
                                    <th>Producto</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Iphone 15 Pro</td>
                                    <td>12/06/2025</td>
                                    <td><span className="badge bg-success">Entregado</span></td>
                                    <td>$1200</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-info" data-bs-toggle="tooltip" title="Ver detalle">
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Audífonos Sony</td>
                                    <td>10/06/2025</td>
                                    <td><span className="badge bg-warning text-dark">En camino</span></td>
                                    <td>$150</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-info" data-bs-toggle="tooltip" title="Ver detalle">
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case 'Mi Perfil':
                // Documentación: Foto, datos, badges, botón, animación.
                return (
                    <div className="container py-4" style={{ background: '#fff', borderRadius: 12 }}>
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Perfil" className="rounded-circle shadow animate__animated animate__zoomIn" style={{ width: 120, border: '4px solid #b99d65' }} />
                            </div>
                            <div className="col-md-8">
                                <h2 style={{ color: '#413620' }}>
                                    <i className="bi bi-person-circle me-2" style={{ color: '#b99d65' }}></i>
                                    Mi Perfil
                                </h2>
                                <ul className="list-group">
                                    <li className="list-group-item">Nombre: <strong>Juan Pérez</strong></li>
                                    <li className="list-group-item">Correo: <strong>juan@email.com</strong></li>
                                    <li className="list-group-item">Miembro desde: <strong>2024</strong></li>
                                    <li className="list-group-item">Teléfono: <span className="badge bg-info text-dark">+57 300 123 4567</span></li>
                                </ul>
                                <button className="btn mt-3" style={{ background: '#a65c38', color: '#fff' }}>
                                    <i className="bi bi-pencil-square"></i> Editar perfil
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'Buscador (Search)':
                // Documentación: Formulario, alert, cards de ejemplo, animación.
                return (
                    <div className="container py-4" style={{ background: '#f5e9da', borderRadius: 12 }}>
                        <h2 style={{ color: '#413620' }}>
                            <i className="bi bi-search me-2" style={{ color: '#2c3e50' }}></i>
                            Buscador de productos y usuarios
                        </h2>
                        <form className="d-flex my-3">
                            <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar" />
                            <button className="btn" style={{ background: '#b99d65', color: '#fff' }} type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </form>
                        <div className="alert alert-secondary">
                            <i className="bi bi-info-circle"></i> Escribe el nombre del producto o usuario que deseas encontrar.
                        </div>
                        {/* Ejemplo de resultados */}
                        <div className="row g-2 mt-3">
                            <div className="col-md-4">
                                <div className="card shadow-sm animate__animated animate__fadeInUp">
                                    <img src="https://picsum.photos/seed/search1/200/120" className="card-img-top" alt="Resultado" />
                                    <div className="card-body">
                                        <h5 className="card-title">Producto destacado</h5>
                                        <p className="card-text">Descripción breve del producto encontrado.</p>
                                        <span className="badge bg-success">Disponible</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-sm animate__animated animate__fadeInUp">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" className="card-img-top" alt="Usuario" />
                                    <div className="card-body">
                                        <h5 className="card-title">Maria López</h5>
                                        <p className="card-text">Vendedora destacada</p>
                                        <span className="badge bg-primary">Usuario</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Chats':
                // Documentación: Lista de chats, badges, animación.
                return (
                    <div className="container py-4" style={{ background: '#fffbe6', borderRadius: 12 }}>
                        <h2 style={{ color: '#413620' }}>
                            <i className="bi bi-chat-dots-fill me-2" style={{ color: '#7a8450' }}></i>
                            Mensajería
                        </h2>
                        <div className="list-group mt-3 animate__animated animate__fadeIn">
                            <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="rounded-circle me-3" style={{ width: 40 }} />
                                <div>
                                    <div><strong>Maria López</strong></div>
                                    <small className="text-muted">¿Tienes stock disponible?</small>
                                </div>
                                <span className="badge bg-success ms-auto">1</span>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" className="rounded-circle me-3" style={{ width: 40 }} />
                                <div>
                                    <div><strong>Carlos Ruiz</strong></div>
                                    <small className="text-muted">¡Gracias por tu compra!</small>
                                </div>
                            </a>
                        </div>
                    </div>
                );
            case 'Notificaciones':
                // Documentación: Alertas, badges, animación.
                return (
                    <div className="container py-4" style={{ background: '#e9f7fa', borderRadius: 12 }}>
                        <h2 style={{ color: '#2c3e50' }}>
                            <i className="bi bi-bell-fill me-2" style={{ color: '#a65c38' }}></i>
                            Notificaciones recientes
                        </h2>
                        <div className="alert alert-success d-flex align-items-center mt-3 animate__animated animate__fadeInDown" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            Tu producto <strong>Iphone 15 Pro</strong> ha sido vendido.
                        </div>
                        <div className="alert alert-warning d-flex align-items-center animate__animated animate__fadeInDown" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Recuerda actualizar el stock de tus productos.
                        </div>
                    </div>
                );
            case 'Carro Compras':
                // Documentación: Lista, resumen, badges, animación.
                return (
                    <div className="container py-4" style={{ background: '#fff', borderRadius: 12 }}>
                        <h2 style={{ color: '#413620' }}>
                            <i className="bi bi-cart-fill me-2" style={{ color: '#b99d65' }}></i>
                            Carrito de compras
                        </h2>
                        <div className="row mt-3">
                            <div className="col-md-8">
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Iphone 15 Pro
                                        <span className="badge bg-primary rounded-pill">$1200</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Audífonos Sony
                                        <span className="badge bg-primary rounded-pill">$150</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <div className="card p-3" style={{ background: '#f5e9da' }}>
                                    <h5>Total: <span className="text-success">$1350</span></h5>
                                    <button className="btn btn-success w-100 mt-2">
                                        <i className="bi bi-credit-card"></i> Pagar ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                // Documentación: Mensaje de bienvenida.
                return (
                    <div className="container py-5 text-center" style={{ background: '#f5e9da', borderRadius: 12 }}>
                        <h2 style={{ color: '#413620' }}>
                            <i className="bi bi-house-door-fill me-2" style={{ color: '#b99d65' }}></i>
                            Bienvenido a Mercalista
                        </h2>
                        <p className="lead">Selecciona una sección del menú para ver el manual correspondiente.</p>
                    </div>
                );
        }
    };

    const renderContent2 = () => {
        switch (activeSection2) {
            case 'dashboard':
                return <h2>Dashboard - Estadísticas generales</h2>;
            case 'products':
                return <h2>Products - Gestión de productos</h2>;
            default:
                return <h2>Manual de Usuario 2</h2>;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 770);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // NUEVO: función para cerrar el offcanvas en mobile
    const closeMobileSidebar = () => {
        if (isMobile) {
            const offcanvas = document.getElementById('mobileSidebar');
            if (offcanvas) {
                const bsOffcanvas = Offcanvas.getOrCreateInstance(offcanvas);
                bsOffcanvas.hide();
            }

            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop && backdrop.parentNode) {
                backdrop.parentNode.removeChild(backdrop);
            }
            document.body.classList.remove('offcanvas-backdrop', 'show', 'modal-open');
            document.body.style.overflow = '';
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row w-100">
            {/* Toggle para mobile */}
            {isMobile && (
                <div className="p-2 bg-dark text-white d-flex justify-content-between align-items-center w-100">
                    <Link to={user ? `/logged/${user.username}` : '/'} className="d-flex align-items-center text-white text-decoration-none">
                        <img src={logo} alt="MercalistaLogo" className="logoMerc me-2" />
                        <span className="fs-5">Mercalista</span>
                    </Link>
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
                    <Link to={user ? `/logged/${user.username}` : '/'} className="cont-title d-flex align-items-center mb-3 me-md-auto text-white text-decoration-none">
                        <img src={logo} alt="MercalistaLogo" className="logoMerc" />
                        <span className="titleMercalista fs-4">Mercalista</span>
                    </Link>
                    <hr />
                    <SidebarContent
                        collageOpen1={collageOpen1}
                        collageOpen2={collageOpen2}
                        handleCollage1Toggle={handleCollage1Toggle}
                        handleCollage2Toggle={handleCollage2Toggle}
                        setActiveSection1={setActiveSection1}
                        setActiveSection2={setActiveSection2}
                        isMobile={isMobile}
                        closeMobileSidebar={closeMobileSidebar}
                    />
                </div>
            )}

            {/* Botón de toggle para desktop */}
            {!isMobile && (
                sidebarVisible ? (
                    <div className="sidebar-tab sidebar-tab-open" onClick={toggleSidebar}>
                        <ArrowLeft size={18} />
                    </div>
                ) : (
                    <div className="sidebar-tab sidebar-tab-closed" onClick={toggleSidebar}>
                        <ArrowRight size={18} />
                    </div>
                )
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
                            collageOpen1={collageOpen1}
                            collageOpen2={collageOpen2}
                            handleCollage1Toggle={handleCollage1Toggle}
                            handleCollage2Toggle={handleCollage2Toggle}
                            setActiveSection1={setActiveSection1}
                            setActiveSection2={setActiveSection2}
                            isMobile={isMobile}
                            closeMobileSidebar={closeMobileSidebar}
                        />
                    </div>
                </div>
            )}

            {/* Contenido principal */}
    <div className="contenManual p-4 flex-grow-1 content-area">
    {collageOpen1 && renderContent1()}
    {collageOpen2 && renderContent2()}
    {!collageOpen1 && !collageOpen2 && 

        <div className="container py-5 text-center animate__animated animate__fadeIn" style={{ background: '#a7a7a760', borderRadius: 12 }}>
            <h2 style={{ color: '#413620' }}>
                <i className="bi bi-house-door-fill me-2" style={{ color: '#b99d65' }}></i>
                Bienvenido a Mercalista
            </h2>
            <p className="lead mb-4" style={{ color: 'black' }}>
                Este manual interactivo te guiará paso a paso para aprovechar al máximo todas las funciones de Mercalista.<br />
                Aprende a registrarte, publicar productos, gestionar tus compras y ventas, y comunicarte con otros usuarios de forma sencilla y segura.
            </p>
            <div className="row justify-content-center mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100 animate__animated animate__zoomIn" style={{ background: '#fffbe6' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-person-plus-fill fs-1 text-success"></i>
                            <h5 className="mt-2">Fácil de usar</h5>
                            <small>Interfaz intuitiva para que cualquier usuario pueda comprar y vender sin complicaciones.</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100 animate__animated animate__zoomIn animate__delay-1s" style={{ background: '#e9f7fa' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-shield-lock-fill fs-1 text-primary"></i>
                            <h5 className="mt-2">Seguro</h5>
                            <small>Tus datos y transacciones están protegidos con los más altos estándares de seguridad.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="alert alert-info d-inline-flex align-items-center animate__animated animate__fadeInUp" style={{ background: '#e9f7fa', color: '#2c3e50' }}>
                <i className="bi bi-lightbulb-fill me-2"></i>
                <span>
                    Usa el menú lateral para navegar por las diferentes secciones del manual.<br />
                    ¡Comienza seleccionando una opción y descubre todo lo que puedes hacer en Mercalista!
                </span>
            </div>
            {/* Equipo de desarrollo */}
            <div className="mt-5">
                <h4 className="mb-4" style={{ color: '#413620', letterSpacing: 1 }}>
                    <i className="bi bi-stars me-2" style={{ color: '#b99d65' }}></i>
                    Nuestro equipo de desarrollo
                </h4>
                <div className="row justify-content-center g-4">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0 shadow-lg animate__animated animate__fadeInUp" style={{ background: '#fffbe6' }}>
                            <div className="card-body text-center">
                                <i className="bi bi-person-badge-fill fs-2 text-warning mb-2"></i>
                                <h5 className="card-title mb-1" style={{ color: '#413620' }}>Sebastian Caballero</h5>
                                <span className="badge bg-warning text-dark mb-2">Scrum Master</span>
                                <p className="card-text small">Líder del equipo, encargado de la organización y la metodología ágil.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="card border-0 shadow animate__animated animate__fadeInUp animate__delay-1s" style={{ background: '#e9f7fa' }}>
                            <div className="card-body text-center">
                                <i className="bi bi-person-fill fs-2 text-success mb-2"></i>
                                <h6 className="card-title mb-1" style={{ color: '#413620' }}>Brayan Puerta</h6>
                                <span className="badge bg-success mb-1">Developer</span>
                                <p className="card-text small">Desarrollo Frontend y Backend.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="card border-0 shadow animate__animated animate__fadeInUp animate__delay-2s" style={{ background: '#e9f7fa' }}>
                            <div className="card-body text-center">
                                <i className="bi bi-person-fill fs-2 text-success mb-2"></i>
                                <h6 className="card-title mb-1" style={{ color: '#413620' }}>Sebastian Muñoz</h6>
                                <span className="badge bg-success mb-1">Developer</span>
                                <p className="card-text small">Desarrollo de funcionalidades y soporte.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="card border-0 shadow animate__animated animate__fadeInUp animate__delay-3s" style={{ background: '#e9f7fa' }}>
                            <div className="card-body text-center">
                                <i className="bi bi-person-fill fs-2 text-success mb-2"></i>
                                <h6 className="card-title mb-1" style={{ color: '#413620' }}>Juliana Morales</h6>
                                <span className="badge bg-success mb-1">Developer</span>
                                <p className="card-text small">Diseño de interfaz y experiencia de usuario.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="card border-0 shadow animate__animated animate__fadeInUp animate__delay-4s" style={{ background: '#e9f7fa' }}>
                            <div className="card-body text-center">
                                <i className="bi bi-person-fill fs-2 text-success mb-2"></i>
                                <h6 className="card-title mb-1" style={{ color: '#413620' }}>Samuel Alvares</h6>
                                <span className="badge bg-success mb-1">Developer</span>
                                <p className="card-text small">Integración de servicios y pruebas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
</div>
        </div>
    );
};

type SidebarContentProps = {
    collageOpen1: boolean;
    collageOpen2: boolean;
    handleCollage1Toggle: () => void;
    handleCollage2Toggle: () => void;
    setActiveSection1: (section: string) => void;
    setActiveSection2: (section: string) => void;
    isMobile?: boolean;
    closeMobileSidebar?: () => void;
};

const SidebarContent: React.FC<SidebarContentProps> = ({
    collageOpen1,
    collageOpen2,
    handleCollage1Toggle,
    handleCollage2Toggle,
    setActiveSection1,
    setActiveSection2,
    isMobile,
    closeMobileSidebar,
}) => (
    <ul className="nav nav-pills flex-column mb-auto">
        {/* Collage 1 */}
        <li>
            <button
                className="nav-link text-white d-flex justify-content-between align-items-center"
                type="button"
                onClick={handleCollage1Toggle}
                aria-expanded={collageOpen1}
            >
                {collageOpen1 ? <ArrowDown size={18} /> : <ArrowRight size={18} />}
                <span>Manual de Usuario 1</span>
            </button>
            <div className={`collapse${collageOpen1 ? ' show' : ''}`} id="submenuCollage1">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Registrarse'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-plus-circle me-2"></i> 1. Registrarse
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Iniciar Sesión'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 2. Iniciar Sesión
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Crear Producto'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 3. Crear Producto
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Mis Productos'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 4. Mis Productos
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Premium'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 5. Premium
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Mis Compras'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 6. Mis Compras
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Mi Perfil'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 7. Mi Perfil
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Buscador (Search)'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 8. Buscador (Search)
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Chats'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 9. Chats
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Notificaciones'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 10. Notificaciones
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection1('Carro Compras'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            <i className="bi bi-collection me-2"></i> 11. Carro Compras
                        </button>
                    </li>
                </ul>
            </div>
        </li>

        {/* Collage 2 */}
        <li>
            <button
                className="nav-link text-white d-flex justify-content-between align-items-center"
                type="button"
                onClick={handleCollage2Toggle}
                aria-expanded={collageOpen2}
            >
                {collageOpen2 ? <ArrowDown size={18} /> : <ArrowRight size={18} />}
                <span>Manual de Usuario 2</span>
            </button>
            <div className={`collapse${collageOpen2 ? ' show' : ''}`} id="submenuCollage2">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection2('dashboard'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            1. Dashboard
                        </button>
                    </li>
                    <li>
                        <button className="nav-link text-white ps-4" onClick={() => { setActiveSection2('products'); if (isMobile && closeMobileSidebar) closeMobileSidebar(); }}>
                            2. Productos
                        </button>
                    </li>
                </ul>
            </div>
        </li>
        <hr />
    </ul>
);

export default Manuals;