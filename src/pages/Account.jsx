import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function Account() {
    //If not logged in, redirect to Login page ("replace" so back button works)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    // if (!isLoggedIn) return <Navigate to="login" replace/>

    useEffect(() => {
        if (!isLoggedIn) navigate("login", {replace:true})
    }, [isLoggedIn])

    const user = useSelector(state => state.auth.user)

    const [address, setAddress] = useState(false)

    useEffect(() => {
        setAddress(user && user.addresses? user.addresses.find(address => address.isDefaultAddress) : false)
    }, [user])

    return (
        <div id="Addresses-Container">
            <div className="content-block">
                <h1>My Account</h1>
                <p className="account__continue">
                    <Link to={"/"} className={"btn"}>My Downloadable Files</Link> {/* Note "All" */}
                </p>
                {/* <p className="account__continue">
                    <Link to={"/"} className={"btn"}>Manage My Membership</Link>
                </p> */}

                <h2>Order History</h2>
                {user && user.orders?
                    user.orders : //CHANGE TO ITERATE AND PRINT HISTORY
                    <p>You haven't placed any orders yet.</p>
                }
            </div>

            <div className="content-block">
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
                <Link to={"addresses"} className="addresses-link">View Addreses ({address? user.addresses.length : 0})</Link>
            </div>
        </div>
    )
}