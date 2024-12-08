import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { resetImportantFilter } from '../../redux/filterSlice';

function CatItem({ catData }) {
    const { name, slug, Subcategory, id } = catData;

    const dispatch = useDispatch();

    return (
        <li className='cat'>
            <Link onClick={() => (dispatch(resetImportantFilter()))} to={`/products/all?categoryId=${id}&limit=100`}>{name}</Link>
            <div className='moreCat'>
                {/* <Link><img src="" alt="" /></Link> */}
                <div>
                    <h4>Featured</h4>
                    <nav>
                        <ul>
                            {Subcategory.map((item, index) => (
                                <li key={index}><Link onClick={() => (dispatch(resetImportantFilter()))} to={`/products/all?subcategoryId=${item.id}&limit=100`}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </li>
    )
}

export default CatItem