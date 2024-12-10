import "./products.css"
import ProductItems from "../../components/Products/ProductItems"
import BreadCrumbComponent from "../../components/BreadCrumbComponent";

function Products() {
    return (
        <main>
            <div className="mainContainer">
                <BreadCrumbComponent />
                <ProductItems />
            </div>
        </main>
    );
}

export default Products;
