import { Link } from "react-router-dom"
import niggaFriday from "../../../assets/blackFriday.webp"

import "./blackFriday.css"

function BlackFriday() {
    return (
        <section id="blackFriday">
            <Link>
                <img src={niggaFriday} alt="black friday" />
            </Link>
            <div id="fridayMain">
                <h4 className="whiteTxt">Black Friday Early Access</h4>
                <h2 className="whiteTxt">50% Off Sitewide</h2>
                <div className="d-flex gap-4 flex-wrap justify-content-center">
                    <Link to={`products/all?categoryId=2`} className="whiteTxt bordered">Shop Men</Link>
                    <Link to={`products/all?categoryId=1`} className="whiteTxt bordered">Shop Women</Link>
                    <Link to={`products/all?categoryId=3`} className="whiteTxt bordered">Shop Kids</Link>
                    <Link to={`products/all?categoryId=4`} className="whiteTxt bordered">Shop Handbags</Link>
                </div>
            </div>
        </section>
    )
}

export default BlackFriday