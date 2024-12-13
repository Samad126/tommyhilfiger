import { Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"

import CategoryAccordion from "./CategoryAccordion"
import { resetFilters } from "../../redux/filterSlice"
import { useDispatch, useSelector } from "react-redux"
import "./category.css"

function Category({ show, handleClose, selectedIndex }) {
    const dispath = useDispatch();
    const {items} = useSelector((state) => state.products);

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <div className="pb-3">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="filterAccordionTite">Filter</Offcanvas.Title>
                    </Offcanvas.Header>
                </div>
                <Offcanvas.Body>
                    <div className="categoryAccordion">
                        <CategoryAccordion active={selectedIndex} />
                    </div>
                    <div className="checkoutSection d-flex justify-content-center align-items-center gap-3">
                        <button onClick={() => dispath(resetFilters())}>Clear All</button>
                        <button onClick={(handleClose)}>View {items?.data?.length} Items</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Category