import { Breadcrumb } from "react-bootstrap"
import { Link } from "react-router-dom"

import "./products.css"
import ProductItems from "../../components/Products/ProductItems"

function Products() {
    return (
        <main>
            <div className="mainContainer">
                <div className="p-3">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                            Library
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                    <h2 id="categTitle">Men's Clothing</h2>
                    <div className="subcategLinks d-flex gap-3">
                        <Link>Tops</Link>
                        <Link>Bottoms</Link>
                        <Link>Jackets & Coats</Link>
                    </div>
                </div>
                <ProductItems />
            </div>
        </main>
    )
}

export default Products