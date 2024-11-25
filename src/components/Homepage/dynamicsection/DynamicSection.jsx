import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./dynamicsection.css"
import { IoPauseOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

function DynamicSection({ header, desc, sectionLink, links, video, img1, img2, isDynamic, secondTitle }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();

  function handlePlay() {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();;
    setIsPlaying((prev) => !prev);
  }

  return (
    <section className="dynamicSection">
      <Link id="mobileImageLink">
        {isDynamic ?
          <video ref={videoRef} controls={false} autoPlay src={video} muted loop></video> :
          <img src={img1} alt="" />
        }
      </Link>
      <div id="desktopImageLink" className={!isDynamic ? "littleImageLink" : ""}>
        <Link>
          <img src={img2} alt="" />
        </Link>
        {/* <Link>
          <img src={img2} alt="" />
        </Link> */}
      </div>
      <div className="sectionMain">
        {!isDynamic && <h6 className="whiteTxt" >{secondTitle}</h6>}
        <h2 className="whiteTxt">{header}</h2>
        <p className="whiteTxt">{desc}</p>
        <div id="sectionCenterLinks">
          <Link className="whiteTxt bordered">Shop Men's New Arrivals</Link>
        </div>
      </div>
      <div id="sectionBottomLinks">
        <Link className="whiteTxt bordered">Shop Men's New Arrivals</Link>
      </div>
      {isDynamic ? <button onClick={handlePlay} id="toggler">{isPlaying ? <IoPauseOutline style={{ transform: "scale(1.5)" }} /> : <FaPlay />}</button> : ""}
    </section>
  )
}

export default DynamicSection