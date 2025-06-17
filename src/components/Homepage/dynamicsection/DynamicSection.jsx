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
      <Link
        id="mobileImageLink"
        to={sectionLink}
        onClick={() => (dispatch(resetImportantFilter()))}
        aria-label={isDynamic ? "Video link for " + header : "Image link for " + header}
      >
        {isDynamic ?
          <video ref={videoRef} controls={false} autoPlay src={video} muted loop aria-label={header}></video> :
          <img src={img1} alt={header + " image"} />
        }
      </Link>
      <div id="desktopImageLink" className={!isDynamic ? "littleImageLink" : ""}>
        <Link
          to={sectionLink}
          onClick={() => (dispatch(resetImportantFilter()))}
          aria-label={"Image link for " + header}
        >
          <img src={img2} alt={header + " image"} />
        </Link>
      </div>
      <div className="sectionMain">
        <h2>{header}</h2>
        <p>{desc}</p>
        {secondTitle && <h3 className="whiteTxt">{secondTitle}</h3>}
        <div id="sectionCenterLinks">
          <Link to={sectionLink} onClick={() => (dispatch(resetImportantFilter()))} className="whiteTxt bordered mx-auto" aria-label={buttonText}>
            {buttonText}
          </Link>
        </div>
      </div>
      <div id="sectionBottomLinks">
        <Link to={sectionLink} onClick={() => (dispatch(resetImportantFilter()))} className="whiteTxt bordered" aria-label={buttonText}>
          {buttonText}
        </Link>
      </div>
      {video && (
        <button id="toggler" onClick={handlePlay} aria-label={isPlaying ? "Pause video" : "Play video"}>
          {isPlaying ? <IoPauseOutline /> : <FaPlay />}
        </button>
      )}
    </section>
  )
}

export default DynamicSection
