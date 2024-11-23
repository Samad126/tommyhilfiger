import { Link } from "react-router-dom"

function DynamicSection({ header, title, sectionLink, links, video, img1, img2, isDynamic }) {
  return (
    <section>
      <Link id="mobileImageLink">
        {isDynamic ?
          <video controls={false} autoPlay src={video} muted loop></video> :
          <img src={img1} alt="" />
        }
      </Link>
      <div id="desktopImageLink">
        <Link>
          <img src={img1} alt="" />
        </Link>
        <Link>
          <img src={img2} alt="" />
        </Link>
      </div>
      <div id="sectionMain">
        <h2>Wrapped In Tommy</h2>
        <p>Discover stylish picks for perfect holiday
          moments, curated by Damson Idris.</p>
        <div>
          <Link>Shop Men's New Arrivals</Link>
        </div>
      </div>
      <Link>Shop Men's New Arrivals</Link>
      {isDynamic ? <button id="toggler">On OFF</button> : ""}
    </section>
  )
}

export default DynamicSection