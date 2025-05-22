import type React from "react"
import "./Footer.css"

const Footer: React.FC = () => {
  return (
   <>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Información de la tienda */}
          <div className="footer-section">
            <h3 className="footer-title">MercaLista</h3>
            <p className="footer-text">
              Tu tienda online de confianza para encontrar los mejores productos al mejor precio.
            </p>
          </div>

          {/* Enlaces importantes */}
          <div className="footer-section">
            <h3 className="footer-title">Enlaces</h3>
            <ul className="footer-links">
              <li>
                <a href="/" className="footer-link">
                  Página de inicio
                </a>
              </li>
              <li>
                <a href="/manual-tecnico" className="footer-link">
                  Manual técnico
                </a>
              </li>
              <li>
                <a href="/manual-usuario" className="footer-link">
                  Manual de usuario
                </a>
              </li>
            </ul>
          </div>

          {/* Equipo de desarrollo */}
          <div className="footer-section">
            <h3 className="footer-title">Equipo de desarrollo</h3>
            <ul className="footer-team">
              <li>Sebastian Caballero - Scrum Master</li>
              <li>Brayan Puerta - Developer</li>
              <li>Sebastian Muñoz - Developer</li>
              <li>Juliana Morales - Developer</li>
              <li>Samuel Alvares - Developer</li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h3 className="footer-title">Contacto</h3>
            <p className="footer-text">¿Tienes alguna pregunta? Contáctanos.</p>
            <div className="footer-social">
              <a href="https://github.com/mi-ecommerce" aria-label="GitHub" className="social-icon github-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="mailto:info@mi-ecommerce.com" aria-label="Email" className="social-icon email-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <a href="https://linkedin.com/company/mi-ecommerce" aria-label="LinkedIn" className="social-icon linkedin-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} MercaLista. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </>
  )
}

export default Footer
