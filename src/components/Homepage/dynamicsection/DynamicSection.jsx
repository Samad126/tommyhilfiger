import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./dynamicsection.css"
import { IoPauseOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetImportantFilter } from "../../../redux/filterSlice";

function DynamicSection({ header, desc, sectionLink, links, video, img1, img2, isDynamic, secondTitle, buttonText }) {
  // const { header, desc, sectionLink, links, video, img1, img2, isDynamic, secondTitle, buttonText } = props;

  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();

  function handlePlay() {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();;
    setIsPlaying((prev) => !prev);
  }

  const dispatch = useDispatch();

  return (
    <section className="dynamicSection">
      <Link id="mobileImageLink" to={sectionLink} onClick={() => (dispatch(resetImportantFilter()))}>
        {isDynamic ?
          <video ref={videoRef} controls={false} autoPlay src={video} muted loop></video> :
          <img src={img1} alt="" />
        }
      </Link>
      <div id="desktopImageLink" className={!isDynamic ? "littleImageLink" : ""}>
        <Link to={sectionLink} onClick={() => (dispatch(resetImportantFilter()))}>
          <img src={img2} alt="" />
        </Link>
      </div>
      <div className="sectionMain">
        {!isDynamic && <h6 className="whiteTxt" >{secondTitle}</h6>}
        <h2 className="whiteTxt">{header}</h2>
        <p className="whiteTxt">{desc}</p>
        <div id="sectionCenterLinks">
          <Link to={sectionLink} onClick={() => (dispatch(resetImportantFilter()))} className="whiteTxt bordered mx-auto">{buttonText}</Link>
        </div>
      </div>
      <div id="sectionBottomLinks">
        <Link to={sectionLink} onClick={() => (dispatch(resetImportantFilter()))} className="whiteTxt bordered">{buttonText}</Link>
      </div>
      {isDynamic ? <button onClick={handlePlay} id="toggler">{isPlaying ? <IoPauseOutline style={{ transform: "scale(1.5)" }} /> : <FaPlay />}</button> : ""}
    </section>
  )
}

export default DynamicSection