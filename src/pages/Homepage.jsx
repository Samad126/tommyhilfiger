import { Link } from "react-router-dom"
import DynamicSection from "../components/Homepage/DynamicSection"
// import video from "../assets/vv.mp4"
import test from "../assets/test.jpg"

function Homepage() {
  return (
    <main>
      <section id="blackFriday">
        <Link></Link>
        <div>
          <h4>Black Friday Early Access</h4>
          <h2>50% Off Sitewide</h2>
          <div>
            <Link>Shop Men</Link>
            <Link>Shop Women</Link>
            <Link>Shop Kids</Link>
            <Link>Shop Accessories</Link>
          </div>
        </div>
      </section>
      <DynamicSection />
      <DynamicSection />
      <DynamicSection />
      <div>
        <Link>
          Men's Shoes
        </Link>
        <Link>
          Men's Sweaters
        </Link>
        <Link>
          Accessories
        </Link>
        <Link>
          Woman's Bags
        </Link>
      </div>
      <DynamicSection />
      <section>
        <h2>Explore more</h2>
        <div>
          <Link>Men's Tops</Link>
          <Link>Men's Sweatshirts</Link>
          <Link>Women's Tops</Link>
          <Link>Women's Sweatshirts</Link>
        </div>
        <div>
          <div>
            <Link><img src={test} alt="" /></Link>
            <div>
              <h6>E-Gift Cards</h6>
              <Link>Shop Now</Link>
            </div>
          </div>
          <div>
            <Link><img src={test} alt="" /></Link>
            <div>
              <h6>E-Gift Cards</h6>
              <Link>Shop Now</Link>
            </div>
          </div>
          <div>
            <Link><img src={test} alt="" /></Link>
            <div>
              <h6>E-Gift Cards</h6>
              <Link>Shop Now</Link>
            </div>
          </div>
          <div>
            <Link><img src={test} alt="" /></Link>
            <div>
              <h6>E-Gift Cards</h6>
              <Link>Shop Now</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Homepage