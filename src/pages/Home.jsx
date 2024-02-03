import { Link } from "react-router-dom"
//Components
import CollectionBlock from "../components/CollectionBlock"
import MailListSignUp from "../components/MailListSignUp"
//Getting Started Buttons
import gettingStartedBattletech from "/src/assets/getting-started/getting-started-battletech.webp"
import gettingStartedBattletechLowRes from "/src/assets/getting-started/getting-started-battletech-low-res.webp"
import gettingStartedShadowrun from "/src/assets/getting-started/getting-started-shadowrun.webp"
import gettingStartedShadowrunLowRes from "/src/assets/getting-started/getting-started-shadowrun-low-res.webp"
//Collection frames/covers
import featuredFrame from "/src/assets/block-collection/frames/collection-frame-featured.svg"
import featuredCover from "/src/assets/block-collection/covers/cicada-picture.webp"
import battletechFrame from "/src/assets/block-collection/frames/collection-frame-battletech.svg"
import battletechCover from "/src/assets/block-collection/covers/marauder_480x480.webp"
import shadowrunFrame from "/src/assets/block-collection/frames/collection-frame-shadowrun.svg"
import shadowrunCover from "/src/assets/block-collection/covers/shadowrun_480x480.webp"
import tabletopFrame from "/src/assets/block-collection/frames/collection-frame-tabletop.webp"
import tabletopFramePlaceholder from "/src/assets/block-collection/frames/collection-frame-tabletop-low-res.webp"
import tabletopCover from "/src/assets/block-collection/covers/IWFTD_480x480.webp"
//Collection Characters
import characterVictor from "/src/assets/block-collection/characters/character-victor.webp"
import characterTimberWolf from "/src/assets/block-collection/characters/character-timberWolf.webp"
import characterCombatMage from "/src/assets/block-collection/characters/character-combatMage.webp"
import characterStreetSamurai from "/src/assets/block-collection/characters/character-streetSamurai.webp"
//Collection Buttons
import saleButton from "../assets/button-collection/collection-buttons-01.webp"
import saleButtonLowRes from "../assets/button-collection/collection-buttons-01-low-res.webp"
import newArrivalsButton from "../assets/button-collection/collection-buttons-02.webp"
import newArrivalsButtonLowRes from "../assets/button-collection/collection-buttons-02-low-res.webp"
import freeDownloadButton from "../assets/button-collection/collection-buttons-03.webp"
import freeDownloadButtonLowRes from "../assets/button-collection/collection-buttons-03-low-res.webp"
import ProgressiveImage from "react-progressive-image"
import { Suspense } from "react"
import FeaturedProductBanner from "../components/FeaturedProductBanner"


export default function Home() {
    
    const battletechCharacterArray = [
        characterVictor,
        characterTimberWolf
    ]
    const shadowrunCharacterArray = [
        characterCombatMage,
        characterStreetSamurai
    ]

    const pickRandomCharacter = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    return (
        <div id="Home-Container">
            
            <div className="getting-started">
                <Link to={"/collections/battletech?categories=getting-started"} className="getting-started__link">
                    {/* <img className="getting-started__button" src={gettingStartedBattletech} alt="Get started with Battletech"/> */}
                    <ProgressiveImage
                    src={gettingStartedBattletech}
                    placeholder={gettingStartedBattletechLowRes}
                    >
                        {(src, loading) =>
                            <img
                            className={
                                "getting-started__button " +
                                (loading? "imgLoading":"imgLoaded")
                            }
                            src={src}
                            alt={"Get started with Battletech"}
                            /> 
                        }
                    </ProgressiveImage>
                </Link>
                <Link to={"/collections/shadowrun?categories=getting-started"} className="getting-started__link">
                    {/* <img className="getting-started__button" src={gettingStartedShadowrun} alt="Get started with Shadowrun"/> */}
                    <ProgressiveImage 
                    src={gettingStartedShadowrun}
                    placeholder={gettingStartedShadowrunLowRes}
                    >
                        {(src, loading) =>
                            <img
                            className={
                                "getting-started__button " +
                                (loading? "imgLoading":"imgLoaded")
                            }
                            src={src}
                            alt={"Get started with Shadowrun"}
                            /> 
                        }
                    </ProgressiveImage>
                </Link>
            </div>

            <div className="featured-products">
                
                <div className="featured-product-wrapper">
                    {/* <Link to={"/"}></Link> */}
                    <FeaturedProductBanner collectionId={"battletech"}/>

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
                </div>

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
                characterImageSrc={pickRandomCharacter(battletechCharacterArray)}
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
                characterImageSrc={pickRandomCharacter(shadowrunCharacterArray)}
                />

                <section className="collection-buttons-container">
                    <div className="collection-buttons-wrapper">
                        <Link to={"/collections/all?categories=on-sale"}>                            
                            <ProgressiveImage src={saleButton}>
                                {(src, loading) => <img className={"collection-button " + (loading? "imgLoading" : "imgLoaded")} src={src} alt={""}/>}
                            </ProgressiveImage>
                            {/* <img className="collection-button" src={saleButton} alt="" /> */}
                        </Link>

                        <Link to={"/collections/all?categories=new-arrivals"}>                            
                            <ProgressiveImage src={newArrivalsButton}>
                                {(src, loading) => <img className={"collection-button " + (loading? "imgLoading" : "imgLoaded")} src={src} alt={""}/>}
                            </ProgressiveImage>
                            {/* <img className="collection-button" src={newArrivalsButton} alt="" /> */}
                        </Link>

                        <Link to={"/collections/all?categories=free-downloads"}>                            
                            <ProgressiveImage src={freeDownloadButton}>
                                {(src, loading) => <img className={"collection-button " + (loading? "imgLoading" : "imgLoaded")} src={src} alt={""}/>}
                            </ProgressiveImage>
                            {/* <img className="collection-button" src={freeDownloadButton} alt="" /> */}
                        </Link>
                    </div>
                </section>

                <CollectionBlock //OTHER COLLECTION
                collectionClasses={"left"}
                collectionLink={"/collections/other"}
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