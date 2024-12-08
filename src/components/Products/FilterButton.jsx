import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";

function FilterButton({ item }) {
    const { size = [], color = []} = useSelector(
        (state) => state.filter.filters
    );

    const dispatch = useDispatch();

    const defaultMinPrice = 0;
    const defaultMaxPrice = 1000;

    const handleFilterChange = (type, value) => {
        switch (type) {
            case "size":
                const updatedSize = Array.isArray(size) ? size : [];
                const newSize = updatedSize.filter((item) => item !== value);
                dispatch(setFilter({ key: "size", value: newSize }));
                break;
            case "color":
                const updatedColor = Array.isArray(color) ? color : [];
                const newColor = updatedColor.filter((item) => item !== value);
                dispatch(setFilter({ key: "color", value: newColor }));
                break;
            case "discount":
                dispatch(setFilter({ key: "discount", value: null }));
                break;
            case "minPrice":
                dispatch(setFilter({ key: "minPrice", value: null }));
                break;
            case "maxPrice":
                dispatch(setFilter({ key: "maxPrice", value: null }));
                break;
            default:
                break;
        }
    };

    if (Array.isArray(item[1])) {
        return (
            <>
                {item[1].map((filter, index) => (
                    <button
                        key={index}
                        className="d-flex align-items-center justify-content-between"
                        onClick={() => handleFilterChange(item[0], filter)}
                    >
                        {filter} <IoCloseSharp />
                    </button>
                ))}
            </>
        );
    }

    if (item[0] === "discount") {
        return (
            <button
                className="d-flex align-items-center justify-content-between"
                onClick={() => handleFilterChange("discount", false)}
            >
                Discount: {item[1].toString()} <IoCloseSharp />
            </button>
        );
    }

    if (item[0] === "minPrice" || item[0] === "maxPrice") {
        const label = item[0] === "minPrice" ? "Min Price" : "Max Price";
        return (
            <button
                className="d-flex align-items-center justify-content-between"
                onClick={() => handleFilterChange(item[0], item[0] === "minPrice" ? defaultMinPrice : defaultMaxPrice)}
            >
                {label}: {item[1]} <IoCloseSharp />
            </button>
        );
    }

    return (
        <button
            className="d-flex align-items-center justify-content-between"
            onClick={() => handleFilterChange(item[0], item[1])}
        >
            {item[1]} <IoCloseSharp />
        </button>
    );
}

export default FilterButton;
