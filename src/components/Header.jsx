import catalystLogo from "../assets/logo-catalyst2_450x.webp"

export default function Header() {
    return (
        <header className="header">
            <div className="header__upper">
                <div className="menu-btn">
                    <i className="fa-solid fa-bars menu-btn__burger"></i>
                    {/* <i className="fa-solid fa-xmark"></i> */}
                </div>

                <div className="company-logo">
                    <a href="!#" className="company-logo__link">
                        <img src={catalystLogo} className="company-logo__image" alt="Catalyst Game Labs Logo"/>
                    </a>
                </div>

                <div className="store-btn">
                    <i className="fa-solid fa-cart-shopping menu-btn__cart"></i>
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                </div>
            </div>
            {/* <div className="header-sticky"></div> */}
        </header>
    )
}