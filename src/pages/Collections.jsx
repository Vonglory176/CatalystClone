import { useEffect, useState } from "react"

// import fpFrame1 from "../assets/featured-products/featured-product-frame-1.svg"
import newArrivalsFrame from "/src/assets/block-collection/frames/collection-frame-new-arrivals.svg"
import ProductResult from "../components/ProductResult"
import ProductCard from "../components/ProductCard"

import { useParams, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import CollectionBlock from "../components/CollectionBlock"

export default function Collections() {

    //For content determination
    const {id} = useParams()
    const [searchParams, setSearchParams] = useSearchParams({
        // universe: id,
        types: [],
        tags:[],
    })


    const productList = useSelector(state => state.products.productList)
    const status = useSelector(state => state.products.status)
    const [localProductList, setLocalProductList] = useState()
    const [typeList, setTypeList] = useState()
    const [tagList, setTagList] = useState()

    //Print for specific Universe
    //Print for All / Featured / New / Free / Sale

    /*
        Use id as Universe (If "all" no filter)
        searchParams then whittle down the types/tags
        Type calculated first
        Tags are printed with a scanning of relevant product/type

        ProductList is loaded
        Items are iterated
    */

    useEffect(() => {
        let tempProductList = []
        let tempUniverseList = []
        let tempTypeList = []
        let tempTagList = []

        if (productList) {
            // console.log(Object.keys(productList))
            // const productUniverses = Object.keys(productList)

            //SINGULAR CATEGORY
            if (Object.keys(productList).includes(id)) { //If product.category ("battletech") is in page path

                Object.values(productList[id]).forEach(p => { //For each Product in that Category

                    let tempTypeSearchParams = searchParams.get('types')
                    ? JSON.parse(searchParams.get('types'))
                    : []
                    let tempTagSearchParams = searchParams.get('tags')
                    ? JSON.parse(searchParams.get('tags'))
                    : []

                    // If there is no type filter OR type filter is matched by current product
                    if (tempTypeSearchParams.length === 0 || tempTypeSearchParams.includes(p.type)) {

                        if (tempTagSearchParams.length === 0 || (p.tags && tempTagSearchParams.some(tag => p.tags.includes(tag)))) {
                            tempProductList.push(<ProductResult key={p.id} product={p}/>) //Create a ProductResult
                        }

                        //Within each product of the accepted Type, grab all tags
                        for (let tag in p.tags) {
                            tempTagList.push(
                                <li>
                                    <label htmlFor={`${p.tags[tag]}-checkbox`}>{p.tags[tag]}</label>
                                    <input 
                                    type="checkbox"  
                                    onChange={() => handleFilterChange('tags', p.tags[tag])} 
                                    name={`${p.tags[tag]}-checkbox`} 
                                    value={p.tags[tag]}
                                    checked={tempTagSearchParams.includes(p.tags[tag])? true : false}
                                    >
                                    </input>
                                </li>
                            )
                        }
                    }

                    // tempUniverseList.push(
                    //     <li>
                    //         <label htmlFor={`${p.universe}-checkbox`}>{p.universe}</label>
                    //         <input type="checkbox"  onChange={() => handleUniverseFilter(p.universe)} name={`${p.universe}-checkbox`} value={p.type}></input>
                    //     </li>
                    // )
                    tempTypeList.push(
                        <li>
                            <label htmlFor={`${p.type}-checkbox`}>{p.type}</label>
                            <input 
                            type="checkbox"  
                            onChange={() => handleFilterChange('types', p.type)} 
                            name={`${p.type}-checkbox`} 
                            value={p.type}
                            checked={tempTypeSearchParams.includes(p.type)? true : false}
                            >                                
                            </input>
                        </li>
                    )
                })

            }//ALL CATEGORIES           
            else if (id === "all") { 
                Object.keys(productList).forEach(category => { //For each Product Category

                    Object.values(productList[category]).forEach(p => { //For each Product in that Category

                        tempProductList.push(<ProductResult key={p.id} product={p}/>) //Create a ProductResult
                    })
                })
            }
            else alert("Something went wrong!") //SOMETHING BLEW UP

            setLocalProductList(tempProductList) //Outputting the new product list (Okay if empty)
            setTypeList(tempTypeList)
            setTagList(tempTagList)
        }
    },[id, productList, searchParams])

    //Filter Use
    const handleFilterChange = (filterType, filterName) => {
        // Get the current search parameters for the filter type
        let currentSearchParams = searchParams.get(filterType)
            ? JSON.parse(searchParams.get(filterType))
            : []
    
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
            setSearchParams(prevSearch => {
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

    // useEffect(() => {
    //     // Reset the tag filter whenever the type filter changes
    //     setSearchParams(prevSearch => {
    //         prevSearch.delete('tags')
    //         return prevSearch
    //     })
    // }, [typeList, useSearchParams])


    //Sorting Use
    const handleSortResults = (e) => {
        const sortBy = e.target.value
        console.log(sortBy)

        let tempProductList = [...localProductList]

        switch(sortBy) {
            case "Title: A-Z":
                tempProductList.sort((a, b) => {
                    if(a.props.product.name < b.props.product.name) return -1
                    if(a.props.product.name > b.props.product.name) return 1
                    return 0
                })
                break
            case "Title: Z-A":
                    tempProductList.sort((a, b) => {
                        if(a.props.product.name > b.props.product.name) return -1
                        if(a.props.product.name < b.props.product.name) return 1
                        return 0
                    })
                break
        }
        console.log(tempProductList)
        setLocalProductList(tempProductList)
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

                <div className="filter-test">
                    {/* <ul className="universe-list">{universeList}</ul> */}
                    <ul className="type-list">{typeList}</ul>
                    <ul className="tag-list">{tagList}</ul>
                </div>

                <div className="search-results-header">
                    <div className="search-results-header-found">Showing X results for "X"</div>

                    <div className="search-results-header-buttons">
                        <div className="search-results-header-sort">
                            {/* <button className="btn">
                                DATE: NEW TO OLD
                                <i className="fa-solid fa-caret-down"></i>
                            </button> */}
                            <select name="Result-Sort-Selector" id="Search-Results__Result-Sort-Selector" onChange={handleSortResults}>
                                <option value="Title: A-Z">Title: A-Z</option>
                                <option value="Title: Z-A">Title: Z-A</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: High to Low</option>
                            </select>
                        </div>

                        <div className="search-results-header-wrapper">

                            <div className="search-results-header-filter">
                                <button className="btn">
                                    Filters
                                    <i className="fa-solid fa-caret-down"></i>
                                </button>
                            </div>

                            <div className="search-results-header-mode">
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
                <div className="search-results-sidebar"></div>
                <div className={`search-results-main ${resultMode}`}>
                    {localProductList}
                </div>
                <div className="search-results-pagination">
                    <button className="search-results-pagination__previous-button">o-- Previous</button>
                    <span className="search-results-pagination__page-count">1 of 20</span>
                    <button className="search-results-pagination__next-button">Next --o</button>
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