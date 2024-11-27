import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import demoImg from "../../assets/demonigga.jpeg";

function Carusel({handleClick}) {
    const [index, setIndex] = useState(0);
    const [isQuickViewHovered, setIsQuickViewHovered] = useState(false);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    console.log(handleClick);
    
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
                <Carousel.Item>
                    <img className='w-100' src={demoImg} alt="" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className='w-100' src={demoImg} alt="" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className='w-100' src={demoImg} alt="" />
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default Carusel;
