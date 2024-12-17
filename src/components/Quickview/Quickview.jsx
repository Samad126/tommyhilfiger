import { Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoStar } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleItem } from "../../redux/singleItemSlice";
import "./QuickView.css"
import "../../pages/singleProduct/singleproduct.css"
import { updateCartCount } from "../../redux/productsSlice";

function Quickview({ show, handleClose }) {
    const { selectedId } = useSelector((state) => state.prodItems.prodState);
    const { item, status } = useSelector((state) => state.singleItem);
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedCount, setSelectedCount] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        if (selectedId) {
            dispatch(fetchSingleItem(selectedId));
        }
    }, [selectedId, dispatch]);

    useEffect(() => {
        if (item) {
            setSelectedColor(item.Colors && item.Colors.length > 0 ? item.Colors[0] : '');
            setSelectedSize(null);
            setSelectedCount(1);
        }
    }, [item]);

    const handleAddToCart = (item) => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id && cartItem.selectedColor === selectedColor && cartItem.selectedSize === selectedSize);

        const newItem = {
            ...item,
            count: selectedCount,
            selectedColor,
            selectedSize
        };

        if (existingIndex === -1) {
            if (selectedCount > 5) {
                alert("Max stock is 5");
            } else {
                cartItems.push(newItem);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                alert("Item added to cart");
            }
        } else {
            const newCount = cartItems[existingIndex].count + selectedCount;
            if (newCount > 5) {
                alert("Max stock is 5");
            } else {
                cartItems[existingIndex].count = newCount;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                alert("Item quantity updated in cart");
            }
        }
        dispatch(updateCartCount());
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
                {status === "loading" && <p>Loading...</p>}
                {status === "succeeded" && item && (
                    <>
                        <div className="quickviewInfo h-75 overflow-y-auto pt-4">
                            <div className="h-75">
                                <Swiper
                                    slidesPerView={1.5}
                                    spaceBetween={10}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper h-100"
                                >
                                    {item.images.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                className="quickViewImage"
                                                src={img}
                                                style={{ width: "100%", borderRadius: "10px" }}
                                                alt={item.name || 'Item Image'}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="quickItemInfos py-4">
                                <h4 className="fs-6">{item.Brands?.name}</h4>
                                <h2 className="fs-4 fw-bolder my-3">{item.name}</h2>
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

                                <div id='color' className="my-3">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h2 className='specificTitle'>Color</h2>
                                    </div>
                                    <select
                                        style={{ padding: "10px 30px" }}
                                        value={selectedColor}
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                    >
                                        {item.Colors.map((color, index) => (
                                            <option key={index} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>

                                <div id='size' className="my-3">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h2 className='specificTitle'>Size</h2>
                                    </div>
                                    <div className='d-flex flex-wrap align-item-center gap-2 sizes'>
                                        {item.Size.map((prodSize, index) => (
                                            <button
                                                key={index}
                                                className={selectedSize === prodSize ? "selectedItem" : ""}
                                                onClick={() => setSelectedSize(prodSize === selectedSize ? null : prodSize)}
                                            >
                                                {prodSize}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id='bottomAddToCart' className="pt-3">
                            <div className="d-flex justify-content-between align-items-stretch mb-3">
                                <div className='selectSection d-flex flex-column' style={{ marginRight: "10px" }}>
                                    <label htmlFor="countSelector">Qty</label>
                                    <select
                                        id="countSelector"
                                        value={selectedCount}
                                        onChange={(e) => setSelectedCount(Number(e.target.value))}
                                        disabled={selectedSize == null}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <button
                                    id="addToCartButton"
                                    className="w-75 p-0"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    {selectedSize ? "Add To Cart" : "Select a size"}
                                </button>
                            </div>
                            <Link to={`/products/details/${selectedId}`} onClick={(e) => handleClose(e, item.id, 'type')} className="d-block text-center mt-4 text-decoration-underline lightColorText">
                                View Full Product Details
                            </Link>
                        </div>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Quickview;
