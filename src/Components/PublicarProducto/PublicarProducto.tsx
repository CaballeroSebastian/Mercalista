import NavBar from '../Navbar/Navbar.tsx'
import './PublicarProducto.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const PublicarProducto = () =>{
    return(
        <>
        <NavBar>
            <div className='body'>
                <div className="container" id="contenedor-productos">
                    <div className="container-cards">
                        <div className="container">
                            <div className="py-5 text-center">
                                <h2 style={{ color: '#9C6615' }}>Registrar producto</h2>
                            </div>

                            <div className="row g-5">
                                <div className="col-md-5 col-lg-4 order-md-last">
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span style={{ color: '#9C6615' }}>Tus fotos</span>
                                        <span className="badge rounded-pill" style={{ backgroundColor: '#9C6615' }}>10 Máximo</span>
                                    </h4>
                                    <form id="form-foto" action="#" method="post" encType="multipart/form-data" className="form-control p-3 shadow-sm rounded-3">
                                        <div className="mb-3">
                                            <label htmlFor="foto" className="form-label">Elegir foto</label>
                                            <input className="form-control" type="file" id="foto" multiple accept="image/*" />
                                        </div>
                                        <div className="mb-4">
                                            <img id="prevista" alt="imagen" style={{ display: 'none' }} className="img-fluid rounded-5 mt-3" />
                                        </div>
                                        <button type="button" className="btn btn-sm" style={{ backgroundColor: '#9C6615', color: 'aliceblue' }} onClick={() => document.getElementById('form-foto').reset()}>
                                            Eliminar Datos
                                        </button>
                                    </form>
                                </div>

                                <div className="col-md-7 col-lg-8">
                                    <h4 className="mb-3" style={{ color: '#9C6615' }}>Información del producto</h4>
                                    <form className="needs-validation" noValidate>
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <label htmlFor="nombre" className="form-label">Nombre del producto</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nombre"
                                                    placeholder="Ingresa nombre"
                                                    onInput={(e) => (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ''))}
                                                    required
                                                />
                                                <div className="invalid-feedback">Se requiere este campo de entrada.</div>
                                            </div>

                                            <div className="col-sm-6">
                                                <label htmlFor="tipo" className="form-label">Categoría del producto</label>
                                                <select name="tipo" id="tipo" className="form-select" required defaultValue="">
                                                    <option value="" disabled>Seleccione una opción</option>
                                                    <option value="fruta">Fruta</option>
                                                    <option value="legumbre">Legumbre</option>
                                                    <option value="cereales o granos">Cereales o granos</option>
                                                    <option value="Tuberculos y Raices">Tubérculos y Raíces</option>
                                                    <option value="Nueces y Semillas">Nueces y Semillas</option>
                                                    <option value="Especias y Hierbas">Especias y Hierbas</option>
                                                </select>
                                                <div className="invalid-feedback">Se requiere este campo de entrada.</div>
                                            </div>

                                            <div className="col-sm-6">
                                                <label htmlFor="cantidad" className="form-label">Cantidad en stock</label>
                                                <div className="input-group has-validation">
                                                    <input
                                                        type="number"
                                                        id="cantidad"
                                                        className="form-control"
                                                        placeholder="Ingresa cantidad"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Se requiere este campo de entrada.</div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="unidad" className="form-label">Unidad de medida</label>
                                                <select className="form-select" id="unidad" required defaultValue="">
                                                    <option value="" disabled>Elegir...</option>
                                                    <option value="Kilogramos">Kilogramos</option>
                                                    <option value="Toneladas">Toneladas</option>
                                                </select>
                                                <div className="invalid-feedback">Por favor elegir unidad de medida.</div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="descripcion" className="form-label">Descripción <span className="text-body-secondary">(Opcional)</span></label>
                                                <textarea
                                                    className="form-control"
                                                    id="descripcion"
                                                    rows="3"
                                                    style={{ width: '100%', height: '100px', resize: 'none' }}
                                                    maxLength="1000"
                                                ></textarea>
                                            </div>

                                            <div className="col-sm-6">
                                                <label htmlFor="precio" className="form-label">Precio</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text">$</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="precio"
                                                        required
                                                    />
                                                    <span className="input-group-text">.00</span>
                                                    <div className="invalid-feedback">Por favor ingresa el precio.</div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="estado" className="form-label">Estado</label>
                                                <select className="form-select" id="estado" required defaultValue="">
                                                    <option value="" disabled>Elegir...</option>
                                                    <option value="Verde">Verde</option>
                                                    <option value="Maduro">Maduro</option>
                                                </select>
                                                <div className="invalid-feedback">Por favor valida el estado.</div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <button className="w-100 btn btn-lg" type="submit" style={{ backgroundColor: '#9C6615', color: 'aliceblue' }}>
                                            Publicar producto
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <footer className="my-5 pt-5 text-body-secondary text-center text-small">
                                <p className="mb-1">&copy; 2017–2024 Mercalista</p>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                                    <li className="list-inline-item"><a href="#">Terms</a></li>
                                    <li className="list-inline-item"><a href="#">Support</a></li>
                                </ul>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </NavBar>
        </>
    )
}

export default PublicarProducto