import { IoStar } from "react-icons/io5"
import { Link } from "react-router-dom"

function SearchItem({ item, handleClose }) {
    return (
        <Link to={`/products/details/${item.id}`} onClick={handleClose}>
            <img src={item.images[0]} alt="" />
            <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <div className='d-flex gap-1 stars'>
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                </div>
            </div>
        </Link>
    )
}

export default SearchItem