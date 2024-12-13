import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomAccordion.css";
import { Box, Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import SizeFilter from "./SizeFilter";

const colors = [
    { color: "GREEN", code: "#008000" },
    { color: "RED", code: "#FF0000" },
    { color: "BLUE", code: "#0000FF" },
    { color: "YELLOW", code: "#FFFF00" },
    { color: "BLACK", code: "#000000" },
    { color: "WHITE", code: "#FFFFFF" },
    { color: "ORANGE", code: "#FFA500" },
    { color: "PURPLE", code: "#800080" },
    { color: "INDIGO", code: "#4B0082" },
    { color: "VIOLET", code: "#EE82EE" },
];

const CategoryAccordion = ({ active }) => {
    const [activeIndex, setActiveIndex] = useState(
        active != null ? active.toString() : null
    );

    const minDefPrice = 0, maxDefPrice = 1000;

    const {
        size = [],
        color = [],
        discount = false,
        minPrice = 0,
        maxPrice = 1000,
    } = useSelector((state) => state.filter.filters);


    const [localMinPrice, setLocalMinPrice] = useState(
        Number(minPrice)
    );
    const [localMaxPrice, setLocalMaxPrice] = useState(
        Number(maxPrice)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(minPrice, maxPrice);

        const min = Number(minPrice);
        const max = Number(maxPrice);
        setLocalMinPrice(min);
        setLocalMaxPrice(max);
    }, [minPrice, maxPrice]);

    const handleSelect = (eventKey) => {
        setActiveIndex(
            eventKey.toString() === activeIndex ? null : eventKey.toString()
        );
    };

    const handleFilterChange = (type, value) => {
        switch (type) {
            case "size":
                const updatedSize = Array.isArray(size) ? size : [];
                const newSize = updatedSize.includes(value)
                    ? updatedSize.filter((item) => item !== value)
                    : [...updatedSize, value];
                dispatch(setFilter({ key: "size", value: newSize }));
                break;
            case "color":
                const updatedColor = Array.isArray(color) ? color : [];
                const newColor = updatedColor.includes(value)
                    ? updatedColor.filter((item) => item !== value)
                    : [...updatedColor, value];
                dispatch(setFilter({ key: "color", value: newColor }));
                break;
            case "discount":
                dispatch(setFilter({ key: "discount", value }));
                break;
            case "minPrice":
                if (Number(value) === Number(minDefPrice)) {
                    dispatch(setFilter({ key: "minPrice", value: undefined }));
                } else {
                    dispatch(setFilter({ key: "minPrice", value }));
                }
                break;
            case "maxPrice":
                if (Number(value) === Number(maxDefPrice)) {
                    dispatch(setFilter({ key: "maxPrice", value: undefined }));
                } else {
                    dispatch(setFilter({ key: "maxPrice", value }));
                }
                break;
            default:
                break;
        }
    };

    const handlePriceChange = (event, newValue) => {

        setLocalMinPrice(Number(newValue[0]));
        setLocalMaxPrice(Number(newValue[1]));
    };

    const handlePriceChangeCommitted = (event, newValue) => {

        handleFilterChange("minPrice", Number(newValue[0]));
        handleFilterChange("maxPrice", Number(newValue[1]));
    };

    return (
        <div id="categAccordion">
            <Accordion activeKey={activeIndex} onSelect={handleSelect} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Size</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body py-2">
                        {["L", "M", "S", "XL", "XXL"].map((sizeItem, idx) => (
                            <SizeFilter
                                key={idx}
                                handleFilterChange={handleFilterChange}
                                size={sizeItem}
                                idx={idx}
                                sizeFilter={size}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Color</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body py-2">
                        {colors.map((colorObj, idx) => (
                            <div key={idx} className="d-flex align-items-center mb-2">
                                <div
                                    onClick={() =>
                                        handleFilterChange("color", colorObj.color)
                                    }
                                    style={{
                                        backgroundColor: colorObj.code,
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        marginRight: "10px",
                                        border: "1px solid #000",
                                        cursor: "pointer",
                                        opacity: color.includes(colorObj.color)
                                            ? 1
                                            : 0.1,
                                    }}
                                    title={colorObj.color}
                                    aria-label={`Color filter: ${colorObj.color}`}
                                ></div>
                                <label
                                    onClick={() =>
                                        handleFilterChange("color", colorObj.color)
                                    }>
                                    {colorObj.color}
                                </label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Discount</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body py-2">
                        <div className="mb-2 d-flex align-content-center">
                            <input
                                type="checkbox"
                                id="discount"
                                checked={discount}
                                onChange={(e) =>
                                    handleFilterChange("discount", e.target.checked)
                                }
                                aria-label="Discount filter"
                            />
                            <label htmlFor="discount" className="ms-2">
                                Discount
                            </label>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        <span className="custom-accordion-header">Price</span>
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body py-2">
                        <div className="mb-2">
                            <Box sx={{ width: "90%", padding: "0 10px", margin: "auto" }}>
                                <Slider
                                    getAriaLabel={() => "Price range"}
                                    value={[Number(localMinPrice), Number(localMaxPrice)]}
                                    onChange={handlePriceChange}
                                    onChangeCommitted={handlePriceChangeCommitted}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={1000}
                                />
                            </Box>
                            <label className="ms-2">
                                Price Range: ${localMinPrice} - ${localMaxPrice}
                            </label>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default CategoryAccordion;