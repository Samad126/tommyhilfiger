import React, { useEffect, useState } from 'react'
import { Breadcrumb, Spinner } from 'react-bootstrap'
import { IoStar } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import SingleProductAccordion from './SingleProductAccordion'
import members from "../../assets/tommyLittle.webp"

import "./singleproduct.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleItem } from '../../redux/singleItemSlice'
import { setLoading } from '../../redux/mainLoaderSlice'
// import SpinComponent from '../../components/Spinner/SpinComponent'

function SingleProduct() {
    const { id } = useParams();

    const { item, status } = useSelector((state) => state.singleItem);

    console.log(item);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedCount, setSelectedCount] = useState(1);
    const [selectedColor, setSelectedColor] = useState(item?.Colors[0]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        console.log(id);
        dispatch(fetchSingleItem(id));
        dispatch(setLoading(false));
    }, []);

    useEffect(() => {
        setSelectedColor(item?.Colors[0]);
    }, [item]);

    console.log(selectedColor, selectedSize, selectedCount);

    function sizeSelect(size) {
        setSelectedSize(size);
    }

    function addToCart(item) {
        if (selectedSize != null){
            const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            const isAvailable = cartItems.findIndex((cart) => cart.id == item.id);
            isAvailable == -1 ? cartItems.push({...item, count : selectedCount}) : cartItems[isAvailable].count = cartItems[isAvailable].count + 1;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
        else {
            alert("Please select size");
        }
    }

    console.log(status);
    return (
        <>
            {status == "loading"
                ? <div className={`position-relative`}>
                    <div className='bg-white position-fixed min-vw-100 min-vh-100 top-0 start-0 z-3'>
                    </div>
                    <div className='position-fixed start-0 top-0 min-vh-100 d-flex justify-content-center align-items-center z-3 w-100'>
                        <Spinner className='' />
                    </div>
                </div> :
                status == "succeeded" ?
                    <main className='mainContainer'>
                        <div className='px-3'>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Library
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Data</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className='d-flex align-items-start justify-content-between'>
                            <div id='desktopImageGallery'>
                                <div className='d-flex flex-wrap justify-content-between'>
                                    {item.images.map((item, index) => (
                                        <img key={index} src={item} alt="" />
                                    ))}
                                </div>
                                <div className='detailedAccordion'>
                                    <h2 className='itemTitle'>About the {item.name}</h2>
                                    <p>{item.description}</p>
                                    <SingleProductAccordion />
                                </div>
                            </div>
                            <div className='px-3' id='infoPart'>
                                <div className='px-3' id='sliderAndImages'>

                                </div>
                                <h4 id='companyName'>{item.Brands.name}</h4>
                                <h2 className='itemTitle'>{item.name}</h2>
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='d-flex stars'>
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                    </div>
                                </div>
                                <p className="d-flex gap-1 price">
                                    <span className="prevPrice highfont">${item.price}</span>
                                    <span className="newPrice highfont">${Math.round(item.price - Math.round(((item.price) * item.discount) / 100))}</span>
                                    <span className="discount highfont">{item.discount}% off</span>
                                </p>
                                <div id='members' className='d-flex justify-content-between align-items-center gap-3'>
                                    <img src={members} alt="members" />
                                    <p className='m-0'>Members get an extra 20% off $200+ or 15% off $150+ Sign in for this exclusive offer. Not a member? Sign up now!</p>
                                </div>
                                <div id='color'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h2 className='specificTitle'>Color <span id='colorName'>{selectedColor}</span></h2>
                                    </div>
                                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} style={{ padding: "10px 30px" }} name="" id="">
                                        {item.Colors.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div id='size'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h2 className='specificTitle'>Size</h2>
                                        <button className='grayUnderline'>Find my size</button>
                                    </div>
                                    <div id='sizes' className='d-flex flex-wrap align-item-center gap-2'>
                                        {item.Size.map((item, index) => (
                                            <button className={`${selectedSize == item ? "selectedItem" : ""}`} onClick={() => sizeSelect(item == selectedSize ? null : item)} key={index}>{item}</button>
                                        ))}
                                    </div>
                                </div>
                                <div id='sizeGuide' className='d-flex justify-content-between align-items-center'>
                                    <button className='grayUnderline'>Size Guide</button>
                                    <p className='m-0'>Model is about 6'1" in size M.</p>
                                </div>
                                <div id='addToCartSection' className='d-flex justify-content-between gap-2'>
                                    <div className='selectSection d-flex flex-column w-25'>
                                        <label htmlFor="countSelector">Qty</label>
                                        <select disabled={selectedSize == null} value={selectedCount} onChange={(e) => setSelectedCount(e.target.value)} name="" id="countSelector" className='w-100 h-100'>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <button onClick={() => addToCart(item)} id='addToCartButton' className='w-75'>{selectedSize != null ? "Add To Cart" : "Select a Size"}</button>
                                </div>
                                <div>
                                    <p className='m-0 shippingDetail'>Free Standard Shipping on Orders $100+</p>
                                    <p className='m-0 shippingDetail'>4 interest-free payments of $9.93 with Klarna. <span>Learn More</span></p>
                                    <p className='m-0 shippingDetail'>afterpay available for orders between $35 - $1,000</p>
                                </div>
                                <div className='detailedAccordion mobileDetailed'>
                                    <h2 className='itemTitle'>About the Long-Sleeve Tommy Wicking Polo</h2>
                                    <p>Tommy Hilfiger men's polo. A fresh spin on tradition, this long-sleeve polo is made from quick-dry, wicking fabric with ultraviolet protection and features our signature stripe tipping at the cuffs and collar. Comfort? Check. Performance? Style? Check.</p>
                                    <SingleProductAccordion />
                                </div>
                            </div>
                        </div>
                    </main> : ""}
        </>
    )
}

export default SingleProduct