import { useDispatch } from "react-redux"
import { authActions } from "../store/auth-slice.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Logout() {    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authActions.logout())
        navigate("/")
    })

    return (
        <div id="Logout-Container">
            <div className="logout__empty">
                <h1>Logging Out...</h1>
                <hr />
                <p className="logout__continue">
                    <Link to={"/"} className={"btn"}>Continue browsing</Link> {/* Note "All" */}
                </p>
            </div>
        </div>
    )

}