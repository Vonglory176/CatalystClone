import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addItemToCart, cartActions } from "../store/cart-slice"

export default function Products() {
    const productList = useSelector(state => state.products.productList)
    const dispatch = useDispatch()
    const {id} = useParams()
    
    const [currentProduct, setCurrentProduct] = useState()
    const [variantLists, setVariantLists] = useState({
        variantList:false,
        variantListHtml:false,
    })
    const [selectedVariant, setSelectedVarient] = useState()
    const [productQuantity, setproductQuantity] = useState(1)
    
    // const findProductById = () => {
    //     let product = false
        
    //     Object.keys(productList).forEach (category => {
    //         if (product) return

    //         product = Object.values(productList[category]).find(product => product.id === id)
    //         console.log(product)
    //     })
    //     if (!product) console.log("ERROR: Could not find product information!")
    //     return product
    // }

    useEffect(() => { //Getting product by ID & saving it in State
        if (productList) {
            // setCurrentProduct(findProductById())
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

    // const [selectedVariant, setSelectedVariant] = useState()
    
    // let currentImage = currentProduct.variantsHaveImages?
    //Selector for variants
    
    //Creating Variant Select in HTML
    useEffect(()=>{
        if (currentProduct) {
            const variantArrayList = Object.values(currentProduct.variants)

            let tempVariantList = []
            for (let variant in variantArrayList) { //Converts "variant1" to "0"
                tempVariantList.push(
                <option 
                key={variant} 
                value={variant}                
                >
                    {variantArrayList[variant].name}
                </option>
                )
            }
            setVariantLists({variantList:variantArrayList, variantListHtml:tempVariantList})
            setSelectedVarient(variantArrayList[0]) //Setting default selected Variant
        }
    }, [currentProduct])

    const handleSelectVariantChange = (event) => {
        const selectedValue = event.target.value
        console.log(selectedValue)

        setSelectedVarient(variantLists.variantList[selectedValue]) //ADD ID TO URL
        console.log(selectedVariant)
    }

    const handleAddToCart = (event) => {
        event.preventDefault()
        console.log("CLICK")

        const productToAdd = {
            productId: currentProduct.id,
            // productName: currentProduct.name,
            variantId: selectedVariant.id,
            // variantName: selectedVariant.name,
            // variantPrice: (currentProduct.isOnSale? 
            //     selectedVariant.price : 
            //     selectedVariant.discountedPrice),
            quantity: productQuantity
        }

        dispatch(cartActions.addToCart(productToAdd))
    }

    const handleInputChange = (event) => {
        setproductQuantity(Number(event.target.value))
    }

    const handleSubtractQuantity = (event) => {
        event.preventDefault()

        setproductQuantity(prevQuantity => prevQuantity - 1)
        console.log(productQuantity)
    }
    const handleAddQuantity = (event) => {
        event.preventDefault()

        setproductQuantity(prevQuantity => prevQuantity + 1)
        console.log(productQuantity)
    }

    return (
        <div id="Products-Container">
            <div className="products-images">
                <div className="products-images__primary">
                    {selectedVariant && (currentProduct.variantsHaveImages?
                    <img //If yes, use Variant Image for initial
                    src={Object.values(selectedVariant.images)[0].link} 
                    alt={Object.values(selectedVariant.images)[0].alt} 
                    /> :
                    <img //If no, use Product Image for initial
                    src={Object.values(currentProduct.images)[0].link} 
                    alt={Object.values(currentProduct.images)[0].alt} 
                    />)}                    
                </div>
                <div className="products-images__scroller"></div>
            </div>

            <div className="products-main">
                <h1 className="products-title">
                    {currentProduct && ((currentProduct.universe? `${currentProduct.universe}: ` : "") + currentProduct.name)}
                </h1>
                
                {/* Check for sale / free */}
                {selectedVariant && <span>{selectedVariant.price !== 0? `$${selectedVariant.price}` : "FREE"}</span>}
                {selectedVariant && currentProduct.isOnSale && <span>SALE!!!! {selectedVariant.discountedPrice}</span>}

                <hr />

                <form method="post" action="" id="Products-AddToCart-Form" className="products-form" onSubmit={handleAddToCart}>

                    {currentProduct && currentProduct.variantType &&
                    <div className="products-form__variant-selector-wrapper">
                        <label htmlFor="Variant-Selector">{currentProduct.variantType}</label>
                        <select name="Variant-Selector" id="Products-Form__Variant-Selector" onChange={handleSelectVariantChange}>
                            {variantLists.variantListHtml}
                        </select>
                    </div>
                    }

                    <div className="products-form__quantity-selector-wrapper">
                        <label htmlFor="Quantity">Quantity</label>
                        <div id="Quantity-Selector__Input-Wrapper">
                            <button onClick={handleSubtractQuantity}>-</button>
                            <input type="number" name="Quantity" onChange={handleInputChange} value={productQuantity}/>
                            <button onClick={handleAddQuantity}>+</button>
                        </div>
                    </div>
                    {/* Check if sold out */}
                    {selectedVariant && (selectedVariant.isSoldOut?
                        <input id="ContactFormSubmit" className="btn" value="Sold Out"/> : /* CAUSING ERROR */
                        <input type="submit" id="ContactFormSubmit" className="btn" value="Add to Cart"/>)
                    }
                </form>

                <hr />

                {currentProduct && <div dangerouslySetInnerHTML={{ __html: currentProduct.description }} />} {/* Maybe change? */}

            </div>
        </div>
    )
}