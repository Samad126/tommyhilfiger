import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button } from 'react-bootstrap';

const cats = [
    {
        "id": 1,
        "name": "Women",
        "slug": "women",
        "Subcategory": [
            { "id": 1, "name": "Shirt", "slug": "shirt", "categoryId": 1 },
            { "id": 2, "name": "Pant", "slug": "pant", "categoryId": 1 },
            { "id": 17, "name": "Bodysuit", "slug": "bodysuit", "categoryId": 1 },
            { "id": 18, "name": "Knits & Sweaters", "slug": "knits-sweaters", "categoryId": 1 }
        ]
    },
    {
        "id": 2,
        "name": "Men",
        "slug": "men",
        "Subcategory": [
            { "id": 19, "name": "Jackets", "slug": "jackets", "categoryId": 2 },
            { "id": 20, "name": "Knits & Sweaters", "slug": "knits-and-sweaters", "categoryId": 2 },
            { "id": 25, "name": "Tees & Tanks", "slug": "tees-tanks", "categoryId": 2 },
            { "id": 26, "name": "Pants & Shorts", "slug": "pants-and-shorts", "categoryId": 2 }
        ]
    },
    {
        "id": 3,
        "name": "Kids",
        "slug": "kids",
        "Subcategory": [
            { "id": 27, "name": "Big Girl", "slug": "big-girl", "categoryId": 3 },
            { "id": 28, "name": "Baby boy", "slug": "baby-boy", "categoryId": 3 },
            { "id": 29, "name": "Teddy Bear Capsule", "slug": "baby-teddy-bear", "categoryId": 3 }
        ]
    },
    {
        "id": 4,
        "name": "Handbags",
        "slug": "handbags",
        "Subcategory": [
            { "id": 30, "name": "Logo Shop", "slug": "logo-shop", "categoryId": 4 },
            { "id": 31, "name": "Satchel Bags", "slug": "satchel-bags", "categoryId": 4 },
            { "id": 32, "name": "Tote Bags", "slug": "tote-bags", "categoryId": 4 },
            { "id": 33, "name": "Wallet", "slug": "wallet", "categoryId": 4 }
        ]
    },
    {
        "id": 5,
        "name": "Guess Jeans",
        "slug": "guess-jeans",
        "Subcategory": [
            { "id": 34, "name": "Women", "slug": "women", "categoryId": 5 },
            { "id": 35, "name": "Men", "slug": "men", "categoryId": 5 }
        ]
    }
];

function MultiLevelOffcanvas({show, handleClose}) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    function handler(){
        handleClose("main");
        if (show) setSelectedCategory(null);
    }

    const goBackToCategories = () => setSelectedCategory(null);

    return (
        <div className="MultiLevelOffcanvas">
            <Offcanvas show={show} onHide={handler} placement="end" style={{ width: '300px' }}>
                <Offcanvas.Header className="d-flex justify-content-between align-items-center px-3 py-2">
                    {selectedCategory ? (
                        <div className="d-flex align-items-center">
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
                        </div>
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
                                    <li key={sub.id} className="py-2 px-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <a href={`/${selectedCategory.slug}/${sub.slug}`} style={{ textDecoration: 'none', color: '#000' }}>
                                            {sub.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            {/* Main Category Level */}
                            <ul className="list-unstyled m-0 p-0">
                                {cats.map(category => (
                                    <li key={category.id} className="py-2 px-3" style={{ borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                                        {/* If category has subcategories, clicking sets selectedCategory, else link directly */}
                                        {category.Subcategory && category.Subcategory.length > 0 ? (
                                            <div onClick={() => setSelectedCategory(category)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>{category.name}</span>
                                                <span>›</span>
                                            </div>
                                        ) : (
                                            <a href={`/${category.slug}`} style={{ textDecoration: 'none', color: '#000' }}>
                                                {category.name}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Additional Links (like Sign In, Track Order, etc.) if needed */}
                            <div className="py-2 px-3" style={{ borderTop: '1px solid #ddd' }}>
                                <ul className="list-unstyled">
                                    <li><a href="/sign-in" style={{ textDecoration: 'none', color: '#000' }}>Sign In</a></li>
                                    <li><a href="/create-account" style={{ textDecoration: 'none', color: '#000' }}>Create Account</a></li>
                                    <li><a href="/track-order" style={{ textDecoration: 'none', color: '#000' }}>Track Order</a></li>
                                    <li><a href="/find-a-store" style={{ textDecoration: 'none', color: '#000' }}>Find a Store</a></li>
                                    <li><a href="/customer-service" style={{ textDecoration: 'none', color: '#000' }}>Customer Service</a></li>
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
