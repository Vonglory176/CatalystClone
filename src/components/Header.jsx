import React from 'react';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import { useSelector } from "react-redux";

import catalystLogo from "../assets/logo-catalyst2_450x.webp"
import { Link } from 'react-router-dom';
// import auth from "../store/auth-slice";

export default function Header() {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

    //Offcanvas/Sidebar
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    
    const [showUniverseSubMenu, setUniverseSubMenu] = useState(true)
    const toggleUniverseSubMenu = () => setUniverseSubMenu((s) => !s);

    return (
        <header className="header">

            {/* Header Upper */}

            <div className="header__upper">
                <div className="nav-btn">
                    <button onClick={toggleShow}>
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

                    <i className="fa-solid fa-magnifying-glass store-btns__search fa-lg"></i>

                    <Link to={"/cart"} className={"store-btns__link"}>
                        <i className="fa-solid fa-cart-shopping store-btns__cart fa-lg"></i>
                    </Link>
                </div>
            </div>

            {/* Header Sticky */}

            <div className="header__sticky">
                <div className="header__sticky-dropdown">
                    <Link to={"/collections"}>
                        <button className="header__sticky-dropdown-button btn">Universe</button>
                    </Link>
                </div>
                <div className="header__sticky-links">
                    <Link to={"/account"} className={"account-link"}>Account</Link>
                    {isLoggedIn && <Link to={"/account/logout"} className={"logout-link"}>Log Out</Link>}
                </div>
            </div>

            {/* Side Nav */}

            <Offcanvas show={show} onHide={handleClose} backdrop={true}> {/*scroll={true}*/}

                <Offcanvas.Header closeButton>
                    <input type="text" className="offcanvas__searchbar"/>
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
                            <Link to={"/collections/battletech"} className={"offcanvas-submenu-link"}>Battletech</Link>
                            <Link to={"/collections/shadowrun"} className={"offcanvas-submenu-link"}>Shadowrun</Link>
                        </div>
                    </div>
                    
                    <Link to={"/account"} className={"offcanvas-link"}>Account</Link>
                    {isLoggedIn && <Link to={"/account/logout"} className={"offcanvas-link"}>Log Out</Link>}

                </Offcanvas.Body>
            </Offcanvas>
        </header>
    )
}