import React, { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import "./searchcanvas.css"
import { Link, useNavigate } from 'react-router-dom';
import SearchItem from './SearchItem';
import { useSelector } from 'react-redux';

function Searchcanvas({ show, handleClose }) {
    const [searchItems, setSearchItems] = useState([]);
    const inpRef = useRef();
    const { cats } = useSelector((state) => state.categories);
    // const navigate = useNavigate();

    useEffect(() => {
        if (show) handleChange();
    }, [show]);

    async function handleChange() {

        const txt = inpRef.current ? inpRef.current.value : "";
        try {
            const response = await fetch(`https://ecommerse.apasni.me/products/search?q=${txt}`);
            const data = await response.json();
            setSearchItems(data);
        } catch (error) {
            console.error("An Error Occured");
        }
    }

    async function handleHover(catId) {
        try {
            const response = await fetch(`https://ecommerse.apasni.me/products/all?categoryId=${catId}&limit=100`);
            const data = await response.json();
            setSearchItems(data.data);
        } catch (error) {
            console.error("An Error Occured");
        }
    }

    // async function handleSubmit(e) {
    //     if (e) e.preventDefault();
    //     console.log('submitted');
    //     handleClose();
    //     navigate(`../search/${inpRef.current.value}`);
    // }

    return (
        <div>
            <Offcanvas show={show} onHide={() => handleClose("search")} placement="end">
                <Offcanvas.Header closeButton>
                    {/* <form onSubmit={handleSubmit} className='d-flex align-items-center w-100 gap-2'>
                        <FaMagnifyingGlass />
                        <input onChange={handleChange} ref={inpRef} type="search" placeholder='What are you looking for...' style={{ outline: 0 }} className='w-100 border-0' />
                    </form> */}
                    <div className='d-flex align-items-center w-100 gap-2'>
                        <FaMagnifyingGlass />
                        <input onFocus={handleChange} onClick={handleChange} onChange={handleChange} ref={inpRef} type="search" placeholder='What are you looking for...' style={{ outline: 0 }} className='w-100 border-0' />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className='mt-5'>
                    <h2 className='searchTitle'>Popular Categories</h2>
                    <div className='d-flex flex-column gap-3 popularCateg'>
                        {cats.map((item) => <Link onClick={() => handleClose("search")} key={item.id} onMouseOver={() => handleHover(item.id)} to={`/products/all?categoryId=${item.id}`}>{item.name}</Link>)}
                    </div>
                    <h2 className='searchTitle'>Featured Best Sellers</h2>
                    <div className='d-flex flex-wrap justify-content-between shortResult'>
                        {searchItems?.map((item, index) => (
                            <SearchItem handleClose={handleClose} key={item.id} item={item} />
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Searchcanvas;
