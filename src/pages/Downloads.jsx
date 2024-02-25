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
            return ownedItemDetails.map((item, index) => {
                const product = getProductById(products, item.productId)
                const variant = Object.values(product.variants).find(variant => variant.id === item.variantId)

                const productLink = `/products/${item.productId}${item.variantId !== "standard"? `?variant=${item.variantId}` : ""}`
                const image = Object.values(product.variantsHaveImages? variant.images : product.images)[0].link
                //Use item.variantID to get file type when implemented
                
                return (
                    <div key={index} className='downloadable-item'>
                        <div className="downloadable-item__image-wrapper">
                            <Link to={productLink}>
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
                            <h3>{product.name} - PDF</h3>
                            <p>FILE NAME HERE <br/> FILE SIZE HERE</p>
                            <input type="button" value="Download" className='btn'/>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div id="Downloads-Container">
            <h1>My Account</h1>
            <h2>Your Downloads</h2>
            {!isDoneLoading? <LoadingScreen/> : printOwnedItems()}
        </div>
    )
}
