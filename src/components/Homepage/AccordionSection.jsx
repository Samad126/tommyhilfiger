import { useState } from "react";
import { Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../accordion.css";

function AccordionSection() {
    const [activeKeys, setActiveKeys] = useState([]);

    const data = [
        {
            name: "Help & Support",
            items: ["Customer Service", "Order Status", "Shipping", "Returns", "Klarna", "Afterpay", "Promotions & Discounts", "Group Discounts", "EGift Cards", "Store Directory"]
        },
        {
            name: "About Tommy Hilfiger",
            items: ["Tommy Stories", "People's Place Program", "Sustainability", "Press", "Black Friday"]
        },
        {
            name: "Join Us",
            items: ["The Hilfiger Club", "Newsletter Signup", "Careers", "Affiliate Program"]
        },
        {
            name: "Contact Us",
            items: ["Store Locator", "Chat"]
        }
    ];

    const handleToggle = (index) => {
        const key = index.toString();
        setActiveKeys((prevKeys) =>
            prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
        );
    };

    return (
        <Accordion activeKey={activeKeys}>
            {data.map((section, index) => (
                <Accordion.Item key={index} eventKey={index.toString()} className="custom-accordion-item">
                    <Accordion.Header onClick={() => handleToggle(index)}>
                        <div className="accordion-header-content">
                            <span>{section.name}</span>
                            <span>{activeKeys.includes(index.toString()) ? "-" : "+"}</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ul className="sub-item-list">
                            {section.items.map((subItem, subIndex) => (
                                <li key={subIndex} className="sub-item">{subItem}</li>
                            ))}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

export default AccordionSection;
