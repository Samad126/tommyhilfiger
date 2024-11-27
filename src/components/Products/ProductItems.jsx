import { IoCloseSharp, IoStar } from "react-icons/io5"
import { PiSlidersHorizontal } from "react-icons/pi"
import { Link } from "react-router-dom"
import Carusel from "./Carusel"

import "./productItems.css"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import Category from "../Category/Category"
import { useState } from "react"
import Quickview from "../Quickview/Quickview"

function ProductItems() {
    const [catShow, setCatShow] = useState(false);
    const [itemShow, setItemShow] = useState(false);

    function handleCatshow() {
        setCatShow((prev) => !prev);
    }

    function handleItemshow() {
        setItemShow((prev) => !prev);
    }

    return (
        <div id="mainProductSection" className="mt-4">
            <Category show={catShow} handleClose={handleCatshow} />
            <Quickview show={itemShow} handleClose={handleItemshow}/>
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
                            <option value="Recommended">Recommended</option>
                            <option value="Newest">Newest</option>
                            <option value="Newest">Price Low To High</option>
                            <option value="Newest">Price High to Low</option>
                            <option value="Newest">Top Rated</option>
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
            <div className="d-flex flex-wrap justify-content-between my-5" id="productItems">
                <div>
                    <Link>
                        <Carusel handleClick={handleItemshow}/>
                    </Link>
                    <div className="p-2">
                        <Link className="prodItemTitle">Long-Sleeve Tommy Wicking Polo</Link>
                        <p className="d-flex gap-1 price">
                            <span className="prevPrice">$79.50</span>
                            <span className="newPrice">$39.75</span>
                            <span className="discount">50% off</span>
                        </p>
                        <p className="discountDesc">Extra 20% off $200+ for VIPs</p>
                        <div id='colors' className='d-flex flex-wrap align-item-center gap-4'>
                            <div className="productColor">
                                <div></div>
                            </div>
                            <div className="productColor">
                                <div></div>
                            </div>
                            <div className="productColor">
                                <div></div>
                            </div>
                            <div className="productColor">
                                <div></div>
                            </div>
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
                <div>
                    <Link>
                        <Carusel />
                    </Link>
                    <div className="p-2">
                        <Link className="prodItemTitle">Long-Sleeve Tommy Wicking Polo</Link>
                        <p className="d-flex gap-1 price">
                            <span className="prevPrice">$79.50</span>
                            <span className="newPrice">$39.75</span>
                            <span className="discount">50% off</span>
                        </p>
                        <p className="discountDesc">Extra 20% off $200+ for VIPs</p>
                        <div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
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
                <div>
                    <Link>
                        <Carusel />
                    </Link>
                    <div className="p-2">
                        <Link className="prodItemTitle">Long-Sleeve Tommy Wicking Polo</Link>
                        <p className="d-flex gap-1 price">
                            <span className="prevPrice">$79.50</span>
                            <span className="newPrice">$39.75</span>
                            <span className="discount">50% off</span>
                        </p>
                        <p className="discountDesc">Extra 20% off $200+ for VIPs</p>
                        <div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
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
                <div>
                    <Link>
                        <Carusel />
                    </Link>
                    <div className="p-2">
                        <Link className="prodItemTitle">Long-Sleeve Tommy Wicking Polo</Link>
                        <p className="d-flex gap-1 price">
                            <span className="prevPrice">$79.50</span>
                            <span className="newPrice">$39.75</span>
                            <span className="discount">50% off</span>
                        </p>
                        <p className="discountDesc">Extra 20% off $200+ for VIPs</p>
                        <div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
                            <div className="productColor"></div>
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
            </div>
        </div>
    )
}

export default ProductItems