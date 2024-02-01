export default function getProductUniverse(product) {
    if (product.universe === "shadowrun") return "Shadowrun: "
    if (product.universe === "battletech") return "BattleTech: "
    if (product.universe === "other") return ""
    
    else alert("Universe could not be found!")
}