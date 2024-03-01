import ProgressiveImage from "react-progressive-image"
import { Link } from "react-router-dom"

import placeholderImage from "../assets/placeholder.png"
import getPrimaryProductImage from "../hooks/getPrimaryProductImage"
import getProductUniverse from "../hooks/getProductUniverse"
import checkVariantsForPriceDifferences from "../hooks/checkVariantsForPriceDifferences"

export default function ProductCard({product}) {

    const variants = Object.values(product.variants)
    const variant = variants.find(variant => variant.isPrimaryVariant) //Finding the Variant marked as primary
    const productImage = getPrimaryProductImage(product) //Deciding wether to use variant/product picture
                        
    const productLink = product.id
    const productUniverse = getProductUniverse(product)
    const productName = product.name
    const productPrice = variant.price

    const isOnSale = product.isOnSale
    const isFree = product.isFree

    const variantPrice = variant.price //Add code to include "From" if more than one option
    const variantDiscountPrice = !isOnSale? 0 : variant.discountedPrice
    const variantDiscountPercentage = (((variantPrice - variantDiscountPrice) / variantPrice) * 100).toFixed(0)

    return (
        <Link to={`/products/${productLink}`} className={"product-card"}>
            {isOnSale && !isFree && <div className="sale-badge badge">{variantDiscountPercentage}% off</div>}

            <div className="product-card__image-container">
                <div className="product-card__image-wrapper">
                    <div className="product-card__image">
                        {/* Padding top div? */}

                        <ProgressiveImage src={productImage.link} placeholder={placeholderImage}>
                            {(src, loading) =>
                             <img 
                             src={src} 
                             alt={productImage.alt}
                             className={loading? "imgLoading":"imgLoaded"}
                             />
                            }                            
                        </ProgressiveImage>
                    </div>
                </div>
            </div>
            <div className="product-card__info">
                <div className="product-card__name">
                    {`${productUniverse} ${productName}`}
                </div>
                <div className="product-card__price">
                    {/* {product.isOnSale && <div className="product-tag">Sale</div>} */}
                    {checkVariantsForPriceDifferences(variants)? "" : "From " /*Adds "From" if more than one option*/}
                    {isFree? "FREE!" : `$${productPrice}`} 
                    {product.isOnSale && <span className="products-card__price-sale">${variant.discountedPrice}</span>}
                </div>
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