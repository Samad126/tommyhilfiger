import { useState } from "react";
import { Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../components/accordion.css";

function AccordionSection() {
    const [activeKeys, setActiveKeys] = useState([]);

    const data = [
        {
            title: "Product Details",
            content: (
                <>
                    <ul>
                        <li>Regular Fit (Also known as Custom Fit) – Cut with subtle structure for a comfortable fit.</li>
                        <li>60% REEL cotton, 40% polyester.</li>
                        <li>
                            REEL Cotton is produced by independent farmers trained in practices that seek to improve soil health and water management.
                        </li>
                        <li>Body length from high point of shoulder: 28".</li>
                        <li>Measurements based on a size M.</li>
                        <li>Imported.</li>
                        <li>Machine washable.</li>
                    </ul>
                    <p>Style #: 78J9766-XJS</p>
                </>
            )
        },
        {
            title: "Shipping and Returns",
            content: (
                <>
                    <h6>Shipping Details</h6>
                    <p>
                        Most items are shipped from our warehouse within 1-2 full business days except where otherwise noted.
                        Shipping restrictions may apply.
                    </p>
                    <h6>Returns Details</h6>
                    <p>
                        Need to return a gift? Our extended holiday return policy makes it easier. Purchases made between November 1, 2024 - December 24, 2024, can be returned through January 31, 2025.
                        In order to process your return, items must be unworn and tags must be attached. Items marked Final Sale are not eligible for a return, refund, or credit.
                        A flat rate return shipping fee of $4.95 will be deducted from your refund.
                    </p>
                </>
            )
        }
    ];

    const handleToggle = (index) => {
        const key = index.toString();
        setActiveKeys((prevKeys) =>
            prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
        );
    };

    return (
        <div className="homepageAccordion">
            <Accordion activeKey={activeKeys}>
                {data.map((section, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()} className="custom-accordion-item">
                        <Accordion.Header onClick={() => handleToggle(index)}>
                            <div className="accordion-header-content">
                                <span>{section.title}</span>
                                <span>{activeKeys.includes(index.toString()) ? "-" : "+"}</span>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>{section.content}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}

export default AccordionSection;
