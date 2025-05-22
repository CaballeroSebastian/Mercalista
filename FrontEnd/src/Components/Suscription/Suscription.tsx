import "./Suscription.css";
import NavBar from "../LoggedNav/LoggedNav";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Opcional: Importar JavaScript de Bootstrap

function Suscription() {
  return (
    <>
      <NavBar>
        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
          <symbol id="check" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </symbol>
        </svg>
        {/* Contenedor de productos */}
        <h2 className="titleSus">Suscripciones</h2>
        <div className="container-suscripcion" id="contenedor-productos">
          <div className="container-cards">
            <div className="container-py-6">
              <main>
                {/* Planes de suscripción */}
                <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                  <div className="cont-1 col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                      <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">Mensual</h4>
                      </div>
                      <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                          $20.000
                          <small className="text-body-secondary fw-light">
                            /Cop
                          </small>
                        </h1>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>Producto promocionado</li>
                          <li>Verificación en la cuenta</li>
                          <li>‎ </li>
                          <li>‎</li>
                        </ul>
                        <button
                          type="button"
                          className="mensualcompra boton-c btn btn-lg "
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cont-2 col">
                    <div className="card mb-4 rounded-3 shadow-sm border-anualcompra">
                      <div className="card-header py-3 anualcompra">
                        <h4 className="my-0 anualcompra">Anual</h4>
                      </div>
                      <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                          $201.600
                          <small className="text-body-secondary fw-light">
                            /Cop
                          </small>
                        </h1>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>Producto promocionado</li>
                          <li>Verificación en la cuenta</li>
                          <li>Descuento de suscripción</li>
                          <li>Atención prioritaria</li>
                        </ul>
                        <button
                          type="button"
                          className="b-anualcompra boton-c btn btn-lg anualcompra"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparar planes */}
                <h2 className="display-6 text-center mb-3">Comparar Planes</h2>
                <div className="table-responsive">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th style={{ width: "34%" }}></th>
                        <th style={{ width: "22%" }}>Mensual</th>
                        <th style={{ width: "22%" }}>Anual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" className="text-start">
                          Producto promocionado
                        </th>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="#check" />
                          </svg>
                        </td>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="#check" />
                          </svg>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">
                          Verificacion en la cuenta
                        </th>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="#check" />
                          </svg>
                        </td>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="#check" />
                          </svg>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">
                          Descuento en la suscripcion
                        </th>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="" />
                          </svg>
                        </td>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="#check" />
                          </svg>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">
                          Atencion prioritaria
                        </th>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="" />
                          </svg>
                        </td>
                        <td>
                          <svg className="bi" width="24" height="24">
                            <use xlinkHref="#check" />
                          </svg>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        </div>
      </NavBar>
    </>
  );
}
export default Suscription;
