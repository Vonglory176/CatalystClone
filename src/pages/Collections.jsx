import { useEffect, useRef, useState } from "react"

// import fpFrame1 from "../assets/featured-products/featured-product-frame-1.svg"
import newArrivalsFrame from "/src/assets/block-collection/frames/collection-frame-new-arrivals.svg"
import ProductResult from "../components/ProductResult"

import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import CollectionBlock from "../components/CollectionBlock"

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
        
        //Product Setup
        const processProduct = (p) => {
            const typeSearchParams = searchParams.get('types')
                ? JSON.parse(searchParams.get('types'))
                : []
            const tagSearchParams = searchParams.get('tags')
                ? JSON.parse(searchParams.get('tags'))
                : []
        
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
    
        //Filter setup
        const createFilterList = (instanceList, filterType) => {
            return Object.entries(instanceList).map(([name, count]) => (
                <li className="search-results__filter-li" key={name}>
                    <input 
                        type="checkbox"  
                        onChange={() => handleFilterChange(filterType, name)} 
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
            //ALL CATEGORIES
            if (id === "all") {
                Object.keys(productList).forEach(category => { //For each Product Category
                    Object.values(productList[category]).forEach(processProduct)//For each Product in that Category
                })
            }
            //SINGLE CATEGORY
            else if (Object.keys(productList).includes(id)) {
                Object.values(productList[id]).forEach(processProduct) //For each Product in the ID Category
            }
            //SOMETHING BLEW UP
            else console.log("There was an error loading categories from productList!")

            //Updating page count
            const totalPages = Math.ceil(tempProductList.length / resultsPerPage)
            setPageCount(totalPages)

            const page = searchParams.get('page')
            setCurrentPage(page)

            
            const sortBy = searchParams.get('sort_by')
            handleSortResults({ target: {value: sortBy}}, tempProductList) //List is sorted & printed here
            // setLocalProductList(tempProductList)

            setTypeList(createFilterList(typeInstanceList, 'types'))
            setTagList(createFilterList(tagInstanceList, 'tags'))
        }
    }, [id, productList, searchParams.get("tags"), searchParams.get("types")]) //searchParams.get("tags"), searchParams.get("types")

    
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
        const [method, order] = sortBy.split(' ') // "name desc" becomes ["name", "desc"]
    
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
        const newParams = {
            ...Object.fromEntries(searchParams),
            sort_by: sortBy,
        };

        // Update the search parameters
        replaceSearchParams(newParams);

        // setSearchParams(prevSearch => {
        //     prevSearch.set('sort_by', sortBy)        
        //     return prevSearch;
        // });
        console.log("DONE SORTING!")
    }

    //For changing the table view
    const [resultMode, setResultMode] = useState("grid-mode")
    const toggleResultMode = () => setResultMode((m) => m === "grid-mode"? "list-mode" : "grid-mode");

    return (
        <div id="Collections-Container">

            <CollectionBlock //NEW ARRIVALS COLLECTION
            collectionClasses={""}
            collectionLink={"/collections/all"} //CHANGE TO HAVE FILTER
            collectionFrameSrc={newArrivalsFrame}
            collectionCoverSrc={""}
            collectionCoverTitle={"Featured Products"}
            productIdArray={[
                "battletech-clan-invasion",
                "battletech-reinforcements-clan-invasion",
                "battletech-battlemat-alien-worlds",
                "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                "i-would-fight-the-dragon",
            ]}
            characterImageSrcArray={""}
            />

            {/* For the actual search results */}
            <div className="search-results">

                <div className="search-results__header">
                    <div className="search-results__header-found">Showing {localProductList && localProductList.length} results for "X"</div>

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
                                <button className="btn">
                                    Filters
                                    <i className="fa-solid fa-caret-down"></i>
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
                        {pageResults}
                    </div>
                    <div className="search-results__main-sidebar">
                        {/* <ul className="universe-list"></ul> */}
                        <span>Product Type</span>
                        <ul className="type-list">{typeList}</ul>
                        <span>Product Tags</span>
                        <ul className="tag-list">{tagList}</ul>
                    </div>
                </div>
                <div className="search-results-pagination">
                    <button className="search-results-pagination__previous-button" onClick={() => handlePageChange(-1)}>o-- Previous</button>
                    <span className="search-results-pagination__page-count">{currentPage} of {pageCount}</span>
                    <button className="search-results-pagination__next-button" onClick={() => handlePageChange(+1)}>Next --o</button>
                </div>
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

PLANS -----------------------------

Fetch calls for products (All local)
Notifications for successful/faliure

Maybe make a page for base collection categories?
Each product has Categories in desc, use that to generate filter buttons

Figure out how to add filters to url

// useEffect(() => {
//     // Reset the tag filter whenever the type filter changes
//     setSearchParams(prevSearch => {
//         prevSearch.delete('tags')
//         return prevSearch
//     })
// }, [typeList, useSearchParams])

// const hasSorted = useRef(false)
// useEffect(() => {
//     if (localProductList && !hasSorted.current) {
//         const sortBy = searchParams.get('sort_by')
//         if (sortBy) {
//             handleSortResults({ target: {value: sortBy}})
//             hasSorted.current = true
//         }
//     }
// }, [localProductList])

*/

// const handleFilterChange = (filterType, filterName) => {
//     // Handle filter-types
//     let typeSearchParams = searchParams.get('types')
//         ? JSON.parse(searchParams.get('types'))
//         : [];
//     let tagSearchParams = searchParams.get('tags')
//         ? JSON.parse(searchParams.get('tags'))
//         : [];

//     // Updating the changed filter
//     const updateFilter = () => {
//         let tempSearchParams = searchParams.get(filterType)
//         ? JSON.parse(searchParams.get(filterType))
//         : [];

//         //If already in, REMOVE
//         if (tempSearchParams.includes(filterName)) {
//             let index = tempSearchParams.indexOf(filterName);
//             tempSearchParams.splice(index,1);
//         }
//         //Else ADD
//         else {
//             tempSearchParams.push(filterName);
//             tempSearchParams.sort();
//         }
//         return tempSearchParams
//     }

//     switch(filterType) {
//         case 'types':
//             typeSearchParams = updateFilter()
//             break

//         case 'tags': 
//             tagSearchParams = updateFilter()
//             break
//     }

//     // Removing fat and pushing new searchParams
//     setSearchParams(prevSearch => {
//         const newSearchParams = {...prevSearch};
//         if (tagSearchParams.length > 0) {
//             newSearchParams.tags = JSON.stringify(tagSearchParams);
//         } else {
//             delete newSearchParams.tags;
//         }
//         if (typeSearchParams.length > 0) {
//             newSearchParams.types = JSON.stringify(typeSearchParams);
//         } else {
//             delete newSearchParams.types;
//         }
//         return newSearchParams;
//     });
// }

// useEffect(() => {
//     let tempProductList = []
//     let typeInstanceList = {}
//     let tagInstanceList = {}
    
//     let tempUniverseList = []
//     let typeSearchParams
//     let tagSearchParams

//     if (productList) {
//         // console.log(Object.keys(productList))
//         // const productUniverses = Object.keys(productList)

//         //SINGULAR CATEGORY
//         if (Object.keys(productList).includes(id)) { //If product.category ("battletech") is in page path

//             Object.values(productList[id]).forEach(p => { //For each Product in that Category

//                 typeSearchParams = searchParams.get('types')
//                 ? JSON.parse(searchParams.get('types'))
//                 : []
//                 tagSearchParams = searchParams.get('tags')
//                 ? JSON.parse(searchParams.get('tags'))
//                 : []

//                 // If there is no type filter OR type filter is matched by current product
//                 if (typeSearchParams.length === 0 || typeSearchParams.includes(p.type)) {

//                     if (tagSearchParams.length === 0 || (p.tags && tagSearchParams.some(tag => p.tags.includes(tag)))) {
//                         tempProductList.push(<ProductResult key={p.id} product={p}/>) //Create a ProductResult
//                     }

//                     //Within each product of the accepted Type, grab all tags
//                     for (let tag in p.tags) {
//                         const tagName = p.tags[tag]
//                         if (tagInstanceList[tagName]) tagInstanceList[tagName] += 1
//                         else tagInstanceList[tagName] = 1
//                     }
//                 }
//                 const typeName = p.type
//                 if (typeInstanceList[typeName]) typeInstanceList[typeName] += 1
//                 else typeInstanceList[typeName] = 1
//             })

//         }//ALL CATEGORIES           
//         // else if (id === "all") { 
//         //     Object.keys(productList).forEach(category => { //For each Product Category

//         //         Object.values(productList[category]).forEach(p => { //For each Product in that Category

//         //             tempProductList.push(<ProductResult key={p.id} product={p}/>) //Create a ProductResult
//         //         })
//         //     })
//         // }
//         else alert("Something went wrong!") //SOMETHING BLEW UP

//         let tempTypeList = []
//         let tempTagList = []

//         for (let typeName in typeInstanceList) {
//             tempTypeList.push(
//                 <li className="search-results__filter-li">
//                     <input 
//                     type="checkbox"  
//                     onChange={() => handleFilterChange('types', typeName)} 
//                     name={`${typeName}-checkbox`} 
//                     value={typeName}
//                     checked={typeSearchParams.includes(typeName)? true : false}
//                     >
//                     </input>
//                     <label htmlFor={`${typeName}-checkbox`}>{`${typeName} (${typeInstanceList[typeName]})`}</label>
//                 </li>
//             )
//         }
//         for (let tagName in tagInstanceList) {
//             tempTagList.push(
//                 <li className="search-results__filter-li">
//                     <input 
//                     type="checkbox"  
//                     onChange={() => handleFilterChange('tags', tagName)} 
//                     name={`${tagName}-checkbox`} 
//                     value={tagName}
//                     checked={tagSearchParams.includes(tagName)? true : false}
//                     >
//                     </input>
//                     <label htmlFor={`${tagName}-checkbox`}>{`${tagName} (${tagInstanceList[tagName]})`}</label>
//                 </li>
//             )
//         }

//         setLocalProductList(tempProductList) //Outputting the new product list (Okay if empty)
//         setTypeList(tempTypeList)
//         setTagList(tempTagList)
//     }
// },[id, productList, searchParams])