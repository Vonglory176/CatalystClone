import { Link } from "react-router-dom"
import clanInvasionBoxset from "../assets/featured-products/ClanInvasionBox.webp"

export default function ProductResult() {
    return (
        <Link to={"products"} className={"product-result"}>
            <div className="product-result__image-container">
                <img src={clanInvasionBoxset} alt="Clan Invasion Boxset" />
            </div>
            <div className="product-result__info">
                <div className="product-result__name">BattleTech: Clan Invasion</div>
                <div className="product-result__price">$49.99</div>
            </div>
        </Link>
    )
}

/* TO USE THIS YOU NEED..
    -Link
    -Picture
    -Name
    -Price
*/