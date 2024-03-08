import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { addToCartAsync } from "../store/cart-slice"
import ReactImageGallery from "react-image-gallery"

import placeholderImage from "../assets/placeholder.png"
import ProgressiveImage from "react-progressive-image"
import useViewportWidth from "../hooks/useViewportWidth"
import LoadingScreen from "../components/LoadingScreen"

export default function Products() {
    const productList = useSelector(state => state.products.productList)
    const dispatch = useDispatch()
    const {id} = useParams()

    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamVariantId = searchParams.get('variant')
    
    const [currentProduct, setCurrentProduct] = useState()
    const [variantLists, setVariantLists] = useState({
        variantList:false,
        variantListHtml:false,
    })
    const [selectedVariant, setSelectedVariant] = useState()
    const [productImages, setProductImages] = useState()
    const [productQuantity, setproductQuantity] = useState(1)

    // const [imageIsExpanded, setImageIsExpanded] = useState(false)

    //Getting product by ID & saving it in State
    useEffect(() => { 
        if (productList) {
            setCurrentProduct(() => {
                let product = false
        
                Object.keys(productList).forEach (category => {
                    if (product) return

                    product = Object.values(productList[category]).find(product => product.id === id)
                })
                if (!product) console.log("ERROR: Could not find product information!")
                return product
            })
            // console.log(currentProduct)
        }
    },[id, productList])

        /* You can use the Object.values() method to convert the products object into an array, 
        then use the find() method to find the object with the specified id.
        
        In this code, findProductById is a function that takes the products object and an id as 
        arguments. It iterates over each category in products, converts the products in that 
        category into an array, and uses find() to find the product with the specified id.

        If a product is found, it is returned immediately. If no product is found after checking 
        all categories, null is returned.*/
    
    //Creating HTML Variant Selector
    useEffect(()=>{
        if (currentProduct) {
            const variantArrayList = Object.values(currentProduct.variants)

            let tempVariantList = []
            for (let variant in variantArrayList) { //Converts "variant1" to "0"
                const variantId = variantArrayList[variant].id
                // searchParamVariantId
                tempVariantList.push(
                <option 
                key={variant} 
                value={variantId}
                // selected={searchParamVariantId === variantId? true : false} //...searchParamVariantId
                >
                    {variantArrayList[variant].name}
                </option>
                )
            }
            setVariantLists({variantList:variantArrayList, variantListHtml:tempVariantList})

            const tempSelectedVariant = searchParamVariantId? //Setting default selected Variant
                variantArrayList.find(variant => variant.id === searchParamVariantId): //SearchParams?
                variantArrayList[0] //If not, use first index
            setSelectedVariant(tempSelectedVariant)

            
            let tempVariantImages = []
            if (currentProduct.variantType && currentProduct.variantsHaveImages) { //NEEDS BETTER VARIANT CHECK
                tempVariantImages = Object.values(tempSelectedVariant.images).map(image => {
                    return {
                        original:image.link,
                        originalAlt:image.alt,
                        thumbnail:image.link,
                        thumbnailAlt:image.alt,
                    }
                })
            }

            let tempProductImages = []
            if (currentProduct.images) {
                tempProductImages = Object.values(currentProduct.images).map(image => {
                    return {
                        original:image.link,
                        originalAlt:image.alt,
                        thumbnail:image.link,
                        thumbnailAlt:image.alt,
                    }
                })
            }            

            let tempCombinedProductImages = [...tempVariantImages, ...tempProductImages]
            // console.log(tempCombinedProductImages)
            setProductImages(tempCombinedProductImages)
        }
    }, [currentProduct, searchParams])

    const handleSelectVariantChange = (event) => {
        const selectedVariantId = event.target.value
        console.log(selectedVariantId)
        console.log("HERE !!!")

        setSearchParams({variant:selectedVariantId})
    }

    const handleAddToCart = (event) => {
        event.preventDefault()
        console.log("CLICK")
        
        const productToAdd = {
            productId: currentProduct.id,
            variantId: selectedVariant.id,
            stripeId: selectedVariant.stripeId,
            isDigital: selectedVariant.isDigital,
            isPhysical: selectedVariant.isPhysical,
            quantity: productQuantity
            // productName: currentProduct.name,
            // variantName: selectedVariant.name,
            // variantPrice: (currentProduct.isOnSale? 
            //     selectedVariant.price : 
            //     selectedVariant.discountedPrice),
        }

        dispatch(addToCartAsync(productToAdd)) //addToCart
    }

    const handleInputChange = (event) => {
        const number = Number(event.target.value)
        if (number > 100) setproductQuantity(100)
        else if (number > 0) setproductQuantity(number)
    }
    const handleSubtractQuantity = () => {
        if (productQuantity > 1) setproductQuantity(prevQuantity => prevQuantity - 1)
    }
    const handleAddQuantity = () => {
        if (productQuantity < 100) setproductQuantity(prevQuantity => prevQuantity + 1)
    }

    const viewportWidth = useViewportWidth()

    return (
        <div id="Products-Container" className={productImages?.length > 1? `grid_60-40` : `grid_50-50`}>
            {!currentProduct && <LoadingScreen/>}

            {productImages && <ReactImageGallery
            items={productImages} 
            showPlayButton={false}
            showNav={productImages.length > 1? true : false}
            showThumbnails={productImages.length > 1? true : false}
            thumbnailPosition={viewportWidth < 750 || productImages.length === 1? "bottom" : "left"} //USE TO CHANGE FROM BOTTOM TO SIDE
            useBrowserFullscreen={false}
            // showFullscreenButton={false}
            //onErrorImageURL: String, default undefined

            // onClick={() => setImageIsExpanded(prevToggle => {return prevToggle? false : true})}
            // className={imageIsExpanded? "expanded" : ""}
            />}            

            <div className="products-main">
                <h1 className="products-main__title">
                    {currentProduct && ((currentProduct.universe !== "Other"? `${currentProduct.universe}: ` : "") + currentProduct.name)}
                </h1>
                
                {/* Check for sale / free */}
                {selectedVariant && <div className="products-main__price-container">
                    {currentProduct.isOnSale && <div className="product-tag">Sale</div> }
                    <span className="products-main__price">{selectedVariant.price !== 0? `$${currentProduct.isOnSale? selectedVariant.discountedPrice : selectedVariant.price}` : "FREE"}</span>
                    {currentProduct.isOnSale && <span className="products-main__price-container__sale-price">${selectedVariant.price}</span>}
                </div>}

                <hr />

                <form method="post" action="" id="Products-AddToCart-Form" className="products-form" onSubmit={handleAddToCart}>

                    <div className="products-form__input-container">
                        {/* Variant */}
                        {currentProduct && currentProduct.variantType &&
                        <div className="products-form__variant-selector-wrapper">
                            <label htmlFor="Variant-Selector">{currentProduct.variantType}</label>
                            <select name="Variant-Selector" id="Products-Form__Variant-Selector" value={searchParamVariantId || undefined} onChange={handleSelectVariantChange}>
                                {variantLists.variantListHtml}
                            </select>
                        </div>
                        }

                        {/* Quantity */}
                        <div className="products-form__quantity-selector-wrapper">
                            <div className="quantity-selector">
                                <label htmlFor="Quantity">Quantity</label>
                                <div className="quantity-selector__wrapper">                            
                                    <button type="button" onClick={handleSubtractQuantity}>-</button>
                                    <input type="number" name="Quantity" onChange={handleInputChange} value={productQuantity}/>
                                    <button type="button" onClick={handleAddQuantity}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart /&&/ Check if sold out */}
                    {selectedVariant && (selectedVariant.isSoldOut?
                        <input type="button" id="ContactFormSubmit" className="btn sold-out" value="Sold Out"/> : /* CAUSING ERROR */
                        <input type="submit" id="ContactFormSubmit" className="btn" value="Add to Cart"/>)
                    }
                </form>

                <hr />

                {currentProduct && <div dangerouslySetInnerHTML={{ __html: currentProduct.description }} />} {/* Maybe change? */}
                
                <hr />
            </div>
        </div>
    )
}