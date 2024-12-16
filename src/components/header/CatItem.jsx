import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { resetImportantFilter } from '../../redux/filterSlice';
// import nese from "../../assets/menknits.webp"

function CatItem({ catData }) {
    const { name, slug, Subcategory, id, singleInfo } = catData;

    const dispatch = useDispatch();

    return (
        <li className='cat'>
            <Link onClick={() => (dispatch(resetImportantFilter()))} to={`/products/all?categoryId=${id}&limit=100`}>{name}</Link>
            <div className='d-flex justify-content-center align-items-start moreCat'>
                <Link onClick={() => (dispatch(resetImportantFilter()))} to={`/products/all?subcategoryId=${singleInfo.id}&limit=100`}><img src={singleInfo.image} alt="" /></Link>
                <div className='moreCatLinks'>
                    <h4 className='mb-4'>Featured</h4>
                    <nav>
                        <ul>
                            {Subcategory.map((item, index) => (
                                <li className='mb-1' key={index}><Link onClick={() => (dispatch(resetImportantFilter()))} to={`/products/all?subcategoryId=${item.id}&limit=100`}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </li>
    )
}

export default CatItem