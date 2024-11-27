import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import demonigga from "../../../assets/demonigga.jpeg"

import "./searchcanvas.css"
import { Link } from 'react-router-dom';
import { IoStar } from 'react-icons/io5';

function Searchcanvas({ show, handleClose }) {
    return (
        <div>
            <Offcanvas show={show} onHide={() => handleClose("search")} placement="end">
                <Offcanvas.Header closeButton>
                    <div className='d-flex align-items-center w-100 gap-2'>
                        <FaMagnifyingGlass />
                        <input type="search" placeholder='What are you looking for...' style={{ outline: 0 }} className='w-100 border-0' />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className='mt-5'>
                    <h2 className='searchTitle'>Popular Categories</h2>
                    <div className='d-flex flex-column gap-3 popularCateg'>
                        <Link>Kids' Clothing & Accessories</Link>
                        <Link>Kids' Clothing & Accessories</Link>
                        <Link>Kids' Clothing & Accessories</Link>
                        <Link>Kids' Clothing & Accessories</Link>
                    </div>
                    <h2 className='searchTitle'>Featured Best Sellers</h2>
                    <div className='d-flex flex-wrap justify-content-between shortResult'>
                        <Link>
                            <img src={demonigga} alt="" />
                            <div>
                                <h4>Lightweight Packable Jacket</h4>
                                <p>$59.99</p>
                                <div className='d-flex gap-1 stars'>
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </Link>
                        <Link>
                            <img src={demonigga} alt="" />
                            <div>
                                <h4>Lightweight Packable Jacket</h4>
                                <p>$59.99</p>
                                <div className='d-flex gap-1 stars'>
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </Link>
                        <Link>
                            <img src={demonigga} alt="" />
                            <div>
                                <h4>Lightweight Packable Jacket</h4>
                                <p>$59.99</p>
                                <div className='d-flex gap-1 stars'>
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </Link>
                        <Link>
                            <img src={demonigga} alt="" />
                            <div>
                                <h4>Lightweight Packable Jacket</h4>
                                <p>$59.99</p>
                                <div className='d-flex gap-1 stars'>
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Searchcanvas;
