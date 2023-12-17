import ProductCard from "../components/ProductCard"
import MailListSignUp from "../components/MailListSignUp"

import gettingStartedBattletech from "../assets/getting-started/getting-started-battletech.webp"
import gettingStartedShadowrun from "../assets/getting-started/getting-started-shadowrun.webp"

import fpFrame1 from "../assets/featured-products/featured-product-frame-1.svg"
import fpFrame2 from "../assets/featured-products/featured-product-frame-2.svg"
import fpFrame3 from "../assets/featured-products/featured-product-frame-3.svg"
import fpFrame4 from "../assets/featured-products/featured-product-frame-4.svg"

import featuredCharacterVictor from "../assets/featured-products/featured-character-victor.webp"
import featuredCharacterCombatMage from "../assets/featured-products/featured-character-combatMage.webp"

import saleButton from "../assets/featured-products/button-collection/collection-buttons-01.webp"
import newArrivalsButton from "../assets/featured-products/button-collection/collection-buttons-02.webp"
import freeDownloadButton from "../assets/featured-products/button-collection/collection-buttons-03.webp"

export default function Home() {
    return (
        <div id="Home-Container">
            
            <div className="getting-started">
                <a href="!#" className="getting-started__link">
                    <img className="getting-started__button" src={gettingStartedBattletech} alt="Get started with Battletech"/>
                </a>
                <a href="!#" className="getting-started__link">
                    <img className="getting-started__button" src={gettingStartedShadowrun} alt="Get started with Shadowrun"/>
                </a>
            </div>

            <div className="featured-products">
                <a href="!#">
                    <div className="featured-product-banner"></div>
                </a>

                <section className="section-block"> {/* MAKE THIS A COMPONENT !!! */}
                    <a href="!#" className="collection-link">
                        <img src={fpFrame1} alt="" className="featured-product-frame" />
                    </a>

                    <div className="grid collection">
                        <a href="!#" className="collection-link"></a>

                        <div className="grid__item collection__cover">
                            <a href="!#" className="collection-link"></a>
                            <a href="!#" className="collection-card">                                                        
                                <div className="collection-card__meta">
                                    <p className="collection-card__title h1">Featured Products</p>
                                    <p className="collection-card__subtext">View all</p>
                                </div>
                            </a>
                        </div>

                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                    </div>
                </section>
                <section className="section-block left"> {/* MAKE THIS A COMPONENT !!! */}
                    <a href="!#" className="collection-link">
                        <img src={fpFrame2} alt="" className="featured-product-frame" />
                    </a>
                    <div className="featured-character">
                        <img src={featuredCharacterVictor} alt="" />
                    </div>

                    <div className="grid collection">
                        <a href="!#" className="collection-link"></a>

                        <div className="grid__item collection__cover">
                            <a href="!#" className="collection-link"></a>
                            <a href="!#" className="collection-card">                                                        
                                <div className="collection-card__meta">
                                    <p className="collection-card__title h1">Featured Products</p>
                                    <p className="collection-card__subtext">View all</p>
                                </div>
                            </a>
                        </div>

                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>                                                  
                    </div>
                </section>

                <section className="section-block right"> {/* MAKE THIS A COMPONENT !!! */}
                    <a href="!#" className="collection-link">
                        <img src={fpFrame3} alt="" className="featured-product-frame" />
                    </a>
                    <div className="featured-character">
                        <img src={featuredCharacterCombatMage} alt="" />
                    </div>                                                  

                    <div className="grid collection">
                        <a href="!#" className="collection-link"></a>

                        <div className="grid__item collection__cover">
                            <a href="!#" className="collection-link"></a>
                            <a href="!#" className="collection-card">                                                        
                                <div className="collection-card__meta">
                                    <p className="collection-card__title h1">Featured Products</p>
                                    <p className="collection-card__subtext">View all</p>
                                </div>
                            </a>
                        </div>

                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                    </div>
                </section>

                <section className="collection-buttons-container">
                    <div className="collection-buttons-wrapper">
                        <a href="!#">
                            <img src={saleButton} alt="" className="collection-button" />
                        </a>
                        <a href="!#">
                            <img src={newArrivalsButton} alt="" className="collection-button" />
                        </a>
                        <a href="!#">
                            <img src={freeDownloadButton} alt="" className="collection-button" />
                        </a>
                    </div>
                </section>

                <section className="section-block left"> {/* MAKE THIS A COMPONENT !!! */}
                    <a href="!#" className="collection-link">
                        <img src={fpFrame4} alt="" className="featured-product-frame" />
                    </a>                                             

                    <div className="grid collection">
                        <a href="!#" className="collection-link"></a>

                        <div className="grid__item collection__cover">
                            <a href="!#" className="collection-link"></a>
                            <a href="!#" className="collection-card">                                                        
                                <div className="collection-card__meta">
                                    <p className="collection-card__title h1">Featured Products</p>
                                    <p className="collection-card__subtext">View all</p>
                                </div>
                            </a>
                        </div>

                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                        <div className="grid__item">
                            <ProductCard/>
                        </div>
                    </div>
                </section>

                <MailListSignUp/>
            </div>
        </div>                        
    )
}