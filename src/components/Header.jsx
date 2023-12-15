import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import catalystLogo from "../assets/logo-catalyst2_450x.webp"

export default function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <header className="header">
            
            <Offcanvas show={show} onHide={handleClose} backdrop={true}> {/*scroll={true}*/}
                <Offcanvas.Header closeButton>
                    <input type="text" className="offcanvas__searchbar"/>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="offcanvas__universe">
                        <a href="!#" className="offcanvas-link">Universe</a>
                        <button className="offcanvas__universe-button"></button>
                    </div>
                    <a href="!#" className="offcanvas-link">Account</a>
                    <a href="!#" className="offcanvas-link">Log Out</a>
                </Offcanvas.Body>
            </Offcanvas>
            

            <div className="header__upper">
                <div className="menu-btn">
                    <button onClick={toggleShow}>
                        <i className="fa-solid fa-bars menu-btn__burger fa-lg"></i>
                        {/* <i className="fa-solid fa-xmark"></i> */}
                    </button>
                </div>

                <div className="company-logo">
                    <a href="!#" className="company-logo__link">
                        <img src={catalystLogo} className="company-logo__image" alt="Catalyst Game Labs Logo"/>
                    </a>
                </div>

                <div className="store-btn">
                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                    <i className="fa-solid fa-cart-shopping menu-btn__cart fa-lg"></i>
                </div>
            </div>

            <div className="header__sticky">
                <div className="header__sticky-dropdown">
                    <button className="header__sticky-dropdown-button btn">Universe</button>
                </div>
                <div className="header__sticky-links">
                    <a href="!#" className="account-link">Account</a>
                    <a href="!#" className="logout-link">Log Out</a>
                </div>
            </div>
        </header>
    )
}