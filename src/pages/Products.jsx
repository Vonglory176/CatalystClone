import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { cartActions } from "../store/cart-slice"

import placeholderImage from "../assets/placeholder.png"
import ProgressiveImage from "react-progressive-image"

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
    const [productQuantity, setproductQuantity] = useState(1)

    const [imageIsExpanded, setImageIsExpanded] = useState(false)

    //Getting product by ID & saving it in State
    useEffect(() => { 
        if (productList) {
            setCurrentProduct(() => {
                let product = false
        
                Object.keys(productList).forEach (category => {
                    if (product) return

                    product = Object.values(productList[category]).find(product => product.id === id)
                    // console.log(product)
                })
                if (!product) console.log("ERROR: Could not find product information!")
                return product
            })
                    console.log(currentProduct)
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
                selected={searchParamVariantId === variantId? true : false} //...searchParamVariantId
                >
                    {variantArrayList[variant].name}
                </option>
                )
            }
            setVariantLists({variantList:variantArrayList, variantListHtml:tempVariantList})

            setSelectedVariant(searchParamVariantId? //Setting default selected Variant
                variantArrayList.find(variant => variant.id === searchParamVariantId): //SearchParams?
                variantArrayList[0]) //If not, use first index
        }
    }, [currentProduct, searchParams])

    const handleSelectVariantChange = (event) => {
        const selectedVariantId = event.target.value
        console.log(selectedVariantId)

        setSearchParams({variant:selectedVariantId})
    }

    const handleAddToCart = (event) => {
        event.preventDefault()
        console.log("CLICK")

        const productToAdd = {
            productId: currentProduct.id,
            variantId: selectedVariant.id,
            quantity: productQuantity
            // productName: currentProduct.name,
            // variantName: selectedVariant.name,
            // variantPrice: (currentProduct.isOnSale? 
            //     selectedVariant.price : 
            //     selectedVariant.discountedPrice),
        }

        dispatch(cartActions.addToCart(productToAdd))
    }

    const handleInputChange = (event) => {
        const number = Number(event.target.value)
        if (number > 0) setproductQuantity(number)
    }
    const handleSubtractQuantity = () => {
        if (productQuantity > 1) setproductQuantity(prevQuantity => prevQuantity - 1)
        console.log(productQuantity)
    }
    const handleAddQuantity = () => {
        setproductQuantity(prevQuantity => prevQuantity + 1)
        console.log(productQuantity)
    }

    return (
        <div id="Products-Container">
            <div className="products-images">
                <div className="products-images__primary">
                    {/* {selectedVariant && (currentProduct.variantsHaveImages?
                    <img //If yes, use Variant Image for initial
                    src={Object.values(selectedVariant.images)[0].link} 
                    alt={Object.values(selectedVariant.images)[0].alt} 
                    /> :
                    <img //If no, use Product Image for initial
                    src={Object.values(currentProduct.images)[0].link} 
                    alt={Object.values(currentProduct.images)[0].alt} 
                    />)} */}

                    {selectedVariant && 
                    <ProgressiveImage
                    src={currentProduct.variantsHaveImages? 
                        Object.values(selectedVariant.images)[0].link :
                        Object.values(currentProduct.images)[0].link
                    } 
                    placeholder={placeholderImage}>
                        {(src, loading) =>
                        <img 
                        src={src} 
                        alt={currentProduct.variantsHaveImages? 
                            Object.values(selectedVariant.images)[0].alt :
                            Object.values(currentProduct.images)[0].alt
                        }
                        onClick={() => setImageIsExpanded(prevToggle => {return prevToggle? false : true})}
                        className={
                            (loading? "imgLoading ":"imgLoaded ") +
                            (imageIsExpanded? "expanded" : "")
                        }
                        />
                        }                            
                    </ProgressiveImage>}      
                </div>
                <div className="products-images__scroller"></div>
            </div>

            <div className="products-main">
                <h1 className="products-main__title">
                    {currentProduct && ((currentProduct.universe? `${currentProduct.universe}: ` : "") + currentProduct.name)}
                </h1>
                
                {/* Check for sale / free */}
                {selectedVariant && <div className="products-main__price-container">
                    {/* currentProduct.isOnSale && */<div className="product-tag">Sale</div> }
                    <span className="products-main__price">{selectedVariant.price !== 0? `$${selectedVariant.price}` : "FREE"}</span>
                    {/* currentProduct.isOnSale && */<span className="products-main__sale-price">SALE PRICE {selectedVariant.discountedPrice}</span>}
                </div>}

                <hr />

                <form method="post" action="" id="Products-AddToCart-Form" className="products-form" onSubmit={handleAddToCart}>

                    <div className="products-form__input-container">
                        {/* Variant */}
                        {currentProduct && currentProduct.variantType &&
                        <div className="products-form__variant-selector-wrapper">
                            <label htmlFor="Variant-Selector">{currentProduct.variantType}</label>
                            <select name="Variant-Selector" id="Products-Form__Variant-Selector" onChange={handleSelectVariantChange}>
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
                        <input id="ContactFormSubmit" className="btn" value="Sold Out"/> : /* CAUSING ERROR */
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