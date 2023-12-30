import { useEffect, useState } from "react"

import fpFrame1 from "../assets/featured-products/featured-product-frame-1.svg"
import ProductResult from "../components/ProductResult"
import ProductCard from "../components/ProductCard"

import productList from "../data/productList"
import { useParams } from "react-router-dom"

export default function Collections() {

    //For content determination
    const {id} = useParams()
    const [localProductList, setLocalProductList] = useState()

    useEffect(() => {
        let tempProductList = new Array

        switch (id) {
            case "battletech":

                for (let i=0; i<Object.keys(productList.battletech).length; i++) {                    
                    let p = productList.battletech[i]

                    tempProductList.push(//Adding all products from BT and making them components
                        <ProductResult
                            key={i}
                            productUniverse={p.universe}
                            productLink={p.id} 
                            productName={p.name}  
                            productPrice={p.variants.choices[0].price} //Add code to include "From" if more than one option
                            imageLink={p.variants.choices[0].images[0].link}
                            imageAlt={p.variants.choices[0].images[0].alt}
                        />                        
                    ) 
                }
                setLocalProductList(tempProductList) //Outputting the new product list
    
                break
                
            case "shadowrun":
                break
    
            default:
                alert("Something went wrong!")
                break
            }
    },[id])

    //For changing the table view
    const [resultMode, setResultMode] = useState("grid-mode")
    const toggleResultMode = () => setResultMode((m) => m === "grid-mode"? "list-mode" : "grid-mode");



    return (
        <div id="Collections-Container">

            {/* For the Top Banner section */}
            <div className="featured-products">
                <a href="!#">
                    <div className="featured-product-banner"></div>
                </a>      

                <section className="section-block">
                    <a href="!#" className="collection-link">
                        <img src={fpFrame1} alt="" className="featured-product-frame" />
                    </a>

                    <div className="grid collection">
                        <a href="!#" className="collection-link"></a>

                        <div className="grid__item collection__cover">
                            <a href="!#" className="collection-link"></a>
                            <a href="!#" className="collection-card">                                                        
                                <div className="collection-card__meta">
                                    <p className="collection-card__title h1">Featured Products</p>
                                    <p className="collection-card__subtext">View all</p>
                                </div>
                            </a>
                        </div>

                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                    </div>
                </section>
            </div>

            {/* For the actual search results */}
            <div className="search-results">
                <div className="search-results-header">
                    <div className="search-results-header-found">Showing X results for "X"</div>

                    <div className="search-results-header-buttons">
                        <div className="search-results-header-sort">
                            <button className="btn">
                                DATE: NEW TO OLD
                                <i className="fa-solid fa-caret-down"></i>
                            </button>
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
                    {/* 
                    <ProductResult/>
                    <ProductResult/>
                    <ProductResult/>
                    <ProductResult/>
                    <ProductResult/>
                    <ProductResult/>
                    <ProductResult/>
                    <ProductResult/> 
                    */}
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

All ------------------------

Universe BT/SH -----------------------
New Arrivals + Banner
Button to "Get Started"

GettingStarted ------------------------


BattleTech ------------------------

ShadowRun ------------------------

PLANS -----------------------------

Fetch calls for products (All local)
Notifications for successful/faliure

Maybe make a page for base collection categories?
Each product has Categories in desc, use that to generate filter buttons

Figure out how to add filters to url
*/