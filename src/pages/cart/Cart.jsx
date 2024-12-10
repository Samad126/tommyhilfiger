import React, { useEffect, useState } from "react";
import "./ShoppingBagPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function ShoppingBagPage() {
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState("");
    const [appliedPromo, setAppliedPromo] = useState(false);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedItems);
    }, []);

    const handleQuantityChange = (id, newCount) => {
        const updatedCart = [...cartItems];
        const index = updatedCart.findIndex(item => item.id === id);
        if (index !== -1) {
            if (parseInt(newCount) === 0) {
                updatedCart.splice(index, 1);
            } else {
                updatedCart[index].count = parseInt(newCount);
            }
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            setCartItems(updatedCart);
        }
    };

    const handleRemove = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const subtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.count * (1 - curr.discount / 100), 0);
    const totalItems = cartItems.reduce((acc, curr) => acc + curr.count, 0);

    let extraDiscount = 0;
    if (subtotal >= 250) {
        extraDiscount = 0.40;
    } else if (subtotal >= 150) {
        extraDiscount = 0.30;
    } else if (subtotal >= 125) {
        extraDiscount = 0.15;
    }

    const discountAmount = subtotal * extraDiscount;
    const shipping = 0;
    const tax = 0;
    const estimatedTotal = subtotal - discountAmount + shipping + tax;

    const handleApplyPromo = () => {
        if (promoCode.trim() !== "") {
            setAppliedPromo(true);
        } else {
            setAppliedPromo(false);
        }
    };

    const finalTotal = appliedPromo ? estimatedTotal - 5 : estimatedTotal;

    return (
        <div className="container my-4">
            <p className="mb-0">Free shipping on orders of $100+ <a href="#">Details</a></p>
            <p className="mb-2">Holiday Returns<br />Any purchase made from Nov 1, 2024 - Dec 24, 2024 may be returned through Jan 31, 2025.</p>

            <div className="row">
                <div className="col-12 col-lg-8">
                    {cartItems.length > 0 ? cartItems.map(item => {
                        const itemSubtotal = item.price * (1 - item.discount / 100) * item.count;
                        return (
                            <div key={item.id} className="py-3 border-bottom">
                                <h2 className="h4">Shopping Bag <span>({totalItems} {totalItems === 1 ? 'item' : 'items'})</span></h2>
                                <p className="text-muted" style={{ fontSize: "0.9em" }}>Items in bag are not reserved and may sell out. Order now.</p>

                                <div className="d-flex">
                                    <img src={item.images[0]} alt={item.name} style={{ width: "150px", marginRight: "20px" }} />
                                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                                        <div>
                                            <h4 className="h6 mb-1">{item.name}</h4>
                                            <p className="mb-1 text-muted" style={{ fontSize: "0.9em" }}>{item.Colors[0]} | {item.Size[0]}</p>
                                            <p className="mb-1" style={{ fontSize: "0.9em" }}>
                                                <s>${(item.price * item.count).toFixed(2)}</s> <span style={{ fontWeight: "bold" }}>${itemSubtotal.toFixed(2)}</span>
                                            </p>
                                            <p className="mb-1 text-success" style={{ fontSize: "0.9em" }}>In Stock: Ships in 1-2 business days</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start gap-3 mt-2" style={{ fontSize: "0.9em" }}>
                                            <a href="#" className="text-decoration-underline">Edit</a>
                                            <a href="#" className="text-decoration-underline">Save for Later</a>
                                            <a href="#" className="text-decoration-underline" onClick={() => handleRemove(item.id)}>Remove</a>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='selectSection d-flex flex-column w-25'>
                                            <label htmlFor={`count-${item.id}`} className="form-label" style={{ fontSize: "0.8em", color: "#00174f" }}>Qty</label>
                                            <select
                                                id={`count-${item.id}`}
                                                value={item.count}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                style={{ width: "60px", border: "1px solid #00174f", padding: "5px", color: "#00174f", fontSize: "0.9em" }}
                                            >
                                                {[...Array(5)].map((_, i) => (
                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <p>Your bag is empty.</p>
                    )}

                    {cartItems.length > 0 && (
                        <div className="mt-4">
                            <a href="#" className="text-decoration-underline" style={{ fontSize: "0.9em" }}>Gift Options</a>
                        </div>
                    )}
                </div>

                <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="border p-3">
                        <h2 className="h5 mb-3">Order Summary</h2>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {extraDiscount > 0 && (
                            <div className="mb-2" style={{ fontSize: "0.85em", color: "#00174f" }}>
                                Extra {extraDiscount * 100}% Off {extraDiscount === 0.40 ? "$250+" : extraDiscount === 0.30 ? "$150+" : "$125+"}
                            </div>
                        )}
                        {extraDiscount > 0 && (
                            <div className="d-flex justify-content-between mb-2">
                                <span>Discount</span>
                                <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mb-2">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Tax</span>
                            <span>Calculated at checkout</span>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="promoCode" className="form-label" style={{ fontSize: "0.9em" }}>Promo Code</label>
                            <div className="d-flex gap-2 mb-2">
                                <input
                                    type="text"
                                    id="promoCode"
                                    className="form-control"
                                    placeholder="Enter Your Promo Code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button
                                    className="btn btn-outline-primary"
                                    style={{ fontSize: "0.9em" }}
                                    onClick={handleApplyPromo}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Estimated Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>

                        {appliedPromo && <p style={{ fontSize: "0.8em", color: "green" }}>Promo Applied: -$5.00</p>}

                        <p style={{ fontSize: "0.8em" }} className="mb-3">
                            4 interest-free payments of ${(finalTotal / 4).toFixed(2)} with Klarna. <a href="#" style={{ fontSize: "0.8em" }}>Learn More</a>
                            <br />
                            or 4 interest-free payments of ${(finalTotal / 4).toFixed(2)} with afterpay <span style={{ fontSize: "0.8em" }}>&#10230;</span>
                        </p>

                        <button className="btn btn-success w-100" style={{ fontSize: "1em", padding: "10px 0" }}>Go to checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingBagPage;
