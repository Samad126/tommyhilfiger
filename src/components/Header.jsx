import React from 'react'
import { Link } from 'react-router-dom'
import mobileLogo from "../assets/mobileLogo.svg"
import desktopLogo from "../assets/desktopLogo.svg"
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TfiLocationPin } from 'react-icons/tfi'

import "./header.css"

function Header() {
    return (
        <header>
            <p id='topText'>50% off sitewide </p>
            <div id='topHeader' className='d-flex justify-content-between p-3'>
                <img src={mobileLogo} alt="mobile logo" id='mobileLogo' />
                <Link className='align-items-center gap-2' id='locationBtn'>
                    <TfiLocationPin />
                    Stores
                </Link>
                <Link id='desltopMainLogo'><img src={desktopLogo} alt="desktop logo" /></Link>
                <div className='d-flex gap-3' id='searchCatBtns'>
                    <button><FaMagnifyingGlass /></button>
                    <Link><HiOutlineShoppingBag /></Link>
                    <button><GiHamburgerMenu /></button>
                </div>
            </div>
            <div id='desktopNav'>
                <nav>
                    <ul className='d-flex justify-content-center align-items-center'>
                        <li className='cat'>
                            <Link>Men</Link>
                            <div className='moreCat'>
                                <Link><img src="" alt="" /></Link>
                                <div>
                                    <h4>Featured</h4>
                                    <nav>
                                        <ul>
                                            <li><Link>Item1</Link></li>
                                            <li><Link>Item1</Link></li>
                                            <li><Link>Item1</Link></li>
                                            <li><Link>Item1</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </li>
                        <li className='cat'>
                            <Link>Women</Link>
                            <div className='moreCat'>
                                <Link><img src="" alt="" /></Link>
                                <div>
                                    <h4>Featured</h4>
                                    <nav>
                                        <ul>
                                            <li><Link>Item1</Link></li>
                                            <li><Link>Item12</Link></li>
                                            <li><Link>Item1</Link></li>
                                            <li><Link>Item1</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </li>
                        <li className='cat'>
                            <Link>Kids</Link>
                            <div className='moreCat'>
                                <Link><img src="" alt="" /></Link>
                                <div>
                                    <h4>Featured</h4>
                                    <nav>
                                        <ul>
                                            <li><Link>Item13</Link></li>
                                            <li><Link>Item1</Link></li>
                                            <li><Link>Item1</Link></li>
                                            <li><Link>Item1</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id='search'></div>
            <div id='bag'></div>
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
        </header>
    )
}

export default Header