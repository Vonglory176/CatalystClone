import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import productList from "../data/productList"

export default function Products() {
    const [currentProduct, setCurrentProduct] = useState()
    const {id} = useParams()

    useEffect(() => {
        const findProductById = (productList, id) => {
            for (let category in productList) {
                let product = Object.values(productList[category]).find(product => product.id === id)
                if (product) return product
            }
            return null
        }
        
        setCurrentProduct(findProductById(productList, id))

        /* You can use the Object.values() method to convert the products object into an array, 
        then use the find() method to find the object with the specified id.
        
        In this code, findProductById is a function that takes the products object and an id as 
        arguments. It iterates over each category in products, converts the products in that 
        category into an array, and uses find() to find the product with the specified id.

        If a product is found, it is returned immediately. If no product is found after checking 
        all categories, null is returned.*/
    },[])


    return (
        <div id="Products-Container">
            <div className="products-images">
                <div className="products-images__primary">
                    {currentProduct && <img src={currentProduct.variants.choices[0].images[0].link} alt={currentProduct.variants.choices[0].images[0].alt} />}
                </div>
                <div className="products-images__scroller"></div>
            </div>

            <div className="products-main">
                <h1 className="products-title">
                    {currentProduct && ((currentProduct.universe? `${currentProduct.universe}: ` : "") + currentProduct.name)}
                </h1>

                <span>{currentProduct && `$${currentProduct.variants.choices[0].price}`}</span> {/* NEED SWAP CODE FOR VARIANTS */}

                <hr />

                <form method="post" action="" id="Products-AddToCart-Form" className="products-form" onSubmit={()=>{return}}>
                    <div className="products-form__variant-selector-wrapper">
                        <label htmlFor="Variant-Selector">{currentProduct && currentProduct.variants.type}</label>
                        <select name="Variant-Selector" id="Products-Form__Variant-Selector"> {/* NEED SWAP CODE FOR VARIANTS */}
                            <option value="">Unlimited</option>
                            <option value="">Kickstarter</option>
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