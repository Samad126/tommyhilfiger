import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mobileLogo from "../../assets/mobilelogo.svg"
import desktopLogo from "../../assets/desktoplogo.svg"

import men from "../../assets/menknits.webp"
import women from "../../assets/womanpant.webp"
import kids from "../../assets/kidsbabyboy.webp"
import Guess from "../../assets/guessjeans.webp"
import handbags from "../../assets/handbagssatchelbags.webp"

import { FaMagnifyingGlass } from 'react-icons/fa6'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TfiLocationPin } from 'react-icons/tfi'
import { IoPersonOutline } from 'react-icons/io5'

import "./header.css"
import Cartcanvas from './cart/Cartcanvas'
import Searchcanvas from './search/Searchcanvas'
import { fetchCategories } from '../../redux/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import CatItem from './CatItem'
import MultiLevelOffcanvas from './multileveloffcanvas/MultiLevelOffcanvas'
import { updateCartCount } from '../../redux/productsSlice'

function Header() {
    const [showBasket, setShowBasket] = useState(false);
    const [showMain, setShowMain] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const { cats } = useSelector((state) => state.categories);
    const { cartCount } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(updateCartCount());
    }, []);

    const formattedData = [
        { img: women, id: 2 },
        { img: men, id: 20 },
        { img: kids, id: 28 },
        { img: handbags, id: 31 },
        { img: Guess, id: 35 }
    ];

    const updatedCats = cats.map((cat, index) => {
        const formattedItem = formattedData[index] || {};
        return {
            ...cat,
            singleInfo: {
                image: formattedItem.img || "",
                id: formattedItem.id || 0,
            }
        };
    });

    console.log(updatedCats);

    function handleOpenClose(type) {
        switch (type) {
            case "basket":
                setShowBasket((prev) => !prev);
                break;
            case "search":
                setShowSearch((prev) => !prev);
                break;
            case "main":
                setShowMain((prev) => !prev);
                break;
            default:
                console.warn("Unknown type passed to handleOpenClose:", type);
        }
    }

    return (
        <>
            <p id='topText'>50% off sitewide </p>
            <header>
                <div>
                    <div id='topHeader' className='d-flex justify-content-between p-3'>
                        <Link to={"/"} id='toHomeImg'><img src={mobileLogo} alt="mobile logo" id='mobileLogo' /></Link>
                        <Link className='align-items-center gap-2' id='locationBtn'>
                            <TfiLocationPin />
                            Stores
                        </Link>
                        <Link to={"/"} id='desltopMainLogo'><img src={desktopLogo} alt="desktop logo" /></Link>
                        <div className='d-flex gap-3' id='searchCatBtns'>
                            <button onClick={() => handleOpenClose("search")}><FaMagnifyingGlass /></button>
                            <button id='profileBtn'><IoPersonOutline /></button>
                            <Link className='position-relative' to={"cart"} id='toCartMobile'>
                                <HiOutlineShoppingBag />
                                <span className="position-absolute top-0 start-75 translate-middle badge bg-danger">
                                    {cartCount ? cartCount : ""}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                            <button className='position-relative' id='toCartDesk' onClick={() => handleOpenClose("basket")}>
                                <HiOutlineShoppingBag />
                                <span className="position-absolute top-0 start-75 translate-middle badge bg-danger">
                                    {cartCount ? cartCount : ""}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </button>
                            <button onClick={() => handleOpenClose("main")} id='hamburgerBtn'><GiHamburgerMenu /></button>
                        </div>
                    </div>
                    <div id='desktopNav'>
                        <nav>
                            <ul className='d-flex justify-content-center align-items-center'>
                                {updatedCats?.map((item, index) => (
                                    <CatItem key={index} catData={item} />
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <MultiLevelOffcanvas show={showMain} handleClose={handleOpenClose} />
                    <Cartcanvas show={showBasket} handleClose={handleOpenClose} />
                    <Searchcanvas show={showSearch} handleClose={handleOpenClose} />
                </div>
            </header>
        </>
    )
}

export default Header