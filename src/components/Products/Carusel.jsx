import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import demoImg from "../../assets/demonigga.jpeg";
import { useDispatch } from 'react-redux';
import { setUIState } from '../../redux/productItems';

function Carusel({ handleClick, images, itemId }) {
    const [index, setIndex] = useState(0);
    const [isQuickViewHovered, setIsQuickViewHovered] = useState(false);

    const dispatch = useDispatch();

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
        dispatch(setUIState({key : "selectedId", value : itemId}));
    };

    return (
        <>
            <button
                className="quickViewBtn"
                onMouseEnter={() => setIsQuickViewHovered(true)}
                onMouseLeave={() => setIsQuickViewHovered(false)}
                onClick={(e) => handleClick(e, itemId)}
            >
                Quick View
            </button>
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                controls={!isQuickViewHovered}
                indicators={!isQuickViewHovered}
                fade
            >
                {images.map((img, index) => (
                    <Carousel.Item key={index}>
                        <img className='w-100' src={img} alt="img" />
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default Carusel;
