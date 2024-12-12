import { Link } from "react-router-dom"
import "./exploreMore.css"

function ExploreMore() {
    return (
        <section id="exploreMore">
            <h2>Explore more</h2>
            <div className="d-flex justify-content-between flex-wrap exploreLinks">
                <Link to={"products/all?subcategoryId=19"} className="bordered blueBorder">Men's Jackets</Link>
                <Link to={"products/all?subcategoryId=25"} className="bordered blueBorder">Men's Tees & Tanks</Link>
                <Link to={"products/all?subcategoryId=17"} className="bordered blueBorder">Women's Bodysuit</Link>
                <Link to={"products/all?subcategoryId=1"} className="bordered blueBorder">Women's Shirt</Link>
            </div>
        </section>
    )
}

export default ExploreMore