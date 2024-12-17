import { IoCloseSharp, IoStar } from "react-icons/io5"
import { PiSlidersHorizontal } from "react-icons/pi"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getInitialFilters } from "../../redux/filterSlice"

import "./productItems.css"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import Category from "../Category/Category"
import { useEffect, useRef } from "react"
import Quickview from "../Quickview/Quickview"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/productsSlice"
import SingleItem from "./SingleItemComponent"
import { resetFilters, setFilter, setFiltersFromQuery, setInitialFilter } from "../../redux/filterSlice"
import FilterButton from "./FilterButton"
import { setUIState } from "../../redux/productItems"

function ProductItems() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const { items } = useSelector((state) => state.products);
    const { filters, initialFilters, importantFilters } = useSelector((state) => state.filter);
    // console.log(filters);

    const { catShow, itemShow, selectedCat } = useSelector((state) => state.prodItems.prodState);

    const firstFilterRef = useRef(true);

    // console.log(initialFilters, searchParams);
    useEffect(() => {
        if (!firstFilterRef.current) {
            const params = searchParams.toString();
            const paramsObj = Object.fromEntries(searchParams.entries());
            dispatch(setFiltersFromQuery(paramsObj));
            dispatch(fetchProducts(location.pathname + "?" + params));
        }
    }, [dispatch, initialFilters]);

    useEffect(() => {
        if (firstFilterRef.current) {
            firstFilterRef.current = false;
            return;
        }

        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(filters)) {
            if (Array.isArray(value) && value.length > 0) {
                params.set(key, value.join(","));
            } else if (!Array.isArray(value) && value !== "") {
                params.set(key, value);
            }
        }

        console.log(params.get("discount"));
        setSearchParams(params);
    }, [filters, setSearchParams]);

    document.querySelectorAll('.carousel-indicators button, .carousel-control-prev button, .carousel-control-next button').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });

    useEffect(() => {
        const updatedParamsObj = getInitialFilters();

        let importantParams = Object.entries(Object.fromEntries(searchParams.entries()))
            .filter(
                (filter) =>
                    filter[0] !== "categoryId" &&
                    filter[0] !== "subcategoryId" &&
                    filter[0] !== "limit" &&
                    filter[0] !== "sortBy" &&
                    filter[0] !== "sortOrder"
            )
            .map(([key, value]) => {
                if (key === "size" || key === "color") {
                    return [key, typeof value === "string" ? value.split(",") : value];
                }
                return [key, value];
            });

        let updatedImportantParams = {};
        importantParams.forEach(element => {
            updatedImportantParams[element[0]] = element[1];
        });

        dispatch(setInitialFilter({ updatedParamsObj, updatedImportantParams }));
    }, [dispatch, searchParams]);

    function handleCatshow() {
        dispatch(setUIState({ key: 'catShow', value: !catShow }));
    }

    function handleItemshow(e, id, type) {
        if (e && e.preventDefault && !type) {
            e.preventDefault();
        }
        dispatch(setUIState({ key: 'itemShow', value: !itemShow }));
        dispatch(setUIState({ key: 'selectedId', value: id }));
    }

    function handleSortChange(e) {
        dispatch(setFilter({ key: "sortBy", value: !filters.sortBy ? "price" : null }));
        dispatch(setFilter({ key: "sortOrder", value: !filters.sortOrder ? e.target.value : null }));
    }

    function handleCategSwitch(num) {
        dispatch(setUIState({ key: 'selectedCat', value: num }));
        dispatch(setUIState({ key: 'catShow', value: !catShow }));
    }

    const filterCount = Object.entries(importantFilters)
        ?.filter((item) => Array.isArray(item[1]) ? item[1].length > 0 : item[1]).length;

    return (
        <div id="mainProductSection" className="mt-4">
            <Category selectedIndex={selectedCat} show={catShow} handleClose={handleCatshow} />
            <Quickview show={itemShow} handleClose={handleItemshow} />
            <div id="mobileFilterSection" className="d-flex align-items-center justify-content-between px-3">
                <p className="m-0">{items?.data?.length} Items</p>
                <button onClick={handleCatshow} className="d-flex align-items-center gap-2 filterSortBtn"><PiSlidersHorizontal /> Filter & Sort</button>
            </div>
            <div id="desktopFilterSection" className="d-flex justify-content-between align-items-start px-3">
                <div id="categsBtns" className="d-flex flex-wrap gap-3 align-items-center w-50">
                    <button onClick={() => handleCategSwitch(0)} className="d-flex align-items-center justify-content-between">Size <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={() => handleCategSwitch(1)} className="d-flex align-items-center justify-content-between">Color <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={() => handleCategSwitch(2)} className="d-flex align-items-center justify-content-between">Discount <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={() => handleCategSwitch(3)} className="d-flex align-items-center justify-content-between">Price <MdOutlineKeyboardArrowDown /></button>
                    <button onClick={() => handleCategSwitch(null)} className="d-flex align-items-center justify-content-between">All Filters <MdOutlineKeyboardArrowDown /></button>
                </div>
                <div className="d-flex align-items-center gap-2 desktopSort">
                    <p className="m-0">{items?.data?.length} Items</p>
                    <div id="seperator"></div>
                    <label htmlFor="sortSelect">Sort By</label>
                    <div className="px-3 selectWrapper">
                        <select value={filters?.sortOrder || ""} onChange={handleSortChange} name="" id="sortSelect">
                            <option value="asc">Price Low To High</option>
                            <option value="desc">Price High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="filterSettings" className="d-flex align-items-center mt-3 gap-2 px-3 overflow-auto">
                <div id="filters" className="d-flex align-items-center gap-2">
                    {Object.entries(importantFilters)?.map((item, index) => (
                        <FilterButton key={index} item={item} />
                    ))}
                </div>
                {filterCount > 0 && <button onClick={() => dispatch(resetFilters())} id="clearAllBtn">Clear All</button>}
            </div>
            <div className="my-5" id="productItems">
                {items?.data?.map((item) => (
                    <SingleItem key={item.id} item={item} handleItemshow={handleItemshow} />
                ))}
            </div>
        </div>
    )
}

export default ProductItems;
