import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cartcanvas.css"

import demoforcart from "../../../assets/demoforcart.webp"
import { Link } from 'react-router-dom';

function Cartcanvas({ show, handleClose }) {
    return (
        <Offcanvas show={show} onHide={() => handleClose("basket")} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id='cartTitle'>Shopping Bag</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div id='cartItems' className='d-flex flex-column gap-5 overflow-auto'>
                    <div className='d-flex justify-content-between'>
                        <Link>
                            <img className='cartImg' src={demoforcart} alt="loafer" />
                        </Link>
                        <div className='d-flex flex-column justify-content-between infoWrapper'>
                            <div className='cartItemInfo'>
                                <h4>Lightweight Suede Loafers</h4>
                                <p className='sizeColor'>Navy | XXXL</p>
                                <p className='discountPrice'>$149.00 <span>$89.40</span></p>
                            </div>
                            <div className='d-flex align-items-end justify-content-between selectWrapper'>
                                <div className='selectSection d-flex flex-column'>
                                    <label htmlFor="countSelector">Qty</label>
                                    <select name="" id="countSelector">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">5</option>
                                    </select>
                                </div>
                                <button>Remove</button>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <Link>
                            <img className='cartImg' src={demoforcart} alt="loafer" />
                        </Link>
                        <div className='d-flex flex-column justify-content-between infoWrapper'>
                            <div className='cartItemInfo'>
                                <h4>Lightweight Suede Loafers</h4>
                                <p className='sizeColor'>Navy | XXXL</p>
                                <p className='discountPrice'>$149.00 <span>$89.40</span></p>
                            </div>
                            <div className='d-flex align-items-end justify-content-between selectWrapper'>
                                <div className='selectSection d-flex flex-column'>
                                    <label htmlFor="countSelector">Qty</label>
                                    <select name="" id="countSelector">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">5</option>
                                    </select>
                                </div>
                                <button>Remove</button>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <Link>
                            <img className='cartImg' src={demoforcart} alt="loafer" />
                        </Link>
                        <div className='d-flex flex-column justify-content-between infoWrapper'>
                            <div className='cartItemInfo'>
                                <h4>Lightweight Suede Loafers</h4>
                                <p className='sizeColor'>Navy | XXXL</p>
                                <p className='discountPrice'>$149.00 <span>$89.40</span></p>
                            </div>
                            <div className='d-flex align-items-end justify-content-between selectWrapper'>
                                <div className='selectSection d-flex flex-column'>
                                    <label htmlFor="countSelector">Qty</label>
                                    <select name="" id="countSelector">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">5</option>
                                    </select>
                                </div>
                                <button>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='checkoutSection'>
                    <div className='d-flex align-items-center justify-content-between totalPrice'>
                        <h2>Subtotal <span>3 Items</span></h2>
                        <p className='m-0'>$158.90</p>
                    </div>
                    <button id='checkoutBtn'>Review + Checkout</button>
                    <p id='taxes'>Shipping & Taxes Calculated at Checkout</p>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Cartcanvas;
