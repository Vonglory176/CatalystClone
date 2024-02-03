import React, { useEffect } from 'react';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import { useSelector } from "react-redux";

import catalystLogo from "../assets/logo-catalyst2_450x.webp"
import { Link, NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Searchbar from './Searchbar';
// import auth from "../store/auth-slice";

export default function Header() {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

    //Offcanvas/Sidebar
    const [showSidebar, setShowSidebar] = useState(false)
    const handleClose = () => setShowSidebar(false)
    const toggleShowSidebar = () => setShowSidebar((s) => !s)
    
    //For dropdown menu in Offcanvas/Sidebar
    const [showUniverseSubMenu, setUniverseSubMenu] = useState(true)
    const toggleUniverseSubMenu = () => setUniverseSubMenu((s) => !s)
    const cartItems = useSelector(state => state.cart.cartItemList)

    //Sticky-Header 
    const [ref, inView] = useInView({threshold: 0}) //Observer
    const [isWideViewport, setIsWideViewport] = useState(window.innerWidth >= 750)
    const [isSticky, setIsSticky] = useState(false)

    // Update isWideViewport when the window is resized
    useEffect(() => {
        const handleResize = () => setIsWideViewport(window.innerWidth >= 750)

        window.addEventListener('resize', handleResize)
        
        return () => window.removeEventListener('resize', handleResize) // Clean up the event listener for unmounting
    }, [])

    useEffect(() => {
        let timeoutId;
        if (isWideViewport) timeoutId = setTimeout(() => {setIsSticky(true);}, 500) // Delay in milliseconds
        else setIsSticky(false)

        return () => clearTimeout(timeoutId) // Cleanup timeout if the component unmounts or the effect re-runs
    }, [isWideViewport])

    //For easy sharing between upper/sticky/offcanvas
    const searchbar = <Searchbar/>
    const cart = (
        <Link to={"/cart"} className={"store-btns__link store-btns__cart-link"}>
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
                        <img src={catalystLogo} className="company-logo__image" alt="Catalyst Game Labs Logo"/>
                    </Link>
                </div>

                <div className="store-btns">
                    {searchbar}
                    {cart}
                </div>

            </div>

            {/* Header lower */}
            <div className="header__lower-wrapper" ref={ref}>
                <div className={`header__lower ${inView || !isSticky ? '' : 'isSticky'}`}>
                    <div className="universe-dropdown dropdown">
                        {/* <Link to={"/collections/battletech"} reloadDocument>
                            <button className="header__sticky-dropdown-button btn">Universe</button>
                        </Link> */}

                        <button className="universe-dropdown__button dropdown-button">Universe<i className="fa-solid fa-caret-down"></i></button>
                        {/* {isFocused && ( */}
                            <div className="universe-dropdown__content dropdown-content">
                                <NavLink to={"/collections/all"}><h1>UNIVERSE</h1></NavLink>
                                <NavLink to={"/collections/battletech"} className={({isActive}) => {return isActive? "active-link" : ""}}>Battletech</NavLink>
                                <NavLink to={"/collections/shadowrun"} className={({isActive}) => {return isActive? "active-link" : ""}}>Shadowrun</NavLink>
                                <NavLink to={"/collections/other"} className={({isActive}) => {return isActive? "active-link" : ""}}>Other</NavLink>
                            </div>
                        {/* )} */}
                    </div>

                    {inView? //Determining what buttons to have

                    <div className="header__lower-links">
                        <Link to={"/account"} className={"account-link"}>Account</Link>
                        {isLoggedIn && <Link to={"/account/logout"} className={"logout-link"}>Log Out</Link>}
                    </div>

                    : 
                    
                    <div className="store-btns">
                        {searchbar}
                        {cart}
                    </div>}

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
                        <Link to={"/collections/all"} className={"offcanvas-link"}>Universe</Link>
                        <button className="offcanvas__universe-button" onClick={toggleUniverseSubMenu}>
                            <i className="fa-solid fa-plus fa-2x"></i>
                        </button>
                    </div>

                    <div className={`offcanvas-submenu ${showUniverseSubMenu? "hide-submenu" : "show-submenu"}`}>
                        <div className="offcanvas-submenu-container">
                            {/* <Link to={"/collections/battletech"} className={"offcanvas-submenu-link"}>Battletech</Link> reloadDocument
                            <Link to={"/collections/shadowrun"} className={"offcanvas-submenu-link"}>Shadowrun</Link> */}
                            <NavLink to={"/collections/battletech"} className={({isActive}) => {return isActive? "active-link offcanvas-submenu-link" : "offcanvas-submenu-link"}}>Battletech</NavLink>
                            <NavLink to={"/collections/shadowrun"} className={({isActive}) => {return isActive? "active-link offcanvas-submenu-link" : "offcanvas-submenu-link"}}>Shadowrun</NavLink>
                            <NavLink to={"/collections/other"} className={({isActive}) => {return isActive? "active-link offcanvas-submenu-link" : "offcanvas-submenu-link"}}>Other</NavLink>
                        </div>
                    </div>
                    
                    <Link to={"/account"} className={"offcanvas-link"}>Account</Link>
                    {isLoggedIn && <Link to={"/account/logout"} className={"offcanvas-link"}>Log Out</Link>}

                </Offcanvas.Body>
            </Offcanvas>
        </header>
    )
}