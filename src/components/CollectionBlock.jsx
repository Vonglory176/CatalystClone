import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "../hooks/getProductById";
import { Suspense, lazy, useEffect, useState } from "react";

// import ProductCard from "./ProductCard";
const ProductCard = lazy(() => import('./ProductCard'))
import loadingSpinner from "../assets/loader-large.gif"

export default function CollectionBlock(
    {collectionClasses, collectionLink,collectionFrameSrc,collectionCoverSrc,collectionCoverTitle,productIdArray,characterImageSrcArray}) {
    const productList = useSelector(state => state.products.productList)
    const status = useSelector(state => state.products.status)
    const [collectionProducts, setCollectionProducts] = useState()
    
    useEffect(() => {
        if(status === "success") {
            let productCardArray = []
    
            for (let productId in productIdArray) {
                productCardArray.push(
                    <div className="grid__item" key={productId}>
                        <Suspense fallback={<img src={loadingSpinner}></img>}>
                            {/* Lazy Loaded */}
                            <ProductCard product={getProductById(productList,productIdArray[productId])}/> 
                        </Suspense>
                    </div>
                )
            }
            // console.log(productCardArray)
    
            setCollectionProducts(productCardArray)
        }
    },[status]) //Might be firing too soon?

    //Could add code where not having a collection-cover ALSO hides component in small views?

    return (
        <section className={`collection-block section-block ${collectionClasses}`}>

            {/* The background frame for larger views */}
            <Link to={collectionLink} className={"collection-link"}>
                <img src={collectionFrameSrc} alt="" className="featured-product-frame" />
            </Link>

            {characterImageSrcArray && //If no charImages, this is excluded   
            <div className="featured-character">
                <img src={characterImageSrcArray[0]} alt=""/>
            </div>
            }

            <div className="grid collection">
                <Link to={collectionLink} className={"collection-link"}></Link>

                {collectionCoverTitle && //If no Title, this is excluded           
                <div className="grid__item collection__cover">
                    {/* <Link to={"/"} className={"collection-link"}></Link> */}
                    <Link 
                    to={collectionLink} 
                    className={"collection-card"} 
                    style={{backgroundImage: `url(${collectionCoverSrc})`}}
                    >
                        <div className="collection-card__meta">
                            <p className="collection-card__title h1">{collectionCoverTitle}</p>
                            <p className="collection-card__subtext">View all</p>
                        </div>
                    </Link>
                </div>
                }

                {status==="success" && collectionProducts}
                
                {/* <div className="grid__item">
                    {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                </div> */}
                
            </div>
        </section>
    )
}