import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function BreadCrumbComponent() {
    const { cats } = useSelector((state) => state.categories);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { selectedCat, selectedSubCat, activeTitle } = useMemo(() => {
        const tempCatId = Number(searchParams.get("categoryId"));
        const tempSubcatId = Number(searchParams.get("subcategoryId"));

        const selectedCat = cats?.find((cat) => cat.id === tempCatId) || 
                            cats?.find((cat) =>
                                cat.Subcategory?.some((sub) => sub.id === tempSubcatId)
                            );

        const selectedSubCat = selectedCat?.Subcategory?.find((sub) => sub.id === tempSubcatId);
        const activeTitle = selectedSubCat?.name || selectedCat?.name || '';

        return { selectedCat, selectedSubCat, activeTitle };
    }, [cats, searchParams]);

    return (
        <div className="p-3">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <button onClick={() => navigate("/")}>Home</button>
                </Breadcrumb.Item>

                {selectedCat && (
                    <Breadcrumb.Item>
                        <button
                            onClick={() =>
                                navigate(`/products/all?categoryId=${selectedCat.id}&limit=100`)
                            }
                        >
                            {selectedCat.name}
                        </button>
                    </Breadcrumb.Item>
                )}

                {selectedSubCat && <Breadcrumb.Item active>{selectedSubCat.name}</Breadcrumb.Item>}
            </Breadcrumb>

            <h2 id="categTitle">{activeTitle}</h2>

            {selectedCat?.Subcategory && !selectedSubCat && (
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
    );
}

export default BreadCrumbComponent;
