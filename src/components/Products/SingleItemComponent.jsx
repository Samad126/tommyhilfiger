import { Link } from "react-router-dom"
import Carusel from "./Carusel"
import { IoStar } from "react-icons/io5"

function SingleItem({ item, handleItemshow }) {
  return (
    <div>
      <Link to={`../details/${item.id}`}>
        <Carusel images={item.images} handleClick={(e) => handleItemshow(e)} />
      </Link>
      <div className="p-2">
        <Link to={`../details/${item.id}`} className="prodItemTitle">{item.name}</Link>
        <p className="d-flex gap-1 price">
          <span className="prevPrice">${item.price}</span>
          <span className="newPrice">${Math.round(item.price - Math.round(((item.price) * item.discount) / 100))}</span>
          <span className="discount">{item.discount}% off</span>
        </p>
        <p className="discountDesc">Extra 20% off $200+ for VIPs</p>
        <div className='d-flex stars'>
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>
      </div>
    </div>
  )
}

export default SingleItem