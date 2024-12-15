import React, { useEffect, useState } from "react";
import "./ShoppingBagPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import members from "../../assets/tommyLittle.webp"
import { Link } from "react-router-dom";

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
            <div id='members' className='d-flex justify-content-between align-items-center gap-3 mb-4 maxWidthMember'>
                <img src={members} alt="members" />
                <p className='m-0'>Members get an extra 20% off $200+ or 15% off $150+ Sign in for this exclusive offer. Not a member? Sign up now!</p>
            </div>
            <div className="row justify-content-md-between">
                <div className="col-12 col-lg-7">
                    <h2 className="lightColorText fw-bolder">Shopping Bag <span className="fs-6">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span></h2>
                    <p className="lightColorText">Items in bag are not reserved and may sell out. Order now.</p>
                    {cartItems.length > 0 ? cartItems.map(item => {
                        const itemSubtotal = item.price * (1 - item.discount / 100) * item.count;
                        return (
                            <div key={item.id} className="py-4 border-top">
                                <div className="d-flex gap-3 mb-4 mb-md-0">
                                    <img style={{ height: "150px" }} src={item.images[0]} alt={item.name} />
                                    <div className="w-100">
                                        <div className="h-100 d-flex flex-column justify-content-between">
                                            <div className="d-flex flex-column justify-content-between h-100 flex-md-row align-items-md-start">
                                                <div>
                                                    <h4 className="fs-6 lightColorText fw-normal">{item.name}</h4>
                                                    <p>{item.Colors[0]} | {item.Size[0]}</p>
                                                </div>
                                                {/* <p>In Stock: Ships in 1-2 business days</p> */}
                                                <div className="d-flex justify-content-between align-items-start flex-md-column align-items-md-center">
                                                    <div className='selectSection d-flex flex-column w-25 fromcartSelection'>
                                                        <label htmlFor={`count-${item.id}`} className="form-label" style={{ fontSize: "0.8em", color: "#00174f" }}>Qty</label>
                                                        <select
                                                            id={`count-${item.id}`}
                                                            value={item.count}
                                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                            style={{ width: "100%", height: "100%", border: "1px solid #00174f", padding: "20px 15px 5px 15px", color: "#00174f", fontSize: "0.9em" }}
                                                        >
                                                            {[...Array(5)].map((_, i) => (
                                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <p className="d-flex flex-column m-0 flex-md-row gap-md-3">
                                                        <s>${(item.price * item.count).toFixed(2)}</s> <span>${itemSubtotal.toFixed(2)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-none d-md-flex justify-content-between">
                                                <a className="text-decoration-underline text-body-secondary" href="#">Edit</a>
                                                <div className="d-flex gap-3">
                                                    <a className="text-decoration-underline text-body-secondary" href="#">Save for Later</a>
                                                    <a className="text-decoration-underline text-body-secondary" href="#" onClick={() => handleRemove(item.id)}>Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between d-md-none">
                                    <a className="text-decoration-underline text-body-secondary" href="#">Edit</a>
                                    <div className="d-flex gap-3">
                                        <a className="text-decoration-underline text-body-secondary" href="#">Save for Later</a>
                                        <a className="text-decoration-underline text-body-secondary" href="#" onClick={() => handleRemove(item.id)}>Remove</a>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <p>Your bag is empty.</p>
                    )}

                    {cartItems.length > 0 && (
                        <div className="mt-4">
                            <a href="#" style={{ fontSize: "0.9em" }}>Gift Options</a>
                        </div>
                    )}
                </div>

                <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                    <div>
                        <h2 className="h5 mb-3 lightColorText fw-bolder">Order Summary</h2>
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
                        <Link to={'/checkout'} className="btn btn-success w-100" style={{ fontSize: "1em", padding: "10px 0" }}>Go to checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingBagPage;
