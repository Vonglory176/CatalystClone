import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Fuse from 'fuse.js'
import { Link } from "react-router-dom"
import ProductSearchbarResult from "./ProductSearchbarResult"

export default function Searchbar() {
    const productList = useSelector(state => state.products.productList)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState('')
    const [searchResultsHtml, setSearchResultsHtml] = useState('')
    const [fuse, setFuse] = useState(null)

    //Area of search (All products have been combined into a single array as seen below)
    const options = {
        keys: [
            'name',
            'universe',
            'description'
        ],
        includeScore: true,
        threshold: 0.3
      }
    
    //Initializing the Fuse
    useEffect(() => {
        if (productList) {
            let tempProductList = []        
            Object.keys(productList).forEach(category => { //For each Product Category
                Object.values(productList[category]).forEach(product => tempProductList.push(product))//For each Product in that Category
            })

            setFuse(new Fuse(tempProductList, options))
        }
    }, [productList])

    //Updating current search-results (BEFORE SUBMIT)
    const handleSearchInputChange = (event) => {

        const query = event.target.value //Getting/Setting Query
        setSearchTerm(query)

        const results = fuse.search(query) //Getting/Setting Results
        setSearchResults(results)

        // console.log(query)
        // console.log(fuse)
        console.log(results)
    }

    //Printing search-result HTML
    useEffect(() => {
        let tempSearchResultsHtml = []
        // let tempSearchResultContainerHtml

        if (searchResults) {
            //Get first three results/items
            for (let i = 0; i < 3 && i < searchResults.length; i++) {
                const product = searchResults[i].item
                tempSearchResultsHtml.push(ProductSearchbarResult(product))
            }
                //Adding the "Products" header if products were found
                if (tempSearchResultsHtml.length > 0) tempSearchResultsHtml.unshift(
                <div className="searchbar-results-header">Products</div>
                )
            
            // searchResults
            //Print length/link to the rest

            // tempSearchResultContainerHtml = (
                // <div className="searchbar-results-container">
                //     {tempSearchResultsHtml}
                // </div>
            // )

        }

        setSearchResultsHtml(tempSearchResultsHtml)
    }, [searchResults])
    
    //Sending results/routing to Search Page (AFTER SUBMIT)
    const handleSearch = (event) => {
        event.preventDefault()
        onSearch(searchTerm)
        console.log(results)
    }

    return (
        <form onSubmit={handleSearch} className="searchbar">
            <div className="searchbar-input-container">
                <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearchInputChange(e)}
                />
                <i className="fa-solid fa-magnifying-glass store-btns__search fa-lg"></i>
            </div>

            <div className="searchbar-results-container">
                <div className="searchbar-results-arrow" style={{opacity: searchTerm? 1 : 0}}/>
                {searchResultsHtml}
            </div>
            {/* <button type="submit">Search</button> */}
        </form>
    )
}