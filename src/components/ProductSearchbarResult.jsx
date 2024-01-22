import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png"
import getPrimaryProductImage from "../hooks/getPrimaryProductImage";
import checkVariantsForPriceDifferences from "../hooks/checkVariantsForPriceDifferences";
import ProgressiveImage from "react-progressive-image";

export default function ProductSearchbarResult(product) {
    const productLink = product.id
    const productName = product.name
    const productUniverse = product.universe === "Other"? "" : product.universe
    const productDescription = product.description

    const image = getPrimaryProductImage(product)
    const imageLink = image.link
    const imageAlt = image.alt

    const isFree = product.isFree //Is the product free? (This takes precedent & will override Price/Discount code)
    const isOnSale = product.isOnSale //Is the product on sale?
    
    const variants = Object.values(product.variants)
    const variant = variants.find(variant => variant.isPrimaryVariant) //Finding the Variant marked as primary

    const variantPrice = variant.price //Add code to include "From" if more than one option
    const variantPriceDifference = checkVariantsForPriceDifferences(variants)? "" : "From "
    const variantDiscountPrice = !isOnSale? 0 : variant.discountedPrice
    // const variantDiscountPercentage = (((variantPrice - variantDiscountPrice) / variantPrice) * 100).toFixed(0)

    return (
        <Link to={`products/${productLink}`} className={"searchbar-product-result"}>
            <div className="searchbar-product-result__image-container">
                <ProgressiveImage
                src={imageLink}
                srcSetData={{
                    srcSet:`${imageLink}`,
                    sizes: "(max-width: 70px) 100%, (max-height: 73px) 100%"
                  }}
                placeholder={placeholderImage}
                >
                    {(src, loading, srcSetData) =>
                    <img
                    className={(loading? "imgLoading":"imgLoaded")}
                    src={src}
                    srcSet={srcSetData.srcSet}
                    sizes={srcSetData.sizes}
                    alt={imageAlt}
                    /> 
                    }
                </ProgressiveImage>
            </div>
            <div className="searchbar-product-result__info-container">
                <div className="searchbar-product-result__name">
                    {`${productUniverse? productUniverse + ":" : ""} ${productName}`}
                </div>
                <div className="searchbar-product-result__description" dangerouslySetInnerHTML={{ __html: productDescription }} />
                {/* <div className="searchbar-product-result__description">
                    {productDescription}
                </div> */}
                <div className="searchbar-product-result__price">
                    { isFree? <span>FREE</span>
                    : isOnSale? <span>{variantPriceDifference} ${variantDiscountPrice} <del>${variantPrice}</del></span>
                    : <span>{variantPriceDifference} ${variantPrice}</span> }    
                </div>                
            </div>
        </Link>
    )
}