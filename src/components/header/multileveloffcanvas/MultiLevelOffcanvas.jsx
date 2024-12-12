import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./multicanvas.css"


function MultiLevelOffcanvas({ show, handleClose }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { cats } = useSelector((state) => state.categories);
    console.log(cats);

    function handler() {
        handleClose("main");
        if (show) setSelectedCategory(null);
    }

    const goBackToCategories = () => setSelectedCategory(null);

    return (
        <div className="MultiLevelOffcanvas">
            <Offcanvas show={show} onHide={handler} placement="end" style={{ width: '300px' }}>
                <Offcanvas.Header className="d-flex justify-content-between align-items-center py-2">
                    {selectedCategory ? (
                        <>
                            <button
                                onClick={goBackToCategories}
                                className="btn btn-link p-0 me-3"
                                style={{ textDecoration: 'none', fontSize: '1rem', color: '#000' }}
                            >
                                ← Back
                            </button>
                            <h5 className="m-0" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {selectedCategory.name}
                            </h5>
                        </>
                    ) : (
                        <h5 className="m-0" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                            Menu
                        </h5>
                    )}
                    <button
                        onClick={handler}
                        className="btn btn-link p-0"
                        style={{
                            fontSize: '1.2rem',
                            textDecoration: 'none',
                            color: '#000',
                            fontWeight: 'bold',
                            width: "15%",
                            textAlign: "right"
                        }}
                    >
                        ×
                    </button>
                </Offcanvas.Header>

                <Offcanvas.Body className="p-0">
                    {selectedCategory ? (
                        <>
                            <ul className="list-unstyled m-0 p-0">
                                {selectedCategory.Subcategory && selectedCategory.Subcategory.map(sub => (
                                    <li key={sub.id} className="py-3">
                                        <Link to={`/products/all?subcategoryId=${sub.id}&limit=100`} onClick={handler} className='hamburgerMenuLink'>
                                            {sub.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className="list-unstyled m-0 p-0">
                                {cats?.map(category => (
                                    <li key={category.id} className="py-3" style={{cursor: 'pointer' }}>
                                        {category.Subcategory && category.Subcategory.length > 0 ? (
                                            <div onClick={() => setSelectedCategory(category)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>{category.name}</span>
                                                <span>›</span>
                                            </div>
                                        ) : (
                                            <Link to={`/${category.slug}`} className='hamburgerMenuLink'>
                                                {category.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className='menuSeperator d-flex justify-content-center align-items-center'></div>
                            <div className="py-2">
                                <ul className="list-unstyled">
                                    <li className='py-3'><a className='hamburgerMenuLink' href="/sign-in">Sign In</a></li>
                                    <li className='py-3'><a className='hamburgerMenuLink' href="/create-account">Create Account</a></li>
                                    <li className='py-3'><a className='hamburgerMenuLink' href="/track-order">Track Order</a></li>
                                    <li className='py-3'><a className='hamburgerMenuLink' href="/find-a-store">Find a Store</a></li>
                                    <li className='py-3'><a className='hamburgerMenuLink' href="/customer-service">Customer Service</a></li>
                                </ul>
                            </div>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default MultiLevelOffcanvas;
