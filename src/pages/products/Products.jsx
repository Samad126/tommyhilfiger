import { Breadcrumb } from "react-bootstrap"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./products.css"
import ProductItems from "../../components/Products/ProductItems"

function Products() {
    const { cats } = useSelector((state) => state.categories);
    const [searchParams] = useSearchParams();
    const [catId, setCatId] = useState(null);
    const [subCatId, setSubCatId] = useState(null);
    const [activeTitle, setActiveTitle] = useState('');
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedSubCat, setSelectedSubCat] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        const tempCatId = Number(params.categoryId);
        const tempSubcatId = Number(params.subcategoryId);

        if (cats && cats.length > 0) {
            if (tempCatId) {
                const foundCat = cats.find((cat) => cat.id === tempCatId);
                setCatId(tempCatId);
                setSubCatId(null);
                setActiveTitle(foundCat?.name || '');
                setSelectedCat(foundCat);
                setSelectedSubCat(null);
            } else if (tempSubcatId) {
                const catWithSub = cats.find((cat) =>
                    cat.Subcategory?.some((subCateg) => subCateg.id === tempSubcatId)
                );
                const subCateg = catWithSub?.Subcategory?.find((subCateg) => subCateg.id === tempSubcatId);
                setCatId(null);
                setSubCatId(tempSubcatId);
                setActiveTitle(subCateg?.name || '');
                setSelectedCat(catWithSub);
                setSelectedSubCat(subCateg);
            } else {
                setCatId(null);
                setSubCatId(null);
                setActiveTitle('');
                setSelectedCat(null);
                setSelectedSubCat(null);
            }
        }
    }, [cats, searchParams]);

    console.log(catId, subCatId);

    return (
        <main>
            <div className="mainContainer">
                <div className="p-3">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <button onClick={() => navigate("/")}>Home</button>
                        </Breadcrumb.Item>

                        {selectedCat && selectedSubCat && (
                            <>
                                <Breadcrumb.Item>
                                    <button onClick={() => navigate(`/products/all?categoryId=${selectedCat.id}&limit=100`)}>
                                        {selectedCat.name}
                                    </button>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    {selectedSubCat.name}
                                </Breadcrumb.Item>
                            </>
                        )}

                        {selectedCat && !selectedSubCat && (
                            <Breadcrumb.Item active>
                                {selectedCat.name}
                            </Breadcrumb.Item>
                        )}
                    </Breadcrumb>

                    <h2 id="categTitle">{activeTitle}</h2>

                    {selectedCat && !selectedSubCat && selectedCat.Subcategory && (
                        <div className="subcategLinks d-flex gap-3">
                            {selectedCat.Subcategory.map((sc) => (
                                <Link
                                    key={sc.id}
                                    to={`/products/all?subcategoryId=${sc.id}&limit=100`}
                                >
                                    {sc.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <ProductItems />
            </div>
        </main>
    );
}

export default Products;
