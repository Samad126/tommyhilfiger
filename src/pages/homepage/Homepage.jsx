import { Link } from "react-router-dom"

import manArrival from "../../assets/newArrival.jpg"
import womanArrival from "../../assets/womanArrival.jpg"
import handbagssatchelbags from "../../assets/handbagssatchelbags.webp"
import kidsbabyboy from "../../assets/kidsbabyboy.webp"
import menknits from "../../assets/menknits.webp"
import womanpant from "../../assets/womanpant.webp"

import manVideo from "../../assets/manVideo.mp4"
import womanVideo from "../../assets/womanVideo.mp4"
import littleMain from "../../assets/gift.webp"

import "./homepage.css"
import BlackFriday from "../../components/Homepage/blackfriday/BlackFriday"
import DynamicSection from "../../components/Homepage/dynamicsection/DynamicSection"
import ExploreMore from "../../components/Homepage/exploremore/ExploreMore"
import Seperator from "../../components/Homepage/seperator/Seperator"
import { Helmet } from "react-helmet"

const littleImgLinks = [
  {
    id: 2,
    img: menknits,
    text: "Men`s Knits",
    pageUrl: "products/all?subcategoryId=20"
  },
  {
    id: 1,
    img: womanpant,
    text: "Women`s Pants",
    pageUrl: "products/all?subcategoryId=2"
  },
  {
    img: kidsbabyboy,
    id: 3,
    text: "Kid`s Babyboy",
    pageUrl: "products/all?subcategoryId=28"
  },
  {
    id: 4,
    img: handbagssatchelbags,
    text: "Satchel Handbags",
    pageUrl: "products/all?subcategoryId=31"
  },
]

function Homepage() {
  return (
    <>
      <Helmet>
        <title>Tommy Hilfiger USA | Official Online Site and Store</title>
      </Helmet>
      <main>
        <BlackFriday />
        <Seperator />
        <DynamicSection
          header={"Wrapped In Tommy"}
          desc={"Explore Now"}
          img1={manArrival}
          img2={manArrival}
          isDynamic={true}
          video={manVideo}
          sectionLink={"products/all?categoryId=2&limit=100"}
          buttonText="Shop Men's New Arrivals"
        />
        <Seperator />
        <DynamicSection
          header={"Discover the Perfect Gift"}
          desc={"Find something special for everyone on your list."}
          secondTitle={"Celebrate the Season"}
          isDynamic={false}
          img1={littleMain}
          img2={littleMain}
        />
        <Seperator />
        <DynamicSection
          header={"New Arrivals for Her"}
          desc={"Discover timeless styles and elevate your wardrobe with our latest collection."}
          secondTitle={"Effortless Elegance"}
          img1={womanArrival}
          img2={womanArrival}
          isDynamic={true}
          video={womanVideo}
          sectionLink={"products/all?categoryId=1&limit=100"}
          buttonText="Shop Women's New Arrivals"
        />
        <Seperator />
        <div className="d-flex justify-content-evenly flex-wrap imageLinks">
          {littleImgLinks.map((imglink) => (
            <Link to={imglink.pageUrl} key={imglink.id} className="d-flex flex-column flinks">
              <img src={imglink.img} alt="Men's Shoes" />
              <span className="text-light">{imglink.text}</span>
            </Link>
          ))}
        </div>
        <ExploreMore />
      </main>
    </>
  )
}

export default Homepage