import ProgressiveImage from "react-progressive-image"
import { Link } from "react-router-dom"

import placeholderImage from "../assets/placeholder.png"

export default function ProductCard({product}) {

    const variant = Object.values(product.variants).find(variant => variant.isPrimaryVariant) //Finding the Variant marked as primary
    const image = product.variantsHaveImages? variant.images["image1"] : product.images["image1"] //Deciding wether to use variant/product picture
                        
    let productUniverse = product.universe
    let productLink = product.id
    let productName = product.name  
    let productPrice = variant.price //Add code to include "From" if more than one option    
    let imageLink = image.link
    let imageAlt = image.alt

    return (
        <Link to={`/collections/${productUniverse}/products/${productLink}`} className={"product-card"}>
            <div className="product-card__image-container">
                <div className="product-card__image-wrapper">
                    <div className="product-card__image">
                        {/* Padding top div? */}

                        <ProgressiveImage src={imageLink} placeholder={placeholderImage}>
                            {(src, loading) =>
                             <img 
                             src={src} 
                             alt={imageAlt}
                             className={loading? "imgLoading":"imgLoaded"}
                             />
                            }                            
                        </ProgressiveImage>

                        {/* <img src={imageLink} alt={imageAlt}/> */}
                    </div>
                </div>
            </div>
            <div className="product-card__info">
                <div className="product-card__name">{`${productUniverse? productUniverse + ":" : ""} ${productName}`}</div>
                <div className="product-card__price">{productPrice}</div>
            </div>
            <div className="product-card__overlay">
                <span className="btn product-card__overlay-btn">View</span>
            </div>
        </Link>
    )
}

/* TO USE THIS YOU NEED..
    -Link
    -Picture
    -Name
    -Price
*/

/* <a href="!#" className="product-card">
    <div className="product-card__image-container">
        <div className="product-card__image-wrapper">
            <div className="product-card__image">
                <img src={clanInvasionBoxset} alt="Clan Invasion Boxset" />
            </div>
        </div>
    </div>
    <div className="product-card__info">
        <div className="product-card__name"></div>
        <div className="product-name__price"></div>
    </div>
    <div className="produt-card__overlay">
        <span className="btn product-card__overlay-btn"></span>
    </div>
</a> */