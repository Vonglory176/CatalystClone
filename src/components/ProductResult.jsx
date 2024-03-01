import ProgressiveImage from "react-progressive-image"
import { Link } from "react-router-dom"
import placeholderImage from "../assets/placeholder.png"
import checkVariantsForPriceDifferences from "../hooks/checkVariantsForPriceDifferences"
import getPrimaryProductImage from "../hooks/getPrimaryProductImage"
import getProductUniverse from "../hooks/getProductUniverse"

export default function ProductResult({product}) {

    const productId = product.id
    const productName = product.name
    const productUniverse = getProductUniverse(product)
    
    const productImage = getPrimaryProductImage(product)
    const imageLink = productImage.link
    const imageAlt = productImage.alt

    const isFree = product.isFree //Is the product free? (This takes precedent & will override Price/Discount code)
    const isOnSale = product.isOnSale //Is the product on sale?
    
    const variants = Object.values(product.variants)
    const variant = variants.find(variant => variant.isPrimaryVariant) //Finding the Variant marked as primary
    
    const variantPrice = variant.price //Add code to include "From" if more than one option
    const variantPriceDifference = checkVariantsForPriceDifferences(variants)? "" : "From "
    const variantDiscountPrice = !isOnSale? 0 : variant.discountedPrice
    const variantDiscountPercentage = (((variantPrice - variantDiscountPrice) / variantPrice) * 100).toFixed(0)

    return (
        <Link to={`/products/${productId}`} className={"product-result"}>
            {isOnSale && !isFree && <div className="sale-badge badge">{variantDiscountPercentage}% off</div>}

            <div className="product-result__image-container">
                {/* <img src={imageLink} alt={imageAlt} /> */}
                <ProgressiveImage
                src={imageLink}
                placeholder={placeholderImage}
                >
                    {(src, loading) =>
                    <img
                    className={(loading? "imgLoading":"imgLoaded")}
                    src={src}
                    alt={imageAlt}
                    /> 
                    }
                </ProgressiveImage>
            </div>

            <div className="product-result__info">
                <div className="product-result__name">{`${productUniverse} ${productName}`}</div>
                <div className="product-result__price">
                    { isFree? <span>FREE</span>
                    : isOnSale? <span>{variantPriceDifference} ${variantDiscountPrice} <del>${variantPrice}</del></span>
                    : <span>{variantPriceDifference} ${variantPrice}</span> }
                </div>
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