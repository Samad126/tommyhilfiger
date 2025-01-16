import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cartcanvas.css"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCartCount } from '../../../redux/productsSlice';

function Cartcanvas({ show, handleClose }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedItems);
    }, [show]);

    const dispatch = useDispatch();

    const getDiscountedPrice = (price, discount) => {
        const discounted = price - (price * discount / 100);
        return discounted.toFixed(2);
    }

    const handleQuantityChange = (id, newCount) => {
        let updatedCart = [...cartItems];
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
        dispatch(updateCartCount());
    }

    const handleRemove = (id) => {
        let updatedCart = cartItems.filter(item => item.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        dispatch(updateCartCount());
    }

    const totalItems = cartItems.reduce((acc, curr) => acc + curr.count, 0);
    const subtotal = cartItems.reduce((acc, curr) => {
        const discounted = getDiscountedPrice(curr.price, curr.discount);
        return acc + (curr.count * discounted);
    }, 0);

    return (
        <Offcanvas show={show} onHide={() => handleClose("basket")} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id='cartTitle'>Shopping Bag</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length > 0 ? (
                    <>
                        <div id='cartItems' className='d-flex flex-column gap-5 overflow-auto'>
                            {cartItems.map((item, index) => (
                                <div key={index} className='d-flex justify-content-between gap-4'>
                                    <Link to={`/products/details/${item.id}`} onClick={() => handleClose("basket")}>
                                        <img className='cartImg' src={item.images[0]} alt={item.name} />
                                    </Link>
                                    <div className='d-flex flex-column justify-content-between infoWrapper'>
                                        <div className='cartItemInfo'>
                                            <h4>{item.name}</h4>
                                            <p className='sizeColor'>
                                                {item.selectedColor || "Color"} | {item.selectedSize || "Size"}
                                            </p>
                                            <p className='discountPrice d-flex gap-3'>
                                                ${item.price.toFixed(2)}
                                                <span>${getDiscountedPrice(item.price, item.discount)}</span>
                                            </p>
                                        </div>
                                        <div className='d-flex align-items-end justify-content-between selectWrapper'>
                                            <div className='selectSection d-flex flex-column'>
                                                <label htmlFor={`countSelector-${item.id}`}>Qty</label>
                                                <select
                                                    id={`countSelector-${item.id}`}
                                                    value={item.count}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                >
                                                    <option value="0">0</option>
                                                    {[...Array(5)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id='checkoutSection'>
                            <div className='d-flex align-items-center justify-content-between totalPrice'>
                                <h2>Subtotal <span>{totalItems} {totalItems === 1 ? "Item" : "Items"}</span></h2>
                                <p className='m-0'>${subtotal.toFixed(2)}</p>
                            </div>
                            <Link onClick={() =>handleClose("basket")} to={"cart"} id='checkoutBtn'>Review + Checkout</Link>
                            <p id='taxes'>Shipping & Taxes Calculated at Checkout</p>
                        </div>
                    </>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Cartcanvas;
