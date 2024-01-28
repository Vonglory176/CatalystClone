import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "../hooks/getProductById";
import { Suspense, lazy, useEffect, useState } from "react";

// import ProductCard from "./ProductCard";
const ProductCard = lazy(() => import('./ProductCard'))
import loadingSpinner from "../assets/loader-large.gif"
import ProgressiveImage from "react-progressive-image";

export default function CollectionBlock(
    {collectionClasses, collectionLink,collectionFrameSrc,collectionCoverSrc,collectionCoverTitle,productIdArray,characterImageSrc}) {
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
            <Link to={collectionLink} className={"collection-link"} style={{pointerEvents: collectionLink? "normal" : "none"}}>
                <ProgressiveImage
                src={collectionFrameSrc}
                >
                    {(src, loading) =>
                    <img
                    className={"featured-product-frame " + (loading? "imgLoading":"imgLoaded")}
                    src={src}
                    alt={""}
                    /> 
                    }
                </ProgressiveImage>
                {/* <img src={collectionFrameSrc} alt="" className="featured-product-frame" /> */}
            </Link>

            {characterImageSrc && //If no charImages, this is excluded   
            <Link to={collectionLink} className={"collection-link"}>
                <div className="featured-character">
                    <ProgressiveImage
                    src={characterImageSrc}
                    >
                        {(src, loading) =>
                        <img
                        src={src}
                        alt={""}
                        style={{opacity: loading? 0 : 1}}
                        /> 
                        }
                    </ProgressiveImage>
                </div>
            </Link>
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