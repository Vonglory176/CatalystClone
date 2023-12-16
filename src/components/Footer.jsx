import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="page-width">
                <div className="flex-footer">
                    <div className="flex__item">
                        <section className="footer__section">
                            <h4 className="h1 footer__section-title">Navigation</h4>
                            <ul className="footer__list">
                                <li className="footer__list-item">
                                    <Link to={"/cart"} className={""}>Cart</Link>
                                </li>
                                <li className="footer__list-item">
                                    <Link to={"/account/login"} className={""}>My Account</Link>
                                </li>
                                <li className="footer__list-item">
                                    <Link to={"/account/logout"} className={""}>Logout</Link>
                                </li>
                                <li className="footer__list-item">
                                    <Link to={"/contact"} className={""}>Contact</Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="flex__item">
                        <section className="footer__section">
                            <h4 className="h1 footer__section-title">Follow Us</h4>
                            <div className="social-icons">                                
                                <a href="!#">
                                    <i className="fa-brands fa-facebook-f fa-lg"></i>
                                </a>                            
                            
                                <a href="!#">
                                    <i className="fa-brands fa-twitter fa-lg"></i>
                                </a>                            
                            
                                <a href="!#">
                                    <i className="fa-brands fa-instagram fa-lg"></i>
                                </a>                            
                            
                                <a href="!#">
                                    <i className="fa-brands fa-tumblr fa-lg"></i>
                                </a>                                
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <div className="page-width">            
                    <small>2023, <a href="https://github.com/Vonglory176/CatalystClone">MOCK RECREATION</a> of the <a href="https://store.catalystgamelabs.com">Catalyst Game Labs Store</a> by Skyler Conley. <a href="https://activatorstudios.com/">Original design by Activator Studios.</a></small>
                </div>
            </div>
        </footer>
    )
}