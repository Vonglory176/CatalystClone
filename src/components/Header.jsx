import { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useSelector } from "react-redux"
import { Link, NavLink } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import Searchbar from './Searchbar'
// import catalystLogo from "../assets/logo-catalyst2_450x.webp"
import { useLocation } from "react-router-dom"
import ProgressiveImage from 'react-progressive-image'

export default function Header() {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)
    const notification = useSelector(state => state.ui.notification)
    const location = useLocation()

    //Offcanvas/Sidebar
    const [showSidebar, setShowSidebar] = useState(false)
    const handleClose = () => setShowSidebar(false)
    const toggleShowSidebar = () => setShowSidebar((s) => !s)
    
    //For dropdown menu in Offcanvas/Sidebar
    const [showUniverseSubMenu, setUniverseSubMenu] = useState(true)
    const toggleUniverseSubMenu = () => setUniverseSubMenu((s) => !s)
    const cartItems = useSelector(state => state.cart.cartItemList)

    //Sticky-Header 
    const [ref, inView, entry] = useInView({threshold: 0}) //Observer
    const [isWideViewport, setIsWideViewport] = useState(window.innerWidth >= 750) // 
    const [isSticky, setIsSticky] = useState(false)
    const [isInViewInitialized, setIsInViewInitialized] = useState(false)

    useEffect(() => {
        if (entry) { // Once the entry is available, it means useInView has an initial value
            setIsInViewInitialized(true)
        }
    }, [entry]) // Depend on entry to set the flag

    // Update isWideViewport when the window is resized
    useEffect(() => {
        const handleResize = () => setIsWideViewport(window.innerWidth >= 0) // 750

        window.addEventListener('resize', handleResize)
        handleResize()
        
        return () => window.removeEventListener('resize', handleResize) // Clean up the event listener for unmounting
    }, [])

    useEffect(() => { //Prevents wonky pop-in on first render
        let timeoutId;
        if (isWideViewport) timeoutId = setTimeout(() => {setIsSticky(true);}, 500) // Delay in milliseconds
        else setIsSticky(false)

        return () => clearTimeout(timeoutId) // Cleanup timeout if the component unmounts or the effect re-runs
    }, [isWideViewport])

    //For easy sharing between upper/sticky/offcanvas
    const searchbar = <Searchbar/>
    const cart = (
        <Link to={"/cart"} className={"store-btns__link store-btns__cart-link"} title='View your cart'>
            <i className="fa-solid fa-cart-shopping store-btns__cart fa-lg"></i>
            {cartItems.length > 0? <i className="fa-solid fa-circle store-btns__cart-notification fa-xs" style={{color:"#c2ca20"}}></i> : ""}
        </Link>
    )

    return (
        <header className="header">

            {/* Header Upper */}
            <div className="header__upper">
                <div className="nav-btn">
                    <button onClick={toggleShowSidebar}>
                        <i className="fa-solid fa-bars nav-btn__burger fa-lg"></i>
                        {/* <i className="fa-solid fa-xmark"></i> */}
                    </button>
                </div>

                <div className="company-logo">
                    <Link to={"/"} className={"company-logo__link"}> {/* reloadDocument */}
                        <ProgressiveImage src={"https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/other%2Flogo-catalyst2_450x.webp?alt=media&token=453edf2c-5772-4c80-89ab-4a5f109767ff"}>
                            {(src, loading) => <img className={"company-logo__image " + (loading? "imgLoading" : "imgLoaded")} src={src} alt={"Catalyst Game Labs Logo"}/>}
                        </ProgressiveImage>
                    </Link>
                </div>

                <div className="store-btns">
                    {searchbar}
                    {cart}
                </div>

            </div>            
            {/* Header lower */}
            <div className="header__lower-wrapper" ref={ref}>
                {/* Sticky Nav */}
                <div className={`header__lower ${inView || !isSticky ? '' : 'isSticky'}`} style={{borderBottom: notification.open ? "none" : ""}}>

                    {/* Notification Banner */}
                    <div id="notification-banner" className={`header__notification header__notification-${notification?.type === "success"? "success" : "error"} ${notification.open? "isActive" : ""}`}> {/* ${notification? "isActive" : ""} */}
                        <div className="header__notification__inner">

                            {notification.link? 
                                <Link to={notification.link} className="header__notification__link">
                                    {/* <span className="header__notification__message-wrapper" style={{display: "flex"}}> */}
                                        <span className="header__notification__message">{notification.message}&nbsp;</span> 
                                        <span className="header__notification__message-link">{notification.linkMessage}</span>
                                    {/* </span> */}
                                </Link>

                                :

                                <p className="header__notification__message">{notification.message}</p>
                            }
                        </div>
                    </div>

                    <nav className="header__lower-nav">
                        <div className="universe-dropdown dropdown">
                            <button className="universe-dropdown__button dropdown-button">
                                Universe<i className="fa-solid fa-caret-down"></i>
                                <NavLink to={"/collections/all"} className={`universe-dropdown__button-link ${({isActive}) => {return isActive? "active-link" : ""}}`} title='View all products'/>
                            </button>
                            
                            <div className="universe-dropdown__content dropdown-content">
                                <h1>UNIVERSE</h1>
                                <NavLink to={"/collections/battletech"} className={({isActive}) => {return isActive? "active-link" : ""}} title='View products in the Battletech collection'>Battletech</NavLink>
                                <NavLink to={"/collections/shadowrun"} className={({isActive}) => {return isActive? "active-link" : ""}} title='View products in the Shadowrun collection'>Shadowrun</NavLink>
                                <NavLink to={"/collections/other"} className={({isActive}) => {return isActive? "active-link" : ""}} title="View products that aren't tied to a collection">Other</NavLink>
                            </div>
                        </div>
                        {isInViewInitialized && (inView? //Determining what buttons to have

                        <div className="header__lower-nav-links">
                            <NavLink to={isLoggedIn? "/account" : "/account/login"} className={"account-link"} title={isLoggedIn? "View your account" : "Log into or create an account"}>Account</NavLink>
                            {isLoggedIn && <NavLink to={"/account/logout"} state={{ from: location.pathname + location.search }} title="Logout the current User" className={"logout-link"}>Log Out</NavLink>}
                        </div>

                        :

                        <div className="store-btns">
                            {searchbar}
                            {cart}
                        </div>
                        )}
                    </nav>
                </div>
            </div>

            {/* Side Nav */}
            <Offcanvas className="offcanvas-nav" show={showSidebar} onHide={handleClose} backdrop={true} scroll={true}> {/*scroll={true}*/}

                <Offcanvas.Header closeButton> {/*  */}
                    {/* <input type="text" className="offcanvas__searchbar"/> */}
                    {searchbar}
                </Offcanvas.Header>

                <Offcanvas.Body>

                    <div className="offcanvas__universe">
                        <Link to={"/collections/all"} className={"offcanvas-link"} title='View all products'>Universe</Link>
                        <button className="offcanvas__universe-button" onClick={toggleUniverseSubMenu}>
                            <i className={`fa-solid fa-plus fa-2x ${!showUniverseSubMenu? "rotateIcon" : ""}`}></i>
                        </button>
                    </div>

                    <div className={`offcanvas-submenu ${showUniverseSubMenu? "hide-submenu" : "show-submenu"}`}>
                        <div className="offcanvas-submenu-container">
                            {/* <Link to={"/collections/battletech"} className={"offcanvas-submenu-link"}>Battletech</Link> reloadDocument
                            <Link to={"/collections/shadowrun"} className={"offcanvas-submenu-link"}>Shadowrun</Link> */}
                            <NavLink to={"/collections/battletech"} className={({isActive}) => {return isActive? "active-link offcanvas-submenu-link" : "offcanvas-submenu-link"}} title='View products in the Battletech collection'>Battletech</NavLink>
                            <NavLink to={"/collections/shadowrun"} className={({isActive}) => {return isActive? "active-link offcanvas-submenu-link" : "offcanvas-submenu-link"}} title='View products in the Shadowrun collection'>Shadowrun</NavLink>
                            <NavLink to={"/collections/other"} className={({isActive}) => {return isActive? "active-link offcanvas-submenu-link" : "offcanvas-submenu-link"}} title="View products that aren't tied to a collection">Other</NavLink>
                        </div>
                    </div>
                    
                    {/* <Link to={"/account"} className={"offcanvas-link"}>Account</Link> */}
                    <NavLink to={isLoggedIn? "/account" : "/account/login"} className={"offcanvas-link"} title={isLoggedIn? "View your account" : "Log into or create an account"}>Account</NavLink>
                    {isLoggedIn && <Link to={"/account/logout"} className={"offcanvas-link"} title='Logout the current user'>Log Out</Link>}

                </Offcanvas.Body>
            </Offcanvas>
        </header>
    )
}