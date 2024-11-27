import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomAccordion.css'; // Custom CSS for matching design

const colors = [
    { color: 'Red', count: 115 },
    { color: 'Black', count: 122 },
    { color: 'Orange', count: 2 },
    { color: 'Grey', count: 113 },
    { color: 'Yellow', count: 8 },
    { color: 'Brown', count: 32 },
    { color: 'Green', count: 109 },
    { color: 'Beige', count: 103 },
    { color: 'Blue', count: 189 },
    { color: 'White', count: 126 },
    { color: 'Navy', count: 222 },
    { color: 'Multi', count: 60 },
    { color: 'Pink', count: 20 },
    { color: 'Medium-Blue', count: 1 },
];

const CategoryAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleSelect = (eventKey) => {
        setActiveIndex(eventKey === activeIndex ? null : eventKey);
    };

    return (
        <div id='categAccordion'>
            <Accordion activeKey={activeIndex} onSelect={handleSelect} alwaysOpen>
                {/* Category Section */}
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Category</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        {['Blazers', 'Hoodies + Sweatshirts', 'Jackets + Coats', 'Jeans', 'Pants', 'Polos', 'Shirts', 'Shorts', 'Sleepwear', 'Sweaters', 'Sweatpants + Joggers', 'T-Shirts'].map((category, idx) => (
                            <div>
                                <input
                                    key={idx}
                                    onChange={(e) => console.log(e.target.value)}
                                    type="checkbox"
                                    id={`category-${idx}`}
                                    label={`${category} (${Math.floor(Math.random() * 300)})`}
                                    className="mb-2"
                                />
                                <label htmlFor={`category-${idx}`}>{`${category} (${Math.floor(Math.random() * 300)})`}</label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Size</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        <Row xs={4} className="g-2">
                            {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '15', '15.5', '16', '16.5', '17', '17.5', '18', '28', '29', '30', '31', '32', '33', '34', '35'].map((size, idx) => (
                                <Col key={idx}>
                                    <button variant="outline-primary" className="w-100">
                                        {size} ({Math.floor(Math.random() * 1000)})
                                    </button>
                                </Col>
                            ))}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>

                {/* Color Section */}
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Color</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        <Row xs={4} className="g-2">
                            {colors.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="d-flex align-items-center mb-2"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: item.color.toLowerCase(),
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            marginRight: '10px',
                                            border: '3px solid #00000'
                                        }}
                                    />
                                    <span>
                                        {item.color} ({item.count})
                                    </span>
                                </div>
                            ))}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default CategoryAccordion;
