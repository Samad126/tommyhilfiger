import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import demoImg from "../../assets/demonigga.jpeg";

function Carusel({ handleClick, images }) {
    const [index, setIndex] = useState(0);
    const [isQuickViewHovered, setIsQuickViewHovered] = useState(false);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <button
                className="quickViewBtn"
                onMouseEnter={() => setIsQuickViewHovered(true)}
                onMouseLeave={() => setIsQuickViewHovered(false)}
                onClick={handleClick}
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
