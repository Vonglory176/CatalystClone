import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import OrderHistory from "../components/OrderHistory"
import LoadingScreen from "../components/LoadingScreen"

export default function Account() {
    const user = useSelector(state => state.auth.user)
    const [doneLoading, setDoneLoading] = useState(false)
    const [address, setAddress] = useState(false)

    useEffect(() => {
        if (user && user.addresses) { //Always using default, and if no default, use first
            const defaultAddress = user.addresses.find(address => address.isDefaultAddress)
            setAddress(defaultAddress? defaultAddress : user.addresses[0])
        } else {
            setAddress(false)
        }
    }, [user])

    const doneLoadingCallback = () => {
        setDoneLoading(true)
    }

    // <img src={loaderGif} className="loading-gif" alt="Loading..." />

    return (
        <div id="Account-Details">
            <h1 className="page-title">My Account</h1>

            {!doneLoading && <LoadingScreen/>}
            
            <div id="Account-Details__Wrapper">

                <div id="Account-Details__Main-Container" className="content-block">
                    {/* <p className="account__continue"> */}
                        {!user?.ownedDownloadableFiles && <Link to={"/account/downloads"} className={"btn button-link"} title="View your downloadable files" style={{marginBottom: "20px"}}>My Downloadable Files</Link>} {/* Note "All" */}
                    {/* </p> */}
                    {/* <p className="account__continue">
                        <Link to={"/"} className={"btn"}>Manage My Membership</Link>
                    </p> */}

                    <OrderHistory doneLoadingCallback={doneLoadingCallback}/>
                </div>

                <div id="Account-Details__Secondary-Container" className="content-block">
                    <h3>Account Details</h3>
                    {address && 
                    <div className="address-container">
                        <p>
                            {address.firstName} {address.lastName} {(address.firstName || address.lastName) && <br/>}
                            {address.company} {address.company && <br/>}
                            {address.country} {address.country && <br/>}
                            {address.address1} {address.address1 && <br/>}
                            {address.address2} {address.address2 && <br/>}
                            {address.city} {address.province} {address.postalCode} {(address.city || address.province || address.postalCode) && <br/>}
                        </p>
                        {/* <p>{address.firstName} {address.lastName}</p>
                        <p>{address.country}</p>
                        <p>{address.address1}</p>
                        <p>{address.address2}</p>
                        <p>{address.city} {address.province} {address.postalCode}</p> */}
                    </div>
                    
                    }
                    {/* <Link to={"addresses"} className="addresses-link">View Addreses ({address? user.addresses.length : 0})</Link> */}
                </div>
            </div>
        </div>
    )
}

//If not logged in, redirect to Login page ("replace" so back button works)
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    // const navigate = useNavigate()
    // if (!isLoggedIn) return <Navigate to="login" replace/>

    // useEffect(() => {
    //     if (!isLoggedIn) navigate("login", {replace:true})
    // }, [isLoggedIn])