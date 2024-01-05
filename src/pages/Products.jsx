import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function Products() {
    const [currentProduct, setCurrentProduct] = useState()
    const productList = useSelector(state => state.products.productList)
    const {id} = useParams()

    
    const findProductById = () => {
        let product = false
        
        Object.keys(productList).forEach (category => {
            if (product) return

            product = Object.values(productList[category]).find(product => product.id === id)
            console.log(product)
        })
        if (!product) console.log("ERROR: Could not find product information!")
        return product
    }

    useEffect(() => {
        if (productList) {
            setCurrentProduct(findProductById())
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

    const [selectedVariant, setSelectedVariant] = useState()
    const [variantList, setVariantList] = useState()

    // let currentImage = currentProduct.variantsHaveImages?
    let currentVariant
    //Selector for variants
    //Check for sale / free / sold-out

    useEffect(()=>{
        if (currentProduct) {
            const variantArrayList = Object.values(currentProduct.variants)
            console.log(variantArrayList)
            
            
            let tempVariantList = []
            for (let variant in currentProduct.variants) {
                tempVariantList.push(<option value={currentProduct[variant]}>{currentProduct.variants.name}</option>)
            }
            setVariantList(tempVariantList)
        }
    }, [currentProduct])

    return (
        <div id="Products-Container">
            <div className="products-images">
                <div className="products-images__primary">
                    {/* {currentProduct && <img src={currentProduct.variants.choices[0].images[0].link} alt={currentProduct.variants.choices[0].images[0].alt} />} */}
                </div>
                <div className="products-images__scroller"></div>
            </div>

            <div className="products-main">
                <h1 className="products-title">
                    {currentProduct && ((currentProduct.universe? `${currentProduct.universe}: ` : "") + currentProduct.name)}
                </h1>

                {/* <span>{currentProduct && `$${currentProduct.variants.choices[0].price}`}</span> NEED SWAP CODE FOR VARIANTS */}

                <hr />

                <form method="post" action="" id="Products-AddToCart-Form" className="products-form" onSubmit={()=>{return}}>
                    <div className="products-form__variant-selector-wrapper">
                        <label htmlFor="Variant-Selector">{currentProduct && currentProduct.variants.type}</label>
                        <select name="Variant-Selector" id="Products-Form__Variant-Selector"> {/* NEED SWAP CODE FOR VARIANTS */}
                            {/* <option value="">Unlimited</option>
                            <option value="">Kickstarter</option> */}
                            {variantList}
                        </select>
                    </div>
                    <div className="products-form__quantity-selector-wrapper">
                        <label htmlFor="Quantity">Quantity</label>
                        <div id="Quantity-Selector__Input-Wrapper">
                            <button>-</button>
                            <input type="text" name="Quantity"/>
                            <button>+</button>
                        </div>
                    </div>
                    {/* <button className="btn">Add To Cart</button> */}
                    <input type="submit" id="ContactFormSubmit" className="btn" value="Add to Cart"/>
                </form>

                <hr />

                {currentProduct && <div dangerouslySetInnerHTML={{ __html: currentProduct.description }} />} {/* Maybe change? */}

            </div>
        </div>
    )
}