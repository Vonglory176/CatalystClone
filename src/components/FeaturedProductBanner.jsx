import ProgressiveImage from "react-progressive-image"

export default function FeaturedProductBanner({collectionId}) {

    const bannerSrc = collectionId === "shadowrun" ? 
    //Shadowrun
    "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-banners%2Fshadowrun-banner.webp?alt=media&token=5c5e8216-3f8f-46e8-898f-4ec61fef5d41" :
    //Battletech
    "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-banners%2Fbattletech-banner.webp?alt=media&token=69b2e0af-8bd1-4bbb-9119-fd367f39343a"

    return (
        <div className="featured-product-banner">
            <span style={{backgroundImage: `url(${bannerSrc})`}}/>
        </div>
    )
}