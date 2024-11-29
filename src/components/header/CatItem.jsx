import React from 'react'
import { Link } from 'react-router-dom'

function CatItem({ catData }) {
    const { name, slug, Subcategory, id } = catData;

    return (
        <li className='cat'>
            <Link to={`/products/all?categoryId=${id}&limit=100`}>{name}</Link>
            <div className='moreCat'>
                {/* <Link><img src="" alt="" /></Link> */}
                <div>
                    <h4>Featured</h4>
                    <nav>
                        <ul>
                            {Subcategory.map((item, index) => (
                                <li key={index}><Link to={`/products/all?subcategoryId=${item.id}&limit=100`}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </li>
    )
}

export default CatItem