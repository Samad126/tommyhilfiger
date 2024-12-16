import React, { useEffect, useState } from 'react'
import { Breadcrumb, Spinner } from 'react-bootstrap'
import { IoStar } from 'react-icons/io5'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import SingleProductAccordion from './SingleProductAccordion'
import members from "../../assets/tommyLittle.webp"

import "./singleproduct.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleItem } from '../../redux/singleItemSlice'
import { setLoading } from '../../redux/mainLoaderSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
// import SpinComponent from '../../components/Spinner/SpinComponent'

import 'swiper/css';
import 'swiper/css/pagination';
import { updateCartCount } from '../../redux/productsSlice'

function SingleProduct() {
    const { id } = useParams();

    const { item, status } = useSelector((state) => state.singleItem);

    console.log(item);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedCount, setSelectedCount] = useState(1);
    const [selectedColor, setSelectedColor] = useState(item?.Colors[0]);
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        console.log(id);
        dispatch(fetchSingleItem(id));
        dispatch(setLoading(false));
    }, [id]);

    useEffect(() => {
        setSelectedColor(item?.Colors[0]);
    }, [item]);

    console.log(selectedColor, selectedSize, selectedCount);

    function sizeSelect(size) {
        setSelectedSize(size);
        setIsError(false);
    }

    function addToCart(item) {
        if (selectedSize == null) {
            setIsError(true);
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const isAvailable = cartItems.findIndex((cart) => cart.id === item.id);

        if (isAvailable === -1) {
            if (selectedCount > 5) {
                alert("Max stock is 5");
            } else {
                cartItems.push({ ...item, count: selectedCount });
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }
        } else {
            const newCount = cartItems[isAvailable].count + selectedCount;
            if (newCount > 5) {
                alert("Max stock is 5");
            } else {
                cartItems[isAvailable].count = newCount;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }
        }
        dispatch(updateCartCount());
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

                        {/* <div className='px-3'>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Library
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Data</Breadcrumb.Item>
                            </Breadcrumb>
                        </div> */}
                        <div className='align-items-start justify-content-between singeProductWrapper'>
                            <div id='desktopImageGallery'>
                                <div className='d-flex flex-wrap justify-content-between'>
                                    {item.images.map((item, index) => (
                                        <img key={index} src={item} alt="" />
                                    ))}
                                </div>
                                <div className='detailedAccordion pt-5'>
                                    <h2 className='itemTitle'>About the {item.name}</h2>
                                    <p>{item.description}</p>
                                    <SingleProductAccordion />
                                </div>
                            </div>
                            <div id='infoPart'>
                                <div className='w-100' id='sliderAndImages'>
                                    <Swiper
                                        pagination={{
                                            clickable: true,
                                            type: 'fraction',
                                        }}
                                        modules={[Pagination]}
                                        className="mySwiper w-100"
                                    >
                                        {item.images.map((item, index) => (
                                            <SwiperSlide key={index}><img src={item} alt="" /></SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className='p-3'>
                                    <h4 id='companyName'>{item.Brands.name}</h4>
                                    <h2 className='itemTitle'>{item.name}</h2>
                                    <div className='d-flex align-items-center gap-2 my-3'>
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
                                    <div id='members' className='d-flex justify-content-between align-items-center gap-3 mb-4'>
                                        <img src={members} alt="members" />
                                        <p className='m-0'>Members get an extra 20% off $200+ or 15% off $150+ Sign in for this exclusive offer. Not a member? Sign up now!</p>
                                    </div>
                                    <div id='color' className='my-4'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h2 className='specificTitle mb-2'>Color <span id='colorName'>{selectedColor}</span></h2>
                                        </div>
                                        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} style={{ padding: "10px 30px" }} name="" id="">
                                            {item.Colors.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div id='size'>
                                        <div className='d-flex align-items-center justify-content-between mb-2'>
                                            <h2 className={`specificTitle ${isError && "input-error-msg"}`}>Size</h2>
                                        </div>
                                        <div>
                                            <div className='d-flex flex-wrap align-item-center gap-2 sizes'>
                                                {item.Size.map((item, index) => (
                                                    <button className={`${selectedSize == item ? "selectedItem" : ""} ${isError && "isNotSelected"}`} onClick={() => sizeSelect(item == selectedSize ? null : item)} key={index}>{item}</button>
                                                ))}
                                            </div>
                                            {isError && <p className='input-error-msg'>Please Select a size</p>}
                                        </div>
                                    </div>
                                    <div id='addToCartSection' className='d-flex justify-content-between gap-2 my-4'>
                                        <div className='selectSection d-flex flex-column w-25'>
                                            <label htmlFor="countSelector">Qty</label>
                                            <select disabled={selectedSize == null} value={selectedCount} onChange={(e) => setSelectedCount(Number(e.target.value))} name="" id="countSelector" className='w-100 h-100'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <button onClick={() => addToCart(item)} id='addToCartButton' className='w-75'>{selectedSize != null ? "Add To Cart" : "Select a Size"}</button>
                                    </div>
                                    <div className='my-4'>
                                        <p className='my-1 shippingDetail'>Free Standard Shipping on Orders $100+</p>
                                        <p className='my-1 shippingDetail'>4 interest-free payments of $9.93 with Klarna. <span>Learn More</span></p>
                                        <p className='my-1 shippingDetail'>afterpay available for orders between $35 - $1,000</p>
                                    </div>
                                    <div className='detailedAccordion mobileDetailed'>
                                        <h2 className='itemTitle'>About the Long-Sleeve Tommy Wicking Polo</h2>
                                        <p>Tommy Hilfiger men's polo. A fresh spin on tradition, this long-sleeve polo is made from quick-dry, wicking fabric with ultraviolet protection and features our signature stripe tipping at the cuffs and collar. Comfort? Check. Performance? Style? Check.</p>
                                        <SingleProductAccordion />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main> : ""}
        </>
    )
}

export default SingleProduct