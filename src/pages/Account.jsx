import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"

export default function Account() {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

    //If not logged in, redirect to Login page ("replace" so back button works)
    if (!isLoggedIn) return <Navigate to="login" replace/>

    return (
        <div id="Account-Container">
            <div className="content-block">
                <h1>My Account</h1>
                <p className="account__continue">
                    <Link to={"/"} className={"btn"}>My Downloadable Files</Link> {/* Note "All" */}
                </p>
                <p className="account__continue">
                    <Link to={"/"} className={"btn"}>Manage My Membership</Link> {/* Note "All" */}
                </p>

                <h2>Order History</h2>
                <p>You haven't placed any orders yet.</p>
            </div>
            <div className="content-block">
                <h3>Account Details</h3>
                <p>First Last <br/> Country</p>
                <a href="!#">View Addreses (X)</a>
            </div>
        </div>
    )
}