import React from 'react';
import './ShoppingCart.css';
import NavBar from '../LoginNavbar/LoginNavbar';


interface CartItem {
  id: number;
  name: string;
  specs: string;
  image: string;
  quantity: number;
  price: number;
}

const ShoppingCart: React.FC = () => {
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Iphone 11 pro",
      specs: "256GB, Navy Blue",
      image: "https://i.imgur.com/QRwjbm5.jpg",
      quantity: 2,
      price: 900
    },
  ];

  return (
    <>
       <NavBar>
            <div className="main-wrapper min-vh-100 bg-light py-5">
            <div className="container-xxl">
                <div className="container mt-5 p-3 rounded cart">
                <div className="row no-gutters">
                    <div className="col-md-8">
                    <div className="product-details mr-2">
                        <div className="d-flex flex-row align-items-center">
                        <i className="fa fa-long-arrow-left"></i>
                        <span className="ml-2">Continue Shopping</span>
                        </div>
                        <hr />
                        <h6 className="mb-0">Shopping cart</h6>
                        <div className="d-flex justify-content-between">
                        <span>You have {cartItems.length} items in your cart</span>
                        <div className="d-flex flex-row align-items-center">
                            <span className="text-black-50">Sort by:</span>
                            <div className="price ml-2">
                            <span className="mr-1">price</span>
                            <i className="fa fa-angle-down"></i>
                            </div>
                        </div>
                        </div>

                        {cartItems.map((item) => (
                        <div key={item.id} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                            <div className="d-flex flex-row">
                            <img className="rounded" src={item.image} width="40" alt={item.name} />
                            <div className="ml-2">
                                <span className="font-weight-bold d-block">{item.name}</span>
                                <span className="spec">{item.specs}</span>
                            </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                            <span className="d-block">{item.quantity}</span>
                            <span className="d-block ml-5 font-weight-bold">${item.price}</span>
                            <i className="fa fa-trash-o ml-3 text-black-50"></i>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="col-md-4">
                    <div className="payment-info">
                        <div className="d-flex justify-content-between align-items-center">
                        <span>Card details</span>
                        <img className="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30" alt="card" />
                        </div>
                        
                        <span className="type d-block mt-3 mb-1">Card type</span>
                        
                        {['mastercard', 'visa', 'amex', 'paypal'].map((card) => (
                        <label key={card} className="radio">
                            <input type="radio" name="card" value="payment" defaultChecked={card === 'mastercard'} />
                            <span>
                            <img 
                                width="30" 
                                src={`https://img.icons8.com/${card === 'mastercard' ? 'color' : 'officel'}/48/000000/${card}.png`}
                                alt={card}
                            />
                            </span>
                        </label>
                        ))}

                        <div>
                        <label className="credit-card-label">Name on card</label>
                        <input type="text" className="form-control credit-inputs" placeholder="Name" />
                        </div>

                        <div>
                        <label className="credit-card-label">Card number</label>
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

                        <div className="d-flex justify-content-between information">
                        <span>Subtotal</span>
                        <span>$3000.00</span>
                        </div>
                        <div className="d-flex justify-content-between information">
                        <span>Shipping</span>
                        <span>$20.00</span>
                        </div>
                        <div className="d-flex justify-content-between information">
                        <span>Total(Incl. taxes)</span>
                        <span>$3020.00</span>
                        </div>

                        <button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button">
                        <span>$3020.00</span>
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