import ProgressiveImage from "react-progressive-image"
import { Link } from "react-router-dom"
import placeholderImage from "../assets/placeholder.png"

export default function ProductResult({product}) {

    const variant = Object.values(product.variants).find(variant => variant.isPrimaryVariant) //Finding the Variant marked as primary
    const image = product.variantsHaveImages? variant.images["image1"] : product.images["image1"] //Deciding wether to use variant/product picture
                        
    let productUniverse = product.universe
    let productLink = product.id
    let productName = product.name  
    let productPrice = variant.price //Add code to include "From" if more than one option    
    let imageLink = image.link
    let imageAlt = image.alt

    // if (variant.isPrimaryVariant) {}

    return (
        <Link to={`products/${productLink}`} className={"product-result"}>
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
                <div className="product-result__name">{`${productUniverse? productUniverse + ":" : ""} ${productName}`}</div>
                <div className="product-result__price">{productPrice? `$${productPrice}` : "FREE"}</div>
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