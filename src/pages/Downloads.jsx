import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import { getProductById } from '../hooks/getProductById'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import fetchOwnedDigitalItems from '../fetch/fetchOwnedDigitalItems'
import LoadingScreen from '../components/LoadingScreen'
import placeholderImage from "../assets/placeholder.png"


export default function Downloads() {
    const [isDoneLoading, setIsDoneLoading] = useState()
    const [ownedItemDetails, setOwnedItemDetails] = useState()
    const user = useSelector(state => state.auth.user) //Use Firebase-Auth instead?
    const products = useSelector(state => state.products.productList) //Use Firebase-Auth instead?
    const auth = getAuth()

    useEffect(() => {
        const getDetails = async () => {
            // Fetch matching order details
            setOwnedItemDetails(await fetchOwnedDigitalItems())
            setIsDoneLoading(true)
        }        
        if (user && auth.currentUser) getDetails()
    }, [user, auth.currentUser])

    const printOwnedItems = () => {
        if (ownedItemDetails && ownedItemDetails.length > 0) {
            return ownedItemDetails.slice().reverse().map((item, index) => { //In order of purchase (new to old)
                const product = getProductById(products, item.productId)
                const variant = Object.values(product.variants).find(variant => variant.id === item.variantId)

                const productLink = `/products/${item.productId}${item.variantId !== "standard"? `?variant=${item.variantId}` : ""}`
                const image = Object.values(product.variantsHaveImages? variant.images : product.images)[0].link
                //Use item.variantID to get file type when implemented
                
                return (
                    <div key={index} className='downloadable-item'>
                        <div className="downloadable-item__image-wrapper">
                            <Link to={productLink} title="View product details">
                                <ProgressiveImage src={image} placeholder={placeholderImage}>
                                    {(src, loading) =>
                                    <img 
                                    src={src} 
                                    // alt={imageAlt}
                                    className={loading? "imgLoading":"imgLoaded"}
                                    />
                                }
                                </ProgressiveImage>
                            </Link>
                        </div>
                        <div className="downloadable-item__detail-wrapper">
                            <Link to={productLink} title="View product details"><h3>{product.name} - PDF</h3></Link>
                            <p>FILE NAME HERE ( 100MB )</p>
                            <input type="button" value="Disabled" className='btn sold-out'/>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        // Still loading products?
        !isDoneLoading? <LoadingScreen/> 
        
        :

        // Are products present?
        ownedItemDetails?

        <div id="Downloads-Container">
            <h1>My Account</h1>
            <h2>Your Downloads</h2>
            {printOwnedItems()}
        </div>            
        
        :
        
        // No products found
        <div id="Downloads-Container">
            <div className="downloads-notFound">
                <h1>No digital products found</h1>
                <p className="downloads-notFound__message">You do not own any downloadable products.</p>
                <hr style={{width: "100%"}}/>
                <p className="downloads-notFound__continue">
                        <Link to={"/account"} className={"btn"} title="View your Account">View Account</Link>
                </p>
            </div>
        </div>
    )
}

