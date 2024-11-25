import { Link } from "react-router-dom"
import "./exploreMore.css"

function ExploreMore() {
    return (
        <section id="exploreMore">
            <h2>Explore more</h2>
            <div className="d-flex justify-content-between flex-wrap exploreLinks">
                <Link className="bordered blueBorder">Men's Tops</Link>
                <Link className="bordered blueBorder">Men's Sweatshirts</Link>
                <Link className="bordered blueBorder">Women's Tops</Link>
                <Link className="bordered blueBorder">Women's Sweatshirts</Link>
            </div>
        </section>
    )
}

export default ExploreMore