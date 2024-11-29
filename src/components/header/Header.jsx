import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mobileLogo from "../../assets/mobileLogo.svg"
import desktopLogo from "../../assets/desktopLogo.svg"
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

function Header() {
    const [showBasket, setShowBasket] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { items } = useSelector((state) => state.categories);

    const dispatch = useDispatch();
    console.log(items);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    function handleOpenClose(type) {
        type == "basket" ? setShowBasket((prev) => !prev) : setShowSearch((prev) => !prev);
    }

    return (
        <>
            <p id='topText'>50% off sitewide </p>
            <header>
                <div>
                    <div id='topHeader' className='d-flex justify-content-between p-3'>
                        <Link id='toHomeImg'><img src={mobileLogo} alt="mobile logo" id='mobileLogo' /></Link>
                        <Link className='align-items-center gap-2' id='locationBtn'>
                            <TfiLocationPin />
                            Stores
                        </Link>
                        <Link to={"/"} id='desltopMainLogo'><img src={desktopLogo} alt="desktop logo" /></Link>
                        <div className='d-flex gap-3' id='searchCatBtns'>
                            <button onClick={() => handleOpenClose("search")}><FaMagnifyingGlass /></button>
                            <button id='profileBtn'><IoPersonOutline /></button>
                            <Link><HiOutlineShoppingBag /></Link>
                            <button onClick={() => handleOpenClose("basket")}><HiOutlineShoppingBag /></button>
                            <button id='hamburgerBtn'><GiHamburgerMenu /></button>
                        </div>
                    </div>
                    <div id='desktopNav'>
                        <nav>
                            <ul className='d-flex justify-content-center align-items-center'>
                                {items?.map((item, index) => (
                                    <CatItem key={index} catData={item}/>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <Cartcanvas show={showBasket} handleClose={handleOpenClose} />
                    <Searchcanvas show={showSearch} handleClose={handleOpenClose} />
                    <div id='mobileHeaderNav' style={{ display: "none" }}>
                        <div id='controlHeader'>
                            <button>{"<-"}</button>
                            <p>Men</p>
                            <button>X</button>
                        </div>
                        <div id='controlBody'>
                            <button>Men</button>
                            <Link>Men</Link>
                            <button>Men</button>
                            <Link>Men</Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header