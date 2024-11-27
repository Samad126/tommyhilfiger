import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { IoStar } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import SingleProductAccordion from './SingleProductAccordion'
import members from "../../assets/tommyLittle.webp"
import demonigga from "../../assets/demonigga.jpeg"

import "./singleproduct.css"

function SingleProduct() {
    return (
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
                        <img src={demonigga} alt="" />
                        <img src={demonigga} alt="" />
                        <img src={demonigga} alt="" />
                        <img src={demonigga} alt="" />
                    </div>
                    <div className='detailedAccordion'>
                        <h2 className='itemTitle'>About the Long-Sleeve Tommy Wicking Polo</h2>
                        <p>Tommy Hilfiger men's polo. A fresh spin on tradition, this long-sleeve polo is made from quick-dry, wicking fabric with ultraviolet protection and features our signature stripe tipping at the cuffs and collar. Comfort? Check. Performance? Style? Check.</p>
                        <SingleProductAccordion />
                    </div>
                </div>
                <div className='px-3' id='infoPart'>
                    <div className='px-3' id='sliderAndImages'>

                    </div>
                    <h4 id='companyName'>Tommy Hilfiger</h4>
                    <h2 className='itemTitle'>Long-Sleeve Tommy Wicking Polo</h2>
                    <div className='d-flex align-items-center gap-2'>
                        <div className='d-flex stars'>
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStar />
                        </div>
                        <Link className='grayUnderline'>Questions & Answers 10</Link>
                    </div>
                    <p className="d-flex gap-1 price">
                        <span className="prevPrice highfont">$79.50</span>
                        <span className="newPrice highfont">$39.75</span>
                        <span className="discount highfont">50% off</span>
                    </p>
                    <div id='members' className='d-flex justify-content-between align-items-center gap-3'>
                        <img src={members} alt="members" />
                        <p className='m-0'>Members get an extra 20% off $200+ or 15% off $150+ Sign in for this exclusive offer. Not a member? Sign up now!</p>
                    </div>
                    <div id='color'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h2 className='specificTitle'>Color <span id='colorName'>Rouge</span></h2>
                            <button className='grayUnderline'>View all colors</button>
                        </div>
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
                    </div>
                    <div id='size'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h2 className='specificTitle'>Size</h2>
                            <button className='grayUnderline'>Find my size</button>
                        </div>
                        <div id='sizes' className='d-flex flex-wrap align-item-center gap-2'>
                            <button>XS</button>
                            <button>XS</button>
                            <button>XS</button>
                            <button>XS</button>
                            <button>XS</button>
                            <button>XS</button>
                        </div>
                    </div>
                    <div id='sizeGuide' className='d-flex justify-content-between align-items-center'>
                        <button className='grayUnderline'>Size Guide</button>
                        <p className='m-0'>Model is about 6'1" in size M.</p>
                    </div>
                    <div id='addToCartSection' className='d-flex justify-content-between gap-2'>
                        <div className='selectSection d-flex flex-column w-25'>
                            <label htmlFor="countSelector">Qty</label>
                            <select name="" id="countSelector" className='w-100 h-100'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">5</option>
                            </select>
                        </div>
                        <button id='addToCartButton' className='w-75'>Select a Size</button>
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
        </main>
    )
}

export default SingleProduct