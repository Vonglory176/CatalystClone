import clanInvasionBoxset from "../assets/featured-products/ClanInvasionBox.webp"

export default function ProductCard() {
    return (
        <a href="!#" className="product-card">
            <div className="product-card__image-container">
                <div className="product-card__image-wrapper">
                    <div className="product-card__image">
                        {/* Padding top div? */}
                        <img src={clanInvasionBoxset} alt="Clan Invasion Boxset" />
                    </div>
                </div>
            </div>
            <div className="product-card__info">
                <div className="product-card__name">BattleTech: Clan Invasion</div>
                <div className="product-name__price">$49.99</div>
            </div>
            <div className="product-card__overlay">
                <span className="btn product-card__overlay-btn">View</span>
            </div>
        </a>
    )
}

/* TO USE THIS YOU NEED..
    -Link
    -Picture
    -Name
    -Price
*/

/* <a href="!#" className="product-card">
    <div className="product-card__image-container">
        <div className="product-card__image-wrapper">
            <div className="product-card__image">
                <img src={clanInvasionBoxset} alt="Clan Invasion Boxset" />
            </div>
        </div>
    </div>
    <div className="product-card__info">
        <div className="product-card__name"></div>
        <div className="product-name__price"></div>
    </div>
    <div className="produt-card__overlay">
        <span className="btn product-card__overlay-btn"></span>
    </div>
</a> */