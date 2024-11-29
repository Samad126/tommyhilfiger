import { IoCloseSharp, IoStar } from "react-icons/io5"
import { PiSlidersHorizontal } from "react-icons/pi"
import { Link, Router, useNavigate, useSearchParams } from "react-router-dom"
import Carusel from "./Carusel"

import "./productItems.css"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import Category from "../Category/Category"
import { useEffect, useState } from "react"
import Quickview from "../Quickview/Quickview"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/productsSlice"
import SingleItem from "./SingleItemComponent"

function ProductItems() {
    const [catShow, setCatShow] = useState(false);
    const [itemShow, setItemShow] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [searchParams, _] = useSearchParams();

    const { items } = useSelector((state) => state.products);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(items, location.pathname);
    useEffect(() => {
        console.log(searchParams, searchParams.size);
        
        if (searchParams.size == 0) {
            navigate("../all?page=1&limit=50");
            dispatch(fetchProducts("all?page=1&limit=100"));
            return;
        }

        const allParams = Object.entries(Object.fromEntries(searchParams.entries()));
        const newArray = allParams.map((item) => `${item[0]}=${item[1]}`);
        const queryString = "all?" + newArray.join("&");
        dispatch(fetchProducts(queryString));
    }, [location.search]);

    function handleCatshow() {
        setCatShow((prev) => !prev);
    }

    function handleItemshow(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        setItemShow((prev) => !prev);
    }

    function handleCategSwitch(num){
        setSelectedCat(num);
    }

    return (
        <div id="mainProductSection" className="mt-4">
            <Category show={catShow} handleClose={handleCatshow} />
            <Quickview show={itemShow} handleClose={handleItemshow} />
            <div id="mobileFilterSection" className="d-flex align-items-center justify-content-between px-3">
                <p className="m-0">{items?.data?.length} Items</p>
                <button onClick={handleCatshow} className="d-flex align-items-center gap-2 filterSortBtn"><PiSlidersHorizontal /> Filter & Sort</button>
            </div>
            <div id="desktopFilterSection" className="d-flex justify-content-between align-items-start px-3">
                <div id="categsBtns" className="d-flex flex-wrap gap-3 align-items-center w-50">
                    <button onClick={() => handleCategSwitch(0)} className="d-flex align-items-center justify-content-between">Size <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={() => handleCategSwitch(1)} className="d-flex align-items-center justify-content-between">Color <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={() => handleCategSwitch(2)} className="d-flex align-items-center justify-content-between">Discount <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={() => handleCategSwitch(3)} className="d-flex align-items-center justify-content-between">Price <MdOutlineKeyboardArrowDown /></button>
                </div>
                <div className="d-flex align-items-center gap-2 desktopSort">
                    <p className="m-0">{items?.data?.length} Items</p>
                    <div id="seperator"></div>
                    <label htmlFor="sortSelect">Sort By</label>
                    <div className="px-3 selectWrapper">
                        <select name="" id="sortSelect">
                            <option value="Newest">Price Low To High</option>
                            <option value="Newest">Price High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="filterSettings" className="d-flex align-items-center mt-3 gap-2 px-3 overflow-auto">
                <div id="filters" className="d-flex align-items-center gap-2">
                    <button className="d-flex align-items-center justify-content-between">XXS <IoCloseSharp /></button>
                    <button className="d-flex align-items-center justify-content-between">XXS <IoCloseSharp /></button>
                    <button className="d-flex align-items-center justify-content-between">XXS <IoCloseSharp /></button>
                </div>
                <button id="clearAllBtn">Clear All</button>
            </div>
            <div className="my-5" id="productItems">
                {items?.data?.map((item) => (
                    <SingleItem key={item.id} item={item} handleItemshow={handleItemshow} />
                ))}
            </div>
        </div>
    )
}

export default ProductItems