import { useEffect, useRef, useState } from "react"

// import fpFrame1 from "../assets/featured-products/featured-product-frame-1.svg"
import battletechNewArrivalsFrame from "/src/assets/block-collection/frames/collection-frame-battletech-new-arrivals.svg"
import shadowrunNewArrivalsFrame from "/src/assets/block-collection/frames/collection-frame-shadowrun-new-arrivals.svg"
import ProductResult from "../components/ProductResult"

import { Link, NavLink, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import CollectionBlock from "../components/CollectionBlock"
import { Offcanvas } from "react-bootstrap"
import FeaturedProductBanner from "../components/FeaturedProductBanner"
import loadingSpinner from "../assets/loader-large.gif"

export default function Collections() {

    //For content determination
    const {id} = useParams()
    const [searchParams, setSearchParams] = useSearchParams({
        sort_by:"name",
        page: 1,
        // sort_order:"",
        // universe: id,
        // types:[],
        // tags:[],
    })

    const [currentCategory, setCurrentCategory] = useState("all-products")

    const productList = useSelector(state => state.products.productList)
    // const status = useSelector(state => state.products.status)
    const [localProductList, setLocalProductList] = useState()
    const [typeList, setTypeList] = useState()
    const [tagList, setTagList] = useState()

    //For overwriting the w/filter history as opposed to adding to it
    const navigate = useNavigate()
    const location = useLocation()
    
    const replaceSearchParams = (newParams) => {
        // console.log(Array.from(searchParams.entries()));
        console.log(newParams);
        const newSearch = new URLSearchParams({
            ...Object.fromEntries(searchParams),
            ...newParams,
        }).toString();
    
        // Use navigate to replace the current entry in the history stack
        navigate(`${location.pathname}?${newSearch}`, { replace: true });
    };
    
    //Pagination
    const [currentPage, setCurrentPage] = useState()
    const [pageResults, setPageResults] = useState()
    const [pageCount, setPageCount] = useState()
    const resultsPerPage = 4


    const handlePageChange = (direction) => {
        const newPage = currentPage + direction
    
        if (newPage >= 1 && newPage <= pageCount) {
            setCurrentPage(newPage)

            setSearchParams(prevSearch => {
                prevSearch.set('page', newPage)
                return prevSearch;
            })
        }
    }

    //Counting filters
    const [filterNumber, setFilterNumber] = useState(0)

    useEffect(() => {
        if (localProductList) {
            const page = searchParams.get('page')
            const currentPageItems = localProductList.slice((page - 1) * resultsPerPage, page * resultsPerPage)

            setCurrentPage(parseInt(searchParams.get('page')))
            setPageResults(currentPageItems)
        }
    },[localProductList, searchParams.get('page')]) //searchParams.get('page')

    //PAGE INITIALIZATION
    useEffect(() => {
        let tempProductList = []
        let typeInstanceList = {}
        let tagInstanceList = {}
        
        const categorySearchParams = searchParams.get('categories')? searchParams.get('categories'): "all-products"
        setCurrentCategory(categorySearchParams)

        const typeSearchParams = searchParams.get('types')? JSON.parse(searchParams.get('types')): []
        const tagSearchParams = searchParams.get('tags')? JSON.parse(searchParams.get('tags')): []

        //Product Setup
        const processProduct = (p) => {
            if (
                categorySearchParams === "all-products" || 
                (categorySearchParams === "on-sale" && p.isOnSale) ||
                (categorySearchParams === "getting-started" && p.isGettingStarted) ||
                (categorySearchParams === "free-downloads" && p.isFree)
            ) {
                if (typeSearchParams.length === 0 || typeSearchParams.includes(p.type)) {
                    if (tagSearchParams.length === 0 || (p.tags && tagSearchParams.some(tag => p.tags.includes(tag)))) {
                        tempProductList.push(<ProductResult key={p.id} product={p}/>)
                    }
            
                    if (Array.isArray(p.tags)) {
                        for (let tag of p.tags) {
                            tagInstanceList[tag] = (tagInstanceList[tag] || 0) + 1
                        }
                    }
                }        
                typeInstanceList[p.type] = (typeInstanceList[p.type] || 0) + 1
            }
        }

        //Filter setup
        const createFilterList = (instanceList, filterType) => {
            const sortedInstanceList = Object.entries(instanceList).sort()

            return sortedInstanceList.map(([name, count]) => (
                <li className="search-results__filter-li" key={name}>
                    <input 
                        type="checkbox"
                        onChange={() => handleFilterChange(filterType, name)}
                        id={`${name}-checkbox`}
                        name={`${name}-checkbox`}
                        value={name}
                        checked={searchParams.get(filterType)?.includes(name) || false}
                    />
                    <label htmlFor={`${name}-checkbox`}>{`${name} (${count})`}</label>
                </li>
            ))
        }

        //Getting and printing page-contents
        if (productList) {
            //ALL UNIVERSE
            if (id === "all") {
                Object.keys(productList).forEach(universe => { //For each Product Universe
                    Object.values(productList[universe]).forEach(processProduct)//For each Product in that Universe
                })
            }
            //SINGLE UNIVERSE
            else if (Object.keys(productList).includes(id)) {
                Object.values(productList[id]).forEach(processProduct) //For each Product in the ID Universe
            }
            //SOMETHING BLEW UP
            else console.log("There was an error loading categories from productList!")

            //Pagination setup
            const totalPages = Math.ceil(tempProductList.length / resultsPerPage)
            setPageCount(totalPages)

            //Filter setup
            setTypeList(createFilterList(typeInstanceList, 'types'))
            setTagList(createFilterList(tagInstanceList, 'tags'))

            //Filter count for mobile indicator
            const tags = searchParams.get('tags') ? JSON.parse(searchParams.get('tags')) : []
            const types = searchParams.get('types') ? JSON.parse(searchParams.get('types')) : []
            setFilterNumber(tags.length + types.length)

            //Result sorting/printing
            const sortBy = searchParams.get('sort_by')
            handleSortResults({ target: {value: sortBy}}, tempProductList) //List is sorted & printed here
            // setLocalProductList(tempProductList)
        }
    }, [id, productList, searchParams]) //searchParams.get("tags"), searchParams.get("types")

    
    //Filter Use
    const handleFilterChange = (filterType, filterName) => {
        // Get the current search parameters for the filter type
        let currentSearchParams = searchParams.get(filterType)
        console.log(currentSearchParams)
        
        if (currentSearchParams) currentSearchParams = JSON.parse(currentSearchParams) 
        else currentSearchParams = []
    
        // If filterName is already in the list, remove it. Otherwise, add it.
        const index = currentSearchParams.indexOf(filterName);
        if (index !== -1) {
            currentSearchParams.splice(index, 1)
        } else {
            currentSearchParams.push(filterName)
            currentSearchParams.sort()
        }
    
        // Update the search parameters  
        if (currentSearchParams.length > 0) {
            setCurrentPage(1) //Page reset

            setSearchParams(prevSearch => {
                prevSearch.set('page', 1)
                prevSearch.set(filterType, JSON.stringify(currentSearchParams))
                if (filterType === 'types') prevSearch.delete('tags') // Reset the tag filter whenever the type filter changes
                return prevSearch
            })
        } else {
            setSearchParams(prevSearch => {
                prevSearch.delete(filterType)
                return prevSearch
            })
        }
    }  
    
    
    //Sorting Use
    const handleSortResults = (e, listToSort) => {
        console.log("IN SORTING!")
        const sortBy = e.target.value
        const [method, order] = sortBy? sortBy.split(' ') : ["name", ""] // "name desc" becomes ["name", "desc"]
    
        let tempProductList = listToSort? [...listToSort] : [...localProductList]
        console.log(tempProductList)
    
        tempProductList.sort((a, b) => {
            let aValue, bValue
    
            // Determine the path to get the value
            if (method === "price") {
                aValue = a.props.product.variants['variant1'].price
                bValue = b.props.product.variants['variant1'].price
            } else { // Assume "name" if not "price"
                aValue = a.props.product[method]
                bValue = b.props.product[method]
            }
    
            // Convert to lowercase if the values are strings for case-insensitive sorting
            if (typeof aValue === 'string') aValue = aValue.toLowerCase()
            if (typeof bValue === 'string') bValue = bValue.toLowerCase()
    
            // Determine the order of sorting
            if (order === "desc") {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
            } else { // Assume "asc" if not "desc"
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
            }
        })        
        
        //Printing to HTML
        setLocalProductList(tempProductList) 
        
        // Prepare the new parameters
        const page = parseInt(searchParams.get('page')) //Reset page if needed

        const newParams = {
            ...Object.fromEntries(searchParams),
            sort_by: sortBy? sortBy : "name",
            page: page? page : 1
        };

        // Update the search parameters
        replaceSearchParams(newParams);
        console.log("DONE SORTING!")
    }

    //For changing the table view
    const [resultMode, setResultMode] = useState("grid-mode")
    const toggleResultMode = () => setResultMode((m) => m === "grid-mode"? "list-mode" : "grid-mode");

    //For Mobile-Filters Offcanvas/Sidebar
    const [showSidebar, setShowSidebar] = useState(false)
    const handleClose = () => setShowSidebar(false)
    const toggleShowSidebar = () => setShowSidebar((s) => !s)

    return (
        <div id="Collections-Container">

            {(id === "battletech" || id === "shadowrun") && 
            <div className="featured-product-wrapper">
                <FeaturedProductBanner collectionId={id}/>

                <CollectionBlock //NEW ARRIVALS COLLECTION
                collectionClasses={""}
                collectionLink={""} //CHANGE TO HAVE FILTER
                collectionFrameSrc={id === "battletech"? battletechNewArrivalsFrame : shadowrunNewArrivalsFrame}
                collectionCoverSrc={""}
                collectionCoverTitle={""}
                productIdArray={id === "battletech"? 
                [
                    "battletech-clan-invasion",
                    "battletech-reinforcements-clan-invasion",
                    "battletech-battlemat-alien-worlds",
                    "battletech-activity-book-vol-2",
                    "battletech-miniature-pack-game-of-armored-combat",
                ] :

                [
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                ]
            }
                characterImageSrcArray={""}
                />
            </div>
            }

            {/* For the actual search results */}
            <div className="search-results">

                <div className="search-results__header">
                    <div className="search-results__header-found">Showing {localProductList && localProductList.length} results for "{`${id !== "all"? id + " " : ""}${currentCategory}`}"</div>

                    <div className="search-results__header-buttons">
                        <div className="search-results__header-sort">
                            {/* <button className="btn">
                                DATE: NEW TO OLD
                                <i className="fa-solid fa-caret-down"></i>
                            </button> */}
                            <select 
                            name="Result-Sort-Selector" 
                            id="Search-Results__Result-Sort-Selector" 
                            onChange={handleSortResults}
                            value={searchParams.get('sort_by') || 'default'}
                            >
                                <option value="name">Title: A-Z</option>
                                <option value="name desc">Title: Z-A</option>
                                <option value="price">Price: Low to High</option>
                                <option value="price desc">Price: High to Low</option>
                            </select>
                        </div>

                        <div className="search-results__header-wrapper">

                            <div className="search-results__header-filter">
                                <button className="btn" onClick={toggleShowSidebar}>
                                    Filters
                                    {/* <i className="fa-solid fa-caret-down"></i> */}
                                    <span className={`filter-indicator ${filterNumber > 0? "" :"display-none"}`}>{filterNumber}</span>
                                </button>
                            </div>

                            <div className="search-results__header-mode">
                                <button className="btn" onClick={toggleResultMode}>
                                    {resultMode === "grid-mode"? 
                                        <i className="fa-solid fa-list fa-xl"></i> :
                                        <i className="fa-solid fa-table-cells-large fa-xl"></i>
                                    }
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="search-results__main">
                    <div className={`search-results__main-content ${resultMode}`}>
                        {pageResults && pageResults.length > 0? 
                            pageResults :
                            <div className="no-results">
                                {localProductList && localProductList.length === 0? 
                                <h1>No products to display</h1> :
                                <img src={loadingSpinner} alt="" />
                                }
                            </div>
                        }
                    </div>
                    <div className="search-results__main-sidebar">
                        {/* <ul className="universe-list"></ul> */}
                        <h1>Product Filters</h1>
                        <div className="search-results__main-sidebar__filter-wrapper">
                            {/* <span>Product Category</span> */}
                            <div className="category-links">
                                <NavLink 
                                to={{pathname:`/collections/${id}`, search: "?categories=all-products"}} 
                                className={`btn ${currentCategory === "all-products"? "active-link" : ""}`}
                                >
                                    All Products
                                </NavLink>

                                <NavLink
                                to={{pathname:`/collections/${id}`, search: "?categories=getting-started"}}
                                className={`btn ${currentCategory === "getting-started"? "active-link" : ""}`}
                                >
                                    Getting Started
                                </NavLink>

                                <NavLink
                                to={{pathname:`/collections/${id}`, search: "?categories=on-sale"}}
                                className={`btn ${currentCategory === "on-sale"? "active-link" : ""}`}
                                >
                                    On Sale
                                </NavLink>

                                <NavLink
                                to={{pathname:`/collections/${id}`, search: "?categories=free-downloads"}}
                                className={`btn ${currentCategory === "free-downloads"? "active-link" : ""}`}
                                >
                                    Free Downloads
                                </NavLink>
                            </div>
                            {typeList && typeList.length > 0 && <span>Product Type</span>}
                            {typeList && typeList.length > 0 && <ul className="type-list">{typeList}</ul>}
                            {tagList && tagList.length > 0 && <span>Product Tags</span>}
                            {tagList && tagList.length > 0 &&  <ul className="tag-list">{tagList}</ul>}
                        </div>
                    </div>
                </div>
                <div className="search-results-pagination">
                    <button className="search-results-pagination__previous-button" onClick={() => handlePageChange(-1)}>o-- Previous</button>
                    <span className="search-results-pagination__page-count">{currentPage} of {pageCount}</span>
                    <button className="search-results-pagination__next-button" onClick={() => handlePageChange(+1)}>Next --o</button>
                </div>

                {/* FOR MOBILE FILTERS */}
                <Offcanvas className="offcanvas-filters" show={showSidebar} onHide={handleClose} backdrop={true} scroll={true}> {/*scroll={true}*/}

                    <Offcanvas.Header closeButton>
                        <h1>Product Filters</h1>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <div className="search-results__mobile-sidebar">
                            {/* <ul className="universe-list"></ul> */}
                            <div className="category-links">
                                <NavLink 
                                to={{pathname:`/collections/${id}`, search: "?categories=all-products"}} 
                                className={`btn ${currentCategory === "all-products"? "active-link" : ""}`}
                                >
                                    All Products
                                </NavLink>

                                <NavLink
                                to={{pathname:`/collections/${id}`, search: "?categories=getting-started"}}
                                className={`btn ${currentCategory === "getting-started"? "active-link" : ""}`}
                                >
                                    Getting Started
                                </NavLink>

                                <NavLink
                                to={{pathname:`/collections/${id}`, search: "?categories=on-sale"}}
                                className={`btn ${currentCategory === "on-sale"? "active-link" : ""}`}
                                >
                                    On Sale
                                </NavLink>

                                <NavLink
                                to={{pathname:`/collections/${id}`, search: "?categories=free-downloads"}}
                                className={`btn ${currentCategory === "free-downloads"? "active-link" : ""}`}
                                >
                                    Free Downloads
                                </NavLink>
                            </div>
                            {typeList && typeList.length > 0 && <span>Product Type</span>}
                            {typeList && typeList.length > 0 && <ul className="type-list">{typeList}</ul>}
                            {tagList && tagList.length > 0 && <span>Product Tags</span>}
                            {tagList && tagList.length > 0 && <ul className="tag-list">{tagList}</ul>}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>            
        </div>
    )
}

/*
Collection Common ------------------------
36 products each page max
Blur background
Filters
"Showing X results for X"
Buttons for table/list layout (KEPT BETWEEN PAGES)

Universe BT/SH -----------------------
New Arrivals + Banner
Button to "Get Started"

GettingStarted ------------------------
BattleTech ------------------------
ShadowRun ------------------------
All ------------------------
*/