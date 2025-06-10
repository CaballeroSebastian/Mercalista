import React, { useState } from 'react';
import './ShoppingCart.css';
import NavBar from '../LoggedNav/LoggedNav';
import { Trash2, ArrowLeft } from 'lucide-react'; // Añadir ArrowRight
import { Link } from 'react-router-dom'; // Añadir Link
import { useAuth } from '../../Context/AuthContext'; // Añadir useAuth

interface CartItem {
  id: number;
  name: string;
  specs: string;
  image: string;
  quantity: number;
  price: number;
}

const ShoppingCart: React.FC = () => {
  const { user } = useAuth(); // Obtener el usuario actual

  // Estados
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Iphone 11 pro",
      specs: "256GB, Navy Blue",
      image: "https://i.imgur.com/QRwjbm5.jpg",
      quantity: 2,
      price: 900
    },
    {
      id: 2,
      name: "Iphone 11 pro",
      specs: "256GB, Navy Blue",
      image: "https://i.imgur.com/QRwjbm5.jpg",
      quantity: 2,
      price: 1200
    },

    
  ]);

  // Manejadores de eventos
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

  // Funciones de cálculo
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    // Puedes ajustar la lógica del shipping según tus necesidades
    return cartItems.length > 0 ? 20 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  // Renderizado
  return (
    <>
      <NavBar>
        <div className="main-wrapper min-vh-100 bg-light py-2">
          <div className="container-xxl">
            <div className="container mt-5 p-3 rounded cart">
              <div className="row no-gutters">
                
                {/* Columna izquierda - Detalles del carrito */}
                <div className="col-md-8">
                  <div className="product-details mr-2">
                    {/* Encabezado */}
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

                    {/* Información del carrito */}
                    <h6 className="mb-0">Shopping cart</h6>
                    <div className="d-flex justify-content-between">
                      <span>Tienes {cartItems.length} artículos en tu carrito</span>
                      <div className="d-flex flex-row align-items-center">
                        <span className="text-black-50">Ordenar por:</span>
                        <div className="price ml-2">
                          <span className="mr-1">precio</span>
                          <i className="fa fa-angle-down"></i>
                        </div>
                      </div>
                    </div>

                    {/* Lista de productos */}
                    {cartItems.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                        {/* Información del producto */}
                        <div className="d-flex flex-row">
                          <img className="rounded" src={item.image} width="40" alt={item.name} />
                          <div className="ml-2">
                            <span className="font-weight-bold d-block">{item.name}</span>
                            <span className="spec">{item.specs}</span>
                          </div>
                        </div>

                        {/* Controles de cantidad y precio */}
                        <div className="d-flex flex-row align-items-center">
                          <div className="quantity-controls d-flex align-items-center">
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, -1)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <i className="fa fa-plus"></i>
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

                {/* Columna derecha - Información de pago */}
                <div className="col-md-4">
                  <div className="payment-info">
                    {/* Encabezado de pago */}
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Detalles de la tarjeta</span>
                    </div>

                    {/* Selección de tipo de tarjeta */}
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

                    {/* Formulario de tarjeta */}
                    <div>
                      <label className="credit-card-label">Nombre en la tarjeta</label>
                      <input type="text" className="form-control credit-inputs" placeholder="Name" />
                    </div>

                    <div>
                      <label className="credit-card-label">Número de tarjeta</label>
                      <input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label className="credit-card-label">Date</label>
                        <input type="text" className="form-control credit-inputs" placeholder="12/24" />
                      </div>
                      <div className="col-md-6">
                        <label className="credit-card-label">CVV</label>
                        <input type="text" className="form-control credit-inputs" placeholder="342" />
                      </div>
                    </div>

                    <hr className="line" />

                    {/* Resumen de la orden - Actualizar esta sección */}
                    <div className="d-flex justify-content-between information">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between information">
                      <span>Shipping</span>
                      <span>${calculateShipping().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between information">
                      <span>Total(Incl. taxes)</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>

                    {/* Botón de checkout - Actualizar esta sección */}
                    <button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button">
                      <span>${calculateTotal().toFixed(2)}</span>
                      <span>
                        Checkout
                        <i className="fa fa-long-arrow-right ml-1"></i>
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </NavBar>
  </>
  );
};

export default ShoppingCart;