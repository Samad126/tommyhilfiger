import { IoCloseSharp, IoStar } from "react-icons/io5"
import { PiSlidersHorizontal } from "react-icons/pi"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Carusel from "./Carusel"

import "./productItems.css"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import Category from "../Category/Category"
import { useEffect, useState } from "react"
import Quickview from "../Quickview/Quickview"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/productsSlice"

function ProductItems() {
    const [catShow, setCatShow] = useState(false);
    const [itemShow, setItemShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const { items } = useSelector((state) => state.products);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(items, location.pathname);
    useEffect(() => {
        if (searchParams.size == 0) {
            navigate("../all?page=1&limit=50");
            dispatch(fetchProducts("page=1&limit=100"));
            return;
        }

        const allParams = Object.entries(Object.fromEntries(searchParams.entries()));
        const newArray = allParams.map((item) => `${item[0]}=${item[1]}`);
        const queryString = newArray.join("&");

        dispatch(fetchProducts(queryString));
    }, [location.search]);

    function handleCatshow() {
        setCatShow((prev) => !prev);
    }

    function handleItemshow() {
        setItemShow((prev) => !prev);
    }

    return (
        <div id="mainProductSection" className="mt-4">
            <Category show={catShow} handleClose={handleCatshow} />
            <Quickview show={itemShow} handleClose={handleItemshow} />
            <div id="mobileFilterSection" className="d-flex align-items-center justify-content-between px-3">
                <p className="m-0">169 Items</p>
                <button className="d-flex align-items-center gap-2 filterSortBtn"><PiSlidersHorizontal /> Filter & Sort</button>
            </div>
            <div id="desktopFilterSection" className="d-flex justify-content-between align-items-start px-3">
                <div id="categsBtns" className="d-flex flex-wrap gap-3 align-items-center w-50">
                    <button onClick={handleCatshow} className="d-flex align-items-center justify-content-between">Category <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={handleCatshow} className="d-flex align-items-center justify-content-between">Category <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={handleCatshow} className="d-flex align-items-center justify-content-between">Category <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={handleCatshow} className="d-flex align-items-center justify-content-between">Category <MdOutlineKeyboardArrowDown /></button>
                </div>
                <div className="d-flex align-items-center gap-2 desktopSort">
                    <p className="m-0">910 Items</p>
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
                {items?.data?.map((item, index) => (
                    <div key={item.id}>
                        <Link to={`../details/${item.id}`}>
                            <Carusel images={item.images} handleClick={handleItemshow} />
                        </Link>
                        <div className="p-2">
                            <Link to={`../details/${item.id}`} className="prodItemTitle">{item.name}</Link>
                            <p className="d-flex gap-1 price">
                                <span className="prevPrice">${item.price}</span>
                                <span className="newPrice">${item.price - Math.round(((item.price) * item.discount) / 100)}</span>
                                <span className="discount">{item.discount}% off</span>
                            </p>
                            <p className="discountDesc">Extra 20% off $200+ for VIPs</p>
                            <div id='colors' className='d-flex flex-wrap align-item-center gap-4'>
                                {item.Colors.map((color, index) => (
                                    <div key={index} className="productColor">
                                        <div></div>
                                    </div>
                                ))}
                            </div>
                            <div className='d-flex stars'>
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStar />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductItems