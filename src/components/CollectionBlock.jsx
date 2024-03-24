import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "../hooks/getProductById";
import { Suspense, lazy, useEffect, useState, useRef } from "react";

// import ProductCard from "./ProductCard";
const ProductCard = lazy(() => import('./ProductCard'))
import loadingSpinner from "../assets/loader-large.gif"
import ProgressiveImage from "react-progressive-image";

export default function CollectionBlock(
    {collectionClasses, collectionLink,collectionFrameSrc,collectionCoverSrc,collectionCoverTitle,productInformation,characterImageSrc}) {
    const productList = useSelector(state => state.products.productList)
    const [collectionProducts, setCollectionProducts] = useState()
    const [frameLoading, setFrameLoading] = useState(true)

    // useEffect(() => { //Making sure the frame loads first
    //     if (collectionFrameSrc) {
    //       const link = document.createElement("link")
    //       link.rel = "preload"
    //       link.as = "image"
    //       link.href = collectionFrameSrc
    //       document.head.appendChild(link)
    
    //       // Clean up
    //       return () => {
    //         document.head.removeChild(link)
    //       };
    //     }
    //   }, [collectionFrameSrc])

    //Preloading frame
    useEffect(() => {
        if (collectionFrameSrc) {
            const frame = new Image()
            frame.onload = () => setFrameLoading(false)
            frame.src = collectionFrameSrc
        }
    }, [])
    
    useEffect(() => {
        if(productList) {
            // Determine what products will be used
            const universe = productInformation.universe // all / battletech / shadowrun / other
            const category = productInformation.category // all / featured / new arrivals
            let localProductList = []
            let filteredProductList = []

            try {
                // Getting Universe products
                if (!universe || universe === "all") {//ALL UNIVERSE
                    Object.keys(productList).forEach(universe => { //For each Product Universe
                        Object.values(productList[universe]).forEach(product => {localProductList.push(product)})//For each Product in that Universe
                    })
                }
                
                else if (Object.keys(productList).includes(universe)) {//SINGLE UNIVERSE
                    Object.values(productList[universe]).forEach(product => {localProductList.push(product)}) //For each Product in the ID Universe
                }
                else throw new Error ("There was an error loading the collection " + universe + " from productList!")

                // Filtering with category (if present)
                if (category === "featured" || category === "new arrival") {
                    let tempProductList = []; // Temporary array to hold non-featured products
                    filteredProductList = localProductList.reduce((acc, product) => {
                        if (category === "featured"? product.isFeaturedProduct : product.isNewArrival) {
                            acc.push(product); // Add to the accumulator if it's a featured product
                            return acc;
                        } else {
                            tempProductList.push(product); // Otherwise, add to the temporary array
                            return acc;
                        }
                    }, []);
                    localProductList = tempProductList; // Replace the original array with the non-featured products
                }
                    
                    function shuffleArray(array) {
                        for (let i = array.length - 1; i > 0; i--) {
                            // Generate a random index from 0 to i
                            const j = Math.floor(Math.random() * (i + 1));
                            // Swap elements at indices i and j
                            [array[i], array[j]] = [array[j], array[i]];
                        }
                        return array;
                    }
                    
                    if (filteredProductList.length === 0) filteredProductList = localProductList
                    filteredProductList = shuffleArray(filteredProductList)
                    localProductList = shuffleArray(localProductList)
                    // console.log(filteredProductList)

                let productCardArray = []
                for (let i = 0; i < (characterImageSrc ? 4 : 5) ; i++) { // && i < filteredProductList.length
                    productCardArray.push(
                        <div className="grid__item" key={i}>
                            <Suspense fallback={<img src={loadingSpinner}></img>}>
                                {/* Lazy Loaded */}
                                <ProductCard product={filteredProductList[i]? filteredProductList[i] : filteredProductList[0]}/> 
                            </Suspense>
                        </div>
                    );
                }
                // console.log(productCardArray)
        
                setCollectionProducts(productCardArray)
            } catch (error) {
                console.error(error)
            }
        }
    },[productList]) //Might be firing too soon?

    const [isVisible, setIsVisible] = useState(false);
    const collectionRef = useRef();
    
    // Only loading/displaying product-cards when collection is in view
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            })
        })
    
        if (collectionRef.current) observer.observe(collectionRef.current)
    
        return () => {
            if (collectionRef.current) observer.unobserve(collectionRef.current)
        }
    }, [])

    return (
        <section className={`collection-block section-block ${collectionClasses}`}>

            {/* The background frame for larger views */}
            <Link 
            to={collectionLink} 
            className={`collection-link collection-frame-link ${frameLoading? "loading" : "loaded"}`} 
            style={{pointerEvents: collectionLink? "normal" : "none"}} 
            title="View all products in the collection">
                <img src={collectionFrameSrc} alt="" className={"featured-product-frame"}/>
            </Link>

            {characterImageSrc && //If no charImages, this is excluded   
            <Link to={collectionLink} className={"collection-link"} style={{pointerEvents: collectionLink? "normal" : "none"}} title="View all products in the collection">
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

            <div className="grid collection" ref={collectionRef}>
                <Link to={collectionLink} className={"collection-link"} style={{pointerEvents: collectionLink? "normal" : "none"}} title="View all products in the collection"></Link>

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

                {productList && isVisible && collectionProducts}
                
                {/* <div className="grid__item">
                    {status==="success" && <ProductCard product={getProductById(productList,"battletech-clan-invasion")}/>}
                </div> */}
                
            </div>
        </section>
    )
}