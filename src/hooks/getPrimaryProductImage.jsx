//Deciding wether to use variant/product picture
const getPrimaryProductImage = (product) => {
    // Variants have images? 
    const variant = Object.values(product.variants).find(variant => variant.isPrimaryVariant)
    return product.variantsHaveImages? variant.images["image1"] : product.images["image1"] //Deciding wether to use variant/product picture       
}
export default getPrimaryProductImage

// product / variant primary image?