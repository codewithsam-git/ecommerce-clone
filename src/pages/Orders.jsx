import React, { useEffect, useState } from 'react';

function CheckoutPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        // console.log(savedCart);
        setCart(savedCart);
    }, []);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleConfirmOrder = () => {
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

        const newOrder = {
            id: Date.now(),
            items: cart,
            total: calculateTotal(),
            date: new Date().toLocaleString(),
        };
        console.log(newOrder);
        savedOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(savedOrders));
        localStorage.removeItem('cart');
        setCart([]);
        alert("Your order has been confirmed!");
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Review Your Order</h2>

            {cart.length === 0 ? (
                <div className="col-12 text-center">
                    <p>Your cart is empty. Please add items to your cart.</p>
                </div>
            ) : (
                <>
                    <div className="row">
                        {cart.map((product) => (
                            <div key={product.id} className="col-12 col-md-6 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={product.images[0]}
                                        className="card-img-top"
                                        alt={product.title}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">Price: Rs. {product.price}/-</p>
                                        <p className="card-text">Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <h5>Total: Rs. {calculateTotal()}/-</h5>
                        <button
                            className="btn btn-success"
                            onClick={handleConfirmOrder}
                        >
                            Confirm Order
                        </button>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        {/* <button
                            className="btn btn-danger"
                            onClick={() => alert("Order has been canceled!")}
                        >
                        Cancel Order
                    </button> */}
                </div>
        </>
    )
}
        </div >
    );
}

export default CheckoutPage;
