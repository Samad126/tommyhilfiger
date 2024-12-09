import { Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleItem } from "../../redux/singleItemSlice";
import "./QuickView.css"

function Quickview({ show, handleClose }) {
    const { selectedId } = useSelector((state) => state.prodItems.prodState);
    const { item, status } = useSelector((state) => state.singleItem);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedId) {
            dispatch(fetchSingleItem(selectedId));
        }
    }, [selectedId, dispatch]);

    console.log('Quickview status:', status, 'Item:', item, 'selectedId:', selectedId);

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
                {item ? <>
                        <div className="h-75 overflow-y-auto">
                            <div className="h-50">
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={30}
                                    pagination={{ clickable: true }}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper h-100"
                                >
                                    {item.images.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img 
                                                className="quickViewImage" 
                                                src={img} 
                                                alt={item.name || 'Item Image'} 
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="quickItemInfos">
                                <h4>{item.Brands.name}</h4>
                                <h2>{item.name}</h2>
                                <div className='d-flex stars'>
                                    {[...Array(5)].map((_, i) => <IoStar key={i} />)}
                                </div>
                                {item.discount && item.discount > 0 ? (
                                    <p className="d-flex gap-1 price">
                                        <span className="prevPrice highfont">${item.price}</span>
                                        <span className="newPrice highfont">
                                            ${Math.round(item.price - Math.round((item.price * item.discount) / 100))}
                                        </span>
                                        <span className="discount highfont">{item.discount}% off</span>
                                    </p>
                                ) : (
                                    <p className="d-flex gap-1 price">
                                        <span className="newPrice highfont">${item.price}</span>
                                    </p>
                                )}
                                <div id='color'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h2 className='specificTitle'>Color</h2>
                                    </div>
                                    <select style={{ padding: "10px 30px" }} name="" id="">
                                        {item.Colors.map((color, index) => <option key={index} value={color}>{color}</option>)}
                                    </select>
                                </div>
                                <div id='size'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h2 className='specificTitle'>Size</h2>
                                    </div>
                                    <div id='sizes' className='d-flex flex-wrap align-item-center gap-2'>
                                        {item.Size.map((prodSize, index) => <button key={index}>{prodSize}</button>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='bottomAddToCart'>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className='selectSection d-flex flex-column'>
                                        <label htmlFor="countSelector">Qty</label>
                                        <select name="" id="countSelector">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="w-75">Select a size</button>
                            </div>
                            <Link to={`/products/details/${selectedId}`}>View Full Product Details</Link>
                        </div>
                    </> : <p>loading</p>}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Quickview;
