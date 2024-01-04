import ProductCard from "../components/ProductCard"
import MailListSignUp from "../components/MailListSignUp"

import gettingStartedBattletech from "/src/assets/getting-started/getting-started-battletech.webp"
import gettingStartedShadowrun from "/src/assets/getting-started/getting-started-shadowrun.webp"

//Collection frames/covers
import featuredFrame from "/src/assets/block-collection/frames/collection-frame-featured.svg"
import featuredCover from "/src/assets/block-collection/covers/cicada-picture.webp"
import battletechFrame from "/src/assets/block-collection/frames/collection-frame-battletech.svg"
import battletechCover from "/src/assets/block-collection/covers/cicada-picture.webp"
import shadowrunFrame from "/src/assets/block-collection/frames/collection-frame-shadowrun.svg"
import shadowrunCover from "/src/assets/block-collection/covers/cicada-picture.webp"
import tabletopFrame from "/src/assets/block-collection/frames/collection-frame-tabletop.svg"
import tabletopCover from "/src/assets/block-collection/covers/cicada-picture.webp"

//Collection Characters
import characterCombatMage from "/src/assets/block-collection/characters/character-combatMage.webp"
import characterVictor from "/src/assets/block-collection/characters/character-victor.webp"

import saleButton from "../assets/button-collection/collection-buttons-01.webp"
import newArrivalsButton from "../assets/button-collection/collection-buttons-02.webp"
import freeDownloadButton from "../assets/button-collection/collection-buttons-03.webp"
import { useSelector } from "react-redux"
import { getProductById } from "../hooks/getProductById"
import { Link } from "react-router-dom"
import CollectionBlock from "../components/CollectionBlock"

export default function Home() {
    const productList = useSelector(state => state.firebase.productList)
    const status = useSelector(state => state.firebase.status)

    
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

                <CollectionBlock //FEATURED COLLECTION
                collectionClasses={""}
                collectionLink={"/collections/all"} //CHANGE TO HAVE FEATURED FILTER
                collectionFrameSrc={featuredFrame}
                collectionCoverSrc={featuredCover}
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

                <CollectionBlock //BATTLETECH COLLECTION
                collectionClasses={"left"}
                collectionLink={"/collections/battletech"}
                collectionFrameSrc={battletechFrame}
                collectionCoverSrc={battletechCover}
                collectionCoverTitle={"Battletech"}
                productIdArray={[
                    "battletech-clan-invasion",
                    "battletech-reinforcements-clan-invasion",
                    "battletech-battlemat-alien-worlds",
                    "battletech-miniature-pack-game-of-armored-combat",
                ]}
                characterImageSrcArray={[
                    characterVictor,
                ]}
                />
                <CollectionBlock //SHADOWRUN COLLECTION
                collectionClasses={"right"}
                collectionLink={"/collections/shadowrun"}
                collectionFrameSrc={shadowrunFrame}
                collectionCoverSrc={shadowrunCover}
                collectionCoverTitle={"Shadowrun"}
                productIdArray={[
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                    "shadowrun-sixth-world-core-rulebook-city-edition-berlin",
                ]}
                characterImageSrcArray={[
                    characterCombatMage,
                ]}
                />

                <section className="collection-buttons-container">
                    <div className="collection-buttons-wrapper">
                        <Link to={"/"}>                            
                            <img src={saleButton} alt="" className="collection-button" />
                        </Link>
                        <Link to={"/"}>                            
                            <img src={newArrivalsButton} alt="" className="collection-button" />
                        </Link>
                        <Link to={"/"}>                            
                            <img src={freeDownloadButton} alt="" className="collection-button" />
                        </Link>
                    </div>
                </section>

                <CollectionBlock //TABLETOP COLLECTION
                collectionClasses={"left"}
                collectionLink={"/collections/tabletop"}
                collectionFrameSrc={tabletopFrame}
                collectionCoverSrc={tabletopCover}
                collectionCoverTitle={"Tabletop"}
                productIdArray={[
                    "i-would-fight-the-dragon",
                    "i-would-fight-the-dragon",
                    "i-would-fight-the-dragon",
                    "i-would-fight-the-dragon",
                ]}
                characterImageSrcArray={""}
                />                

                <MailListSignUp/>
            </div>
        </div>                        
    )
}

{/* 

                <section className="section-block">
                    <Link to={"/collections/all"} className={"collection-link"}>
                        <img src={fpFrame1} alt="" className="featured-product-frame" />
                    </Link>

                    <div className="grid collection">
                        <Link to={"/"} className={"collection-link"}></Link>

                        <div className="grid__item collection__cover">
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