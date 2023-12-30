import { Link } from "react-router-dom"
// import clanInvasionBoxset from "../assets/featured-products/ClanInvasionBox.webp"

export default function ProductResult({productUniverse, productLink, productName, productPrice, imageLink, imageAlt}) {
    return (
        <Link to={`products/${productLink}`} className={"product-result"}>
            <div className="product-result__image-container">
                <img src={imageLink} alt={imageAlt} />
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