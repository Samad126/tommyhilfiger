import { Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"

import CategoryAccordion from "./CategoryAccordion"

function Category({ show, handleClose }) {
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id='cartTitle'>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div id="categoryAccordion">
                        <CategoryAccordion />
                    </div>
                    <div id='checkoutSection'>
                        <button>Clear All</button>
                        <button>View 1,189 Items</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Category