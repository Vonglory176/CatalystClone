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
                                    <a href="!#">Cart</a>
                                </li>
                                <li className="footer__list-item">
                                    <a href="!#">My Account</a>
                                </li>
                                <li className="footer__list-item">
                                    <a href="!#">Logout</a>
                                </li>
                                <li className="footer__list-item">
                                    <a href="!#">Contact</a>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="flex__item">
                        <section className="footer__section">
                            <h4 className="h1 footer__section-title">Follow Us</h4>
                            <ul className="social-icons">
                                <li>
                                    <a href="!#">
                                        <i className="fa-brands fa-facebook-f fa-lg"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="!#">
                                        <i className="fa-brands fa-twitter fa-lg"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="!#">
                                        <i className="fa-brands fa-instagram fa-lg"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="!#">
                                        <i className="fa-brands fa-tumblr fa-lg"></i>
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <div className="page-width">            
                    <small>2023, MOCK RECREATION of the <a href="https://store.catalystgamelabs.com">Catalyst Game Labs Store</a> by Skyler Conley. <a href="https://activatorstudios.com/">Original design by Activator Studios.</a></small>
                </div>
            </div>
        </footer>
    )
}