import { useCallback, useEffect, useRef, useState } from "react"

// import fpFrame1 from "../assets/featured-products/featured-product-frame-1.svg"
import battletechNewArrivalsFrame from "/src/assets/block-collection/frames/collection-frame-battletech-new-arrivals.svg"
import shadowrunNewArrivalsFrame from "/src/assets/block-collection/frames/collection-frame-shadowrun-new-arrivals.svg"
import ProductResult from "../components/ProductResult"

import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import CollectionBlock from "../components/CollectionBlock"
import { Offcanvas } from "react-bootstrap"
import FeaturedProductBanner from "../components/FeaturedProductBanner"
import loadingSpinner from "../assets/loader-large.gif"
import Pagination from "../components/Pagination"
import ProductFilters from "../components/ProductFilters"
import Fuse from 'fuse.js'

// import { getSortedProducts } from "../hooks/getSortedProducts"

export default function Collections() {

    //For content determination
    const {id} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    //Redux Product-List from Firebase
    const productList = useSelector(state => state.products.productList)
    
    //Filters & Filtered Product-List
    const [localProductList, setLocalProductList] = useState()
    const [currentCategory, setCurrentCategory] = useState("all-products")
    const [filterInstanceList, setFilterInstanceList] = useState()

    //For overwriting the w/filter history as opposed to adding to it
    const navigate = useNavigate()
    const location = useLocation()
    
    const replaceSearchParams = (newParams) => {
        // console.log(Array.from(searchParams.entries()));
        const newSearch = new URLSearchParams({
            ...Object.fromEntries(searchParams),
            ...newParams,
        }).toString();
    
        // Use navigate to replace the current entry in the history stack
        navigate(`${location.pathname}?${newSearch}`, { replace: true });
    };
    
    //Pagination
    const [pageResults, setPageResults] = useState() //Set by the Pagination component callback
    const resultsPerPage = 6

    //Counting filters
    const [filterNumber, setFilterNumber] = useState(0)
    const [fuse, setFuse] = useState(null)
    
    useEffect(() => {
        if (productList) { //If there's a url search-query

            const searchQueryOptions = {
                keys: ['name','universe','description'],
                includeScore: true,
                threshold: 0.3
            }

            let tempProductList = []        
            Object.keys(productList).forEach(universe => { //For each Product Universe
                Object.values(productList[universe]).forEach(product => tempProductList.push(product))//For each Product in that Universe
            })

            setFuse(new Fuse(tempProductList, searchQueryOptions))
        }
    }, [productList])

    //PAGE INITIALIZATION
    useEffect(() => {
        if (productList) {

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
                    (categorySearchParams === "free-downloads" && p.isFree) ||
                    (categorySearchParams === "new-arrivals" && p.isNewArrival)
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

            //Getting and printing page-contents
            const searchQuery = searchParams.get('q')

            //Loading products via query
            if (searchQuery && fuse) { 
                const searchResults = searchQuery? fuse.search(searchQuery) : ''
                // console.log(searchResults)
                searchResults.forEach(i => processProduct(i.item))
            }
            //Loading products normally
            else { 
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
            }

            //Filter setup
            setFilterInstanceList({
                types: typeInstanceList, 
                tags: tagInstanceList
            })
            //Filter count for mobile indicator
            setFilterNumber(typeSearchParams.length + tagSearchParams.length)

            //Result sorting/printing
            const sortBy = searchParams.get('sort_by')
            handleSortResults({target: {value: sortBy}}, tempProductList) //List is sorted & printed here
            // setLocalProductList(tempProductList)
        }
    }, [id, productList, searchParams]) //searchParams.get("tags"), searchParams.get("types")

    //Sorting Use
    const handleSortResults = useCallback((e, listToSort) => {
        console.log("IN SORTING!")
        const sortBy = e.target.value? e.target.value : (searchParams.get("q") ? searchParams.get("q") : "name")
        const [method, order] = sortBy.split(' ') //sortBy? sortBy.split(' ') : ["name", ""] // "name desc" becomes ["name", "desc"]
    
        let tempProductList = listToSort? [...listToSort] : [...localProductList]
        // console.log(tempProductList)

        if (method !== "relevance") {
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
        }
        
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
    })

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
                
                productInformation={{
                    universe: id === "battletech"? "battletech" : "shadowrun",
                    category: "new-arrivals"
                }}
                // productIdArray={id === "battletech"? 
                // [
                //     "battletech-clan-invasion",
                //     "battletech-reinforcements-clan-invasion",
                //     "battletech-battlemat-alien-worlds",
                //     "battletech-activity-book-vol-2",
                //     "battletech-miniature-pack-game-of-armored-combat",
                // ] :

                // [
                //     "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                //     "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                //     "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                //     "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                //     "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                // ]
                // }
                characterImageSrcArray={""}
                />
            </div>
            }

            {/* For the actual search results */}
            <div className="search-results">

                <div className="search-results__header">
                    <div className="search-results__header-found">Showing {localProductList && localProductList.length} results {`${id !== "all"? `for ${id} ` : (searchParams.get('q')?  `for "${searchParams.get('q')}" ` : "")}in ${currentCategory}`}</div>

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
                                {searchParams.get('q') && <option value="relevance">Relevance</option>}
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
                        <h1>Product Filters <span className={`filter-indicator ${filterNumber > 0? "" :"display-none"}`} style={{right: "-13px", top: "-3px"}}>{filterNumber}</span></h1>
                        <ProductFilters 
                        currentCategory={currentCategory} 
                        filterInstanceList={filterInstanceList}
                        // className={"filter-list-sidebar"}
                        />
                    </div>
                </div>

                <Pagination resultsPerPage={resultsPerPage} localProductList={localProductList} onChange={".search-results"} paginationCallback={setPageResults}/>

                {/* FOR MOBILE FILTERS */}
                <Offcanvas className="offcanvas-filters" show={showSidebar} onHide={handleClose} backdrop={true} scroll={true}> {/*scroll={true}*/}

                    <Offcanvas.Header closeButton>
                        <h1>Product Filters</h1>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <div className="search-results__mobile-sidebar">
                            <ProductFilters 
                            currentCategory={currentCategory} 
                            filterInstanceList={filterInstanceList}
                            // className={"filter-list-mobile"}
                            />
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