import React, { useEffect, useState } from 'react';

function CartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity <= 0) return;

        const updatedCart = cart.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        console.log(updatedCart);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        alert("Proceeding to checkout");
        localStorage.removeItem('cart');
        setCart([]);
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Your Cart</h2>
            <div className="row">
                {cart.length === 0 ? (
                    <div className="col-12 text-center">Your cart is empty.</div>
                ) : (
                    cart.map((product) => (
                        <div key={product.id} className="col-12 col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={product.images[0]}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-title">{product.title}</h6>
                                    <h5 className="text-primary mb-0">Rs. {product.price}/-</h5>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div className="d-flex align-items-center">
                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <input 
                                                type="number" 
                                                className="form-control mx-2" 
                                                value={product.quantity} 
                                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                                style={{ width: '50px' }} 
                                            />
                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveItem(product.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="d-flex justify-content-between mt-4">
                    <h5>Total: Rs. {calculateTotal()}/-</h5>
                    <button 
                        className="btn btn-success"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
