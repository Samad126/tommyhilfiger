import { Link } from "react-router-dom"

import test from "../../assets/newArrival.jpg"
// import test from "../assets/test.jpg"

import testVideo from "../../assets/manVideo.mp4"
import littleMain from "../../assets/gift.webp"
import imgforlittle from "../../assets/imgfor4links.webp"
import "./homepage.css"
import BlackFriday from "../../components/Homepage/blackfriday/BlackFriday"
import DynamicSection from "../../components/Homepage/dynamicsection/DynamicSection"
import ExploreMore from "../../components/Homepage/exploremore/ExploreMore"


function Homepage() {
  return (
    <main>
      <BlackFriday />
      <DynamicSection header={"header1"} desc={"desc1"} img1={test} img2={test} isDynamic={true} video={testVideo} />
      <DynamicSection header={"header1"} desc={"desc1"} secondTitle={"secondTitle"} isDynamic={false} img1={littleMain} img2={littleMain} />
      <DynamicSection header={"header1"} desc={"desc1"} img1={test} img2={test} isDynamic={true} video={testVideo} />
      <div className="d-flex justify-content-evenly flex-wrap imageLinks">
        {(Array(4)).fill("").map((_, index) => (
          <Link key={index} className="d-flex flex-column flinks">
            <img src={imgforlittle} alt="Men's Shoes" />
            <span className="text-light">Men's Shoes</span>
          </Link>
        ))}
      </div>
      <ExploreMore />
    </main>
  )
}

export default Homepage