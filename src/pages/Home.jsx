import ProductCard from "../components/ProductCard"
import MailListSignUp from "../components/MailListSignUp"

import gettingStartedBattletech from "../assets/getting-started/getting-started-battletech.webp"
import gettingStartedShadowrun from "../assets/getting-started/getting-started-shadowrun.webp"

import fpFrame1 from "../assets/featured-products/featured-product-frame-1.svg"
import fpFrame2 from "../assets/featured-products/featured-product-frame-2.svg"
import fpFrame3 from "../assets/featured-products/featured-product-frame-3.svg"
import fpFrame4 from "../assets/featured-products/featured-product-frame-4.svg"

import featuredCharacterVictor from "../assets/featured-products/featured-character-victor.webp"
import featuredCharacterCombatMage from "../assets/featured-products/featured-character-combatMage.webp"

import saleButton from "../assets/featured-products/button-collection/collection-buttons-01.webp"
import newArrivalsButton from "../assets/featured-products/button-collection/collection-buttons-02.webp"
import freeDownloadButton from "../assets/featured-products/button-collection/collection-buttons-03.webp"
import { useSelector } from "react-redux"
import { getProductById } from "../hooks/getProductById"
import { Link } from "react-router-dom"

export default function Home() {
    const productList = useSelector(state => state.firebase.productList)
    const status = useSelector(state => state.firebase.status)

    /*
        Need code for:

        Collection link
        ClassName
        Banner Img Src/Alt
        Collection name for collection-card__title
        Product ID's

        Have some kind of determination for stand/fea/new?
    */

    return (
        <div id="Home-Container">
            
            <div className="getting-started">
                <Link to={"/collections/battletech"} className="getting-started__link">
                    <img className="getting-started__button" src={gettingStartedBattletech} alt="Get started with Battletech"/>
                </Link>
                <Link to={"/collections/shadowrun"} className="getting-started__link">
                    <img className="getting-started__button" src={gettingStartedShadowrun} alt="Get started with Shadowrun"/>
                </Link>
            </div>

            <div className="featured-products">

                <Link to={"/"}>
                    <div className="featured-product-banner"></div>
                </Link>

                <section className="section-block"> {/* MAKE THIS A COMPONENT !!! */}

                    {/* The background banner for larger views */}
                    <Link to={"/collections/all"} className={"collection-link"}>
                        <img src={fpFrame1} alt="" className="featured-product-frame" />
                    </Link>


                    <div className="grid collection">
                        <Link to={"/"} className={"collection-link"}></Link>

                        <div className="grid__item collection__cover">
                            {/* <Link to={"/"} className={"collection-link"}></Link> */}
                            <Link to={"/"} className={"collection-card"}>
                                <div className="collection-card__meta">
                                    <p className="collection-card__title h1">Featured Products</p>
                                    <p className="collection-card__subtext">View all</p>
                                </div>
                            </Link>
                        </div>

                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        
                    </div>
                </section>

                

                <MailListSignUp/>
            </div>
        </div>                        
    )
}

{/* 
                <section className="section-block left">
                    <a href="!#" className="collection-link">
                        <img src={fpFrame2} alt="" className="featured-product-frame" />
                    </a>
                    <div className="featured-character">
                        <img src={featuredCharacterVictor} alt="" />
                    </div>

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
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                        </div> 
                    </div>
                </section>

                <section className="section-block right"> 
                    <a href="!#" className="collection-link">
                        <img src={fpFrame3} alt="" className="featured-product-frame" />
                    </a>
                    <div className="featured-character">
                        <img src={featuredCharacterCombatMage} alt="" />
                    </div>                                                  

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
                            {status==="success" && <ProductCard product={getProductById(productList,"shadowrun-sixth-world-core-rulebook-city-edition-berlin")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"shadowrun-sixth-world-core-rulebook-city-edition-berlin")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"shadowrun-sixth-world-core-rulebook-city-edition-berlin")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"shadowrun-sixth-world-core-rulebook-city-edition-berlin")}/>}
                        </div>
                    </div>
                </section>

                <section className="collection-buttons-container">
                    <div className="collection-buttons-wrapper">
                        <a href="!#">
                            <img src={saleButton} alt="" className="collection-button" />
                        </a>
                        <a href="!#">
                            <img src={newArrivalsButton} alt="" className="collection-button" />
                        </a>
                        <a href="!#">
                            <img src={freeDownloadButton} alt="" className="collection-button" />
                        </a>
                    </div>
                </section>

                <section className="section-block left">
                    <a href="!#" className="collection-link">
                        <img src={fpFrame4} alt="" className="featured-product-frame" />
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
                            {status==="success" && <ProductCard product={getProductById(productList,"i-would-fight-the-dragon")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"i-would-fight-the-dragon")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"i-would-fight-the-dragon")}/>}
                        </div>
                        <div className="grid__item">
                            {status==="success" && <ProductCard product={getProductById(productList,"i-would-fight-the-dragon")}/>}
                        </div>
                    </div>
                </section> */}