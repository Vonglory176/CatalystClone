import React, { useEffect } from 'react';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import { useSelector } from "react-redux";

import catalystLogo from "../assets/logo-catalyst2_450x.webp"
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
// import auth from "../store/auth-slice";

export default function Header() {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

    //Offcanvas/Sidebar
    const [showSidebar, setShowSidebar] = useState(false);
    const handleClose = () => setShowSidebar(false);
    const toggleShowSidebar = () => setShowSidebar((s) => !s);
    
    //For dropdown menu in Offcanvas/Sidebar
    const [showUniverseSubMenu, setUniverseSubMenu] = useState(true)
    const toggleUniverseSubMenu = () => setUniverseSubMenu((s) => !s);
    const cartItems = useSelector(state => state.cart.cartItemList)

    //Sticky-Header Observer
    const [ref, inView] = useInView({
        threshold: 0
    })

    // State to store whether the viewport is wide
    const [isWideViewport, setIsWideViewport] = useState(window.innerWidth >= 750);

    // Update isWideViewport when the window is resized
    useEffect(() => {
        const handleResize = () => {
            setIsWideViewport(window.innerWidth >= 750);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const storeButtons = ( //For easy sharing between upper/sticky
    <div className="store-btns">

        <i className="fa-solid fa-magnifying-glass store-btns__search fa-lg"></i>

        <Link to={"/cart"} className={"store-btns__link store-btns__cart-link"}>
            <i className="fa-solid fa-cart-shopping store-btns__cart fa-lg"></i>
            {/* Cart-item idicator */}
            {cartItems.length > 0? <i className="fa-solid fa-circle store-btns__cart-notification fa-xs" style={{color:"#c2ca20"}}></i> : ""}
        </Link>

    </div>)

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

                {storeButtons}

            </div>

            {/* Header Sticky */}
            <div className="header__sticky-wrapper" ref={ref}>
                <div className={`header__sticky ${inView || !isWideViewport ? '' : 'sticky'}`}>
                    <div className="universe-dropdown dropdown">
                        {/* <Link to={"/collections/battletech"} reloadDocument>
                            <button className="header__sticky-dropdown-button btn">Universe</button>
                        </Link> */}

                        <button className="universe-dropdown__button dropdown-button">Universe<i class="fa-solid fa-caret-down"></i></button>
                        {/* {isFocused && ( */}
                            <div className="universe-dropdown__content dropdown-content">
                                <Link to={"/collections/all"}><h1>UNIVERSE</h1></Link>
                                <Link to={"/collections/battletech"}>Battletech</Link>
                                <Link to={"/collections/shadowrun"}>Shadowrun</Link>
                                <Link to={"/collections/other"}>Other</Link>
                            </div>
                        {/* )} */}
                    </div>

                    {inView? //Determining what buttons to have

                    <div className="header__sticky-links">
                        <Link to={"/account"} className={"account-link"}>Account</Link>
                        {isLoggedIn && <Link to={"/account/logout"} className={"logout-link"}>Log Out</Link>}
                    </div>

                    : storeButtons}

                </div>
            </div>

            {/* Side Nav */}
            <Offcanvas show={showSidebar} onHide={handleClose} backdrop={true}> {/*scroll={true}*/}

                <Offcanvas.Header > {/* closeButton */}
                    {/* <input type="text" className="offcanvas__searchbar"/> */}
                </Offcanvas.Header>

                <Offcanvas.Body>

                    <div className="offcanvas__universe">
                        <Link to={"!#"} className={"offcanvas-link"}>Universe</Link>
                        <button className="offcanvas__universe-button" onClick={toggleUniverseSubMenu}>
                            <i className="fa-solid fa-plus fa-2x"></i>
                        </button>
                    </div>

                    <div className={`offcanvas-submenu ${showUniverseSubMenu? "hide-submenu" : "show-submenu"}`}>
                        <div className="offcanvas-submenu-container">
                            <Link to={"/collections/battletech"} className={"offcanvas-submenu-link"} reloadDocument>Battletech</Link>
                            <Link to={"/collections/shadowrun"} className={"offcanvas-submenu-link"} reloadDocument>Shadowrun</Link>
                        </div>
                    </div>
                    
                    <Link to={"/account"} className={"offcanvas-link"}>Account</Link>
                    {isLoggedIn && <Link to={"/account/logout"} className={"offcanvas-link"}>Log Out</Link>}

                </Offcanvas.Body>
            </Offcanvas>
        </header>
    )
}