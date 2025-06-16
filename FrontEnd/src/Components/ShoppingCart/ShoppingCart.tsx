import React, { useState, useEffect } from 'react';
import './ShoppingCart.css';
import NavBar from '../LoggedNav/LoggedNav';
import { Trash2, ArrowLeft, Plus, Minus, ShoppingCart as CartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import cilantro from './480250694_122198876288243954_6597085174549642507_n.jpg';
import papa from './papa.jpg';

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  Cantidad: number;
}

const ShoppingCart: React.FC = () => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Cilantro Largo",
      image: cilantro,
      quantity: 1,
      price: 1200,
      Cantidad: 100
    },
        {
      id: 2,
      name: "Papa Pastusa",
      image: papa,
      quantity: 1,
      price: 12300000,
      Cantidad: 10
    },
  ]);

const [cardName, setCardName] = useState('');
const [cardNumber, setCardNumber] = useState('');
const [cardDate, setCardDate] = useState('');
const [cardCVV, setCardCVV] = useState('');

const [errors, setErrors] = useState({
  cardName: '',
  cardNumber: '',
  cardDate: '',
  cardCVV: ''
});

const [showSuccess, setShowSuccess] = useState(false);
const [showPaymentModal, setShowPaymentModal] = useState(false);

// Estado para la alerta tipo toast
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Función para mostrar la alerta
  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateExtras = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 0 ? subtotal * 0.6 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateExtras();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showAlert('No hay productos en el carrito');
      return;
    }

    const newErrors = {
      cardName: '',
      cardNumber: '',
      cardDate: '',
      cardCVV: ''
    };

    const nameRegex = /^[a-zA-Z\s]+$/;
    const cardNumRegex = /^\d{16}$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3,4}$/;

    if (!cardName.trim()) {
      newErrors.cardName = 'El nombre es obligatorio.';
    } else if (!nameRegex.test(cardName)) {
      newErrors.cardName = 'El nombre solo puede contener letras y espacios.';
    }

    if (!cardNumRegex.test(cardNumber)) {
      newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
    }

    if (!dateRegex.test(cardDate)) {
      newErrors.cardDate = 'La fecha debe tener el formato MM/YY.';
    }

    if (!cvvRegex.test(cardCVV)) {
      newErrors.cardCVV = 'El CVV debe tener 3 o 4 dígitos.';
    }

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every(error => error === '');
    if (isValid) {
      setShowSuccess(true);
    }
  };

  // Botón flotante de carrito
  const FloatingCartButton: React.FC<{ total: number; onClick: () => void; itemCount: number }> = ({ total, onClick, itemCount }) => (
    <button
      className="floating-cart-btn"
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 3000,
        background: '#fff',
        border: '2px solidrgb(95, 140, 23)',
        borderRadius: '50px',
        padding: '12px 24px',
        boxShadow: '0 2px 8px  a(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontWeight: 600,
        fontSize: 18,
      }}
    >
      <CartIcon size={28} color="#bcbf29" />
      <span style={{ color: 'black' }}>${total.toFixed(2)}</span>
      {itemCount > 0 && (
        <span
          style={{
            background: '#dc3545',
            color: '#fff',
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            marginLeft: 4,
          }}
        >
          {itemCount}
        </span>
      )}
    </button>
  );

  // Estado para responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1350);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1350);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Renderiza el bloque de pago (columna derecha)
  function renderPaymentInfo() {
    return (
      <div className="payment-info">
        <div className="d-flex justify-content-between align-items-center">
          <span>Detalles de la tarjeta</span>
        </div>  

        <span className="type d-block mt-3 mb-1">Tipo de tarjeta</span>
        <div className="radio-container">
          {['mastercard', 'visa', 'amex', 'paypal'].map((card) => (
            <label key={card} className="radio">
              <input 
                type="radio" 
                name="card" 
                value="payment" 
                defaultChecked={card === 'mastercard'} 
              />
              <span>
                <img 
                  src={`https://img.icons8.com/${card === 'mastercard' ? 'color' : 'officel'}/48/000000/${card}.png`}
                  alt={card}
                />
              </span>
            </label>
          ))}
        </div>

        {/* Nombre */}
        <div>
          <label className="credit-card-label">Nombre en la tarjeta</label>
          <input
            type="text"
            className={`form-control credit-inputs ${errors.cardName ? 'is-invalid' : ''}`}
            placeholder="Name"
            value={cardName}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
              setCardName(value);
              // Limpiar error si es válido
              if (/^[a-zA-Z\s]+$/.test(value) && value.trim() !== '') {
                setErrors(prev => ({ ...prev, cardName: '' }));
              }
            }}
            maxLength={40}
          />
          {errors.cardName && <div className="text-danger mt-1">{errors.cardName}</div>}
        </div>

        <div>
          <label className="credit-card-label">Número de tarjeta</label>
          <input
            type="text"
            className={`form-control credit-inputs ${errors.cardNumber ? 'is-invalid' : ''}`}
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 16);
              setCardNumber(value);
              if (/^\d{16}$/.test(value)) {
                setErrors(prev => ({ ...prev, cardNumber: '' }));
              }
            }}
            maxLength={16}
          />
          {errors.cardNumber && <div className="text-danger mt-1">{errors.cardNumber}</div>}
        </div>

        <div className="row">
          <div className="col-md-6">
            <label className="credit-card-label">Fecha</label>
            <input
              type="text"
              className={`form-control credit-inputs ${errors.cardDate ? 'is-invalid' : ''}`}
              placeholder="MM/YY"
              value={cardDate}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9/]/g, '');
                if (value.length === 2 && cardDate.length === 1) {
                  value += '/';
                }
                value = value.slice(0, 5);
                setCardDate(value);
                if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
                  setErrors(prev => ({ ...prev, cardDate: '' }));
                }
              }}
              maxLength={5}
            />
            {errors.cardDate && <div className="text-danger mt-1">{errors.cardDate}</div>}
          </div>
          <div className="col-md-6">
            <label className="credit-card-label">CVV</label>
            <input
              type="text"
              className={`form-control credit-inputs ${errors.cardCVV ? 'is-invalid' : ''}`}
              placeholder="342"
              value={cardCVV}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                setCardCVV(value);
                if (/^\d{3,4}$/.test(value)) {
                  setErrors(prev => ({ ...prev, cardCVV: '' }));
                }
              }}
              maxLength={4}
            />
            {errors.cardCVV && <div className="text-danger mt-1">{errors.cardCVV}</div>}
          </div>
        </div>


        <hr className="line" />

        <div className="d-flex justify-content-between information">
          <span>Subtotal (Incl. Iva)</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between information">
          <span>Extras (6%)</span>
          <span>${calculateExtras().toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between information">
          <span>Total (Incl. Extras)</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>

        <button className="btn-buy mt-3" type="button" onClick={handleCheckout}>
          <span>${calculateTotal().toFixed(2)}</span>
          <span>
            Comprar
            <i className="fa fa-long-arrow-right ml-1"></i>
          </span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Toast de alerta */}
      {alertMessage && (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ position: "fixed", top: 20, right: 20, zIndex: 2000 }}
        >
          <div className="toast show align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true" style={{ minWidth: '250px' }}>
            <div className="d-flex">
              <div className="toast-body">{alertMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setAlertMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      
      {showSuccess && (
        <>
          {/* Fondo oscuro detrás del modal */}
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>
          <div
            className="modal fade show"
            style={{ display: 'block', zIndex: 1050 }}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">¡Pago exitoso!</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowSuccess(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Pago procesado con éxito. ¡Gracias por tu compra!</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowSuccess(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal de pago para mobile */}
      {isMobile && showPaymentModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: 'block', zIndex: 2000 }}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalles de pago</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowPaymentModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {renderPaymentInfo()}
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1999 }}
            onClick={() => setShowPaymentModal(false)}
          ></div>
        </>
      )}

      <NavBar>
        <div className="MenuCarrito min-vh-100 py-2">
          <div className="ContenedorpCarrito">
            <div className="ContenedorCarrito">
              <div className="row no-gutters">

                {/* Columna izquierda */}
                <div className="ColumnaIzCarrito col-md-8">
                  <div className="product-details mr-2">
                    <div className="d-flex flex-row align-items-center">
                      <Link 
                        to={`/logged/${user?.username}`} 
                        className="d-flex align-items-center text-decoration-none text-dark"
                      >
                        <ArrowLeft size={20} className="text-dark"/>
                        <span className="ms-3">Continuar Comprando</span>
                      </Link>
                    </div>
                    <hr />
                    <h6 className="mb-0">Carro de compras</h6>
                    <div className="d-flex justify-content-between">
                      <span>Tienes {cartItems.length} artículos en tu carrito</span>
                      <div className="ordenPCarrito d-flex flex-row align-items-center">
                        <span className="text-black-50">Ordenar por:</span>
                        <div className="price ml-2">
                          <span className="mr-1" > Precio</span>
                          <i className="fa fa-angle-down"></i>
                        </div>
                      </div>
                    </div>

                    {cartItems.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                        <div className="d-flex flex-row">
                          <img className="imgCarrito" src={item.image} width="40" alt={item.name} />
                          <div className="ml-2">
                            <span className="font-weight-bold d-block">{item.name}</span>
                            <span className="spec">{item.specs}</span>
                            <span className="badge bg-light text-dark ml-1">Cantidad: {item.Cantidad}</span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center">
                          <div className="quantity-controls d-flex align-items-center">
                            <button 
                              className="btn-carrito btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button 
                              className={`btn-carrito btn-sm btn-outline-secondary${item.quantity >= item.Cantidad ? ' btn-out-of-Cantidad' : ''}`}
                              onClick={() => handleQuantityChange(item.id, 1)}
                              disabled={item.quantity >= item.Cantidad}
                              title={item.quantity >= item.Cantidad ? 'No hay más Cantidades disponible' : 'Agregar uno más'}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="d-block ml-5 font-weight-bold">
                            ${item.price * item.quantity}
                          </span>
                          <button 
                            className="btn btn-link text-danger delete-btn"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Columna derecha solo en desktop */}
                {!isMobile && (
                  <div className="col-md-4">
                    {renderPaymentInfo()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Botón flotante solo en mobile */}
        {isMobile && (
          <FloatingCartButton
            total={calculateTotal()}
            onClick={() => setShowPaymentModal(true)}
            itemCount={cartItems.length}
          />
        )}
      </NavBar>
    </>
  );
};

export default ShoppingCart;
