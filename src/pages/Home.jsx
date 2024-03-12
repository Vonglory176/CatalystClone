import { Link } from "react-router-dom"
import ProgressiveImage from "react-progressive-image"

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
// import tabletopFramePlaceholder from "/src/assets/block-collection/frames/collection-frame-tabletop-low-res.webp"
import tabletopFrame from "/src/assets/block-collection/frames/collection-frame-tabletop.webp"
import tabletopCover from "/src/assets/block-collection/covers/IWFTD_480x480.webp"
//Collection Buttons
import saleButton from "../assets/button-collection/collection-buttons-01.webp"
import saleButtonLowRes from "../assets/button-collection/collection-buttons-01-low-res.webp"
import newArrivalsButton from "../assets/button-collection/collection-buttons-02.webp"
import newArrivalsButtonLowRes from "../assets/button-collection/collection-buttons-02-low-res.webp"
import freeDownloadButton from "../assets/button-collection/collection-buttons-03.webp"
import freeDownloadButtonLowRes from "../assets/button-collection/collection-buttons-03-low-res.webp"
import FeaturedProductBanner from "../components/FeaturedProductBanner"


export default function Home() {
    
    const battletechCharacterArray = [
        // characterVictor,
        "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-characters%2Fcharacter-victor-small.webp?alt=media&token=3e4239c4-f393-4b2a-b625-e0365efe35e3",
        // characterTimberWolf
        "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-characters%2Fcharacter-timberWolf-small.webp?alt=media&token=f9f932ae-76bf-4d65-80f2-e7d300f4730a"
    ]
    const shadowrunCharacterArray = [
        // characterCombatMage
        "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-characters%2Fcharacter-combatMage-small.webp?alt=media&token=08978c41-0250-4cc2-af4d-b0448383184f",
        // characterStreetSamurai
        "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-characters%2Fcharacter-streetSamurai-small.webp?alt=media&token=2b696e12-47b7-4c85-8f10-4c2c4d16690c"
    ]

    const pickRandomCharacter = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    return (
        <div id="Home-Container">
            
            <div className="getting-started">
                <Link to={"/collections/battletech?categories=getting-started"} className="getting-started__link" title="View Battletech products recommended for newcomers">
                    {/* <img className="getting-started__button" src={gettingStartedBattletech} alt="Get started with Battletech"/> */}
                    <ProgressiveImage
                    src={gettingStartedBattletech}
                    placeholder={gettingStartedBattletechLowRes}
                    >
                        {(src, loading) =>
                            <img
                            className={
                                "getting-started__button " +
                                (loading? "imgLoading-placeholder":"imgLoaded-placeholder")
                            }
                            src={src}
                            alt={"Get started with Battletech"}
                            /> 
                        }
                    </ProgressiveImage>
                </Link>
                <Link to={"/collections/shadowrun?categories=getting-started"} className="getting-started__link" title="View Shadowrun products recommended for newcomers">
                    {/* <img className="getting-started__button" src={gettingStartedShadowrun} alt="Get started with Shadowrun"/> */}
                    <ProgressiveImage 
                    src={gettingStartedShadowrun}
                    placeholder={gettingStartedShadowrunLowRes}
                    >
                        {(src, loading) =>
                            <img
                            className={
                                "getting-started__button " +
                                (loading? "imgLoading-placeholder":"imgLoaded-placeholder")
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
                    productInformation={{
                        universe: "all",
                        category: "featured",
                    }}
                    characterImageSrcArray={""}
                    />
                </div>

                <CollectionBlock //BATTLETECH COLLECTION
                collectionClasses={"left"}
                collectionLink={"/collections/battletech"}
                collectionFrameSrc={battletechFrame}
                collectionCoverSrc={battletechCover}
                collectionCoverTitle={"Battletech"}
                productInformation={{
                    universe: "battletech",
                    category: "featured",
                }}
                characterImageSrc={pickRandomCharacter(battletechCharacterArray)}
                />

                <CollectionBlock //SHADOWRUN COLLECTION
                collectionClasses={"right"}
                collectionLink={"/collections/shadowrun"}
                collectionFrameSrc={shadowrunFrame}
                collectionCoverSrc={shadowrunCover}
                collectionCoverTitle={"Shadowrun"}
                productInformation={{
                    universe: "shadowrun",
                    category: "featured",
                }}
                characterImageSrc={pickRandomCharacter(shadowrunCharacterArray)}
                />

                <section className="collection-buttons-container">
                    <div className="collection-buttons-wrapper">
                        <Link to={"/collections/all?categories=on-sale"} title="View products that are on sale">                            
                            <ProgressiveImage src={saleButton}>
                                {(src, loading) => <img className={"collection-button " + (loading? "imgLoading-placeholder" : "imgLoaded-placeholder")} src={loading? saleButtonLowRes : src} alt={""}/>}
                            </ProgressiveImage>
                            {/* <img className="collection-button" src={saleButton} alt="" /> */}
                        </Link>

                        <Link to={"/collections/all?categories=new-arrivals"} title="View products that have been added recently">                            
                            <ProgressiveImage src={newArrivalsButton}>
                                {(src, loading) => <img className={"collection-button " + (loading? "imgLoading-placeholder" : "imgLoaded-placeholder")} src={loading? newArrivalsButtonLowRes : src} alt={""}/>}
                            </ProgressiveImage>
                            {/* <img className="collection-button" src={newArrivalsButton} alt="" /> */}
                        </Link>

                        <Link to={"/collections/all?categories=free-downloads"} title="View products that are free to download">                            
                            <ProgressiveImage src={freeDownloadButton}>
                                {(src, loading) => <img className={"collection-button " + (loading? "imgLoading-placeholder" : "imgLoaded-placeholder")} src={loading? freeDownloadButtonLowRes : src} alt={""}/>}
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
                productInformation={{
                    universe: "other",
                    category: "featured",
                }}
                characterImageSrcArray={""}
                />                

                <MailListSignUp/>
            </div>
        </div>                        
    )
}