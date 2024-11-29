import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomAccordion.css';

const colors = [
    { color: 'Green', code: '#008000' },
    { color: 'Red', code: '#FF0000' },
    { color: 'Blue', code: '#0000FF' },
    { color: 'Yellow', code: '#FFFF00' },
    { color: 'Black', code: '#000000' },
    { color: 'White', code: '#FFFFFF' },
    { color: 'Orange', code: '#FFA500' },
    { color: 'Purple', code: '#800080' },
    { color: 'Indigo', code: '#4B0082' },
    { color: 'Violet', code: '#EE82EE' },
];

const CategoryAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleSelect = (eventKey) => {
        setActiveIndex(eventKey === activeIndex ? null : eventKey);
    };

    return (
        <div id="categAccordion">
            <Accordion activeKey={activeIndex} onSelect={handleSelect} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Size</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        {['L', 'M', 'S', 'XL', 'XXL'].map((size, idx) => (
                            <div key={idx} className="mb-2">
                                <input
                                    type="checkbox"
                                    id={`size-${idx}`}
                                    value={size}
                                    onChange={(e) => console.log(`Selected size: ${e.target.value}`)}
                                />
                                <label htmlFor={`size-${idx}`} className="ms-2">
                                    {size}
                                </label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Color</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        {colors.map((color, idx) => (
                            <div key={idx} className="d-flex align-items-center mb-2">
                                <div
                                    style={{
                                        backgroundColor: color.code,
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                        border: '1px solid #000',
                                    }}
                                ></div>
                                <label>
                                    {color.color}
                                </label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Discount</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        <div className="mb-2">
                            <input
                                type="checkbox"
                                id="discount"
                                value="Discount"
                                onChange={(e) => console.log(`Selected: ${e.target.value}`)}
                            />
                            <label htmlFor="discount" className="ms-2">
                                Discount
                            </label>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Discount</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        <div className="mb-2">
                            <input
                                type="checkbox"
                                id="discount"
                                value="Discount"
                                onChange={(e) => console.log(`Selected: ${e.target.value}`)}
                            />
                            <label htmlFor="discount" className="ms-2">
                                Discount
                            </label>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default CategoryAccordion;
