import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
        setReviews(storedReviews[product.id] || []);
    }, [product.id]);

    const handleAddToCart = (product) => {
        if (!user) {
            alert("Please login");
            navigate('/login');
            return;
        }

        setCart(prevCart => {
            const existing = prevCart.findIndex(item => item.id === product.id);
            const newCart = existing > -1
                ? prevCart.map((item, i) =>
                    i === existing ? { ...item, quantity: item.quantity + 1 } : item
                )
                : [...prevCart, { ...product, quantity: 1 }];

            //localstotage
            localStorage.setItem("cart", JSON.stringify(newCart));
            // console.log(localStorage.getItem('cart'));
            return newCart;
        });

        alert(`${product.title} has been added to your cart.`);
    };

    const handleAddReview = () => {
        if (loading) {
            return;
        }
        if (!user) {
            alert("Login Please.");
            return;
        }
        if (newReview.trim() === "") return alert("Please enter a review.");
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        const allReviews = JSON.parse(localStorage.getItem('reviews')) || {};
        allReviews[product.id] = updatedReviews;
        localStorage.setItem('reviews', JSON.stringify(allReviews));
        setNewReview("");
    };

    if (loading) {
        return null;
    }

    return (
        <>
            <div className="col-6 col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                    <div onClick={() => setShowDetails(true)} style={{ cursor: "pointer" }}>
                        <img src={product.images[0]} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "cover" }} />
                    </div>
                    <div className="card-body d-flex flex-column">
                        <span className="badge bg-secondary mb-2">{product.category?.name}</span>
                        <h6 className="card-title" onClick={() => setShowDetails(true)} style={{ cursor: "pointer" }}>{product.title}</h6>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                            <h5 className="text-success mb-0">Rs. {product.price}/-</h5>
                            <button onClick={() => handleAddToCart(product)} className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "32px", height: "32px", backgroundColor: "black", color: "white", border: "2px solid black" }}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showDetails && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{product.title}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDetails(false)}></button>
                            </div>
                            <div className="modal-body">
                                <img src={product.images[0]} className="img-fluid mb-3 w-50" alt={product.title} />
                                <p><strong>Category:</strong> {product.category?.name}</p>
                                <h4 className="text-success">Rs. {product.price}</h4>
                                <p>{product.description}</p>

                                <hr />
                                <h6>Add a Review:</h6>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Write your review" />
                                    <button className="btn btn-primary" onClick={handleAddReview}>Submit</button>
                                </div>

                                <h6>Customer Reviews:</h6>
                                {reviews.length > 0 ? (
                                    <ul className="">
                                        {reviews.map((r, i) => (
                                            <li key={i} className="">{r}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted">No reviews</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductCard;