export default function getProductLinkByNameAndVariant(productList, nameVariantString) {
    let [productName, variantName] = nameVariantString.split(" - ");
    let result = null;

    Object.keys(productList).forEach(category => {
        Object.values(productList[category]).forEach(product => {
            if (product.name === productName) {
                if (variantName) {
                    // If variantName is provided, find the matching variant
                    const variant = Object.values(product.variants).find(v => v.name === variantName);
                    if (variant) {
                        result = `${product.id}?variant=${variant.id}`;
                    }
                } else {
                    // If no variantName is provided, find the primary variant
                    const primaryVariant = Object.values(product.variants).find(v => v.isPrimaryVariant);
                    if (primaryVariant) {
                        result = `${product.id}?variant=${primaryVariant.id}`;
                    }
                }
            }
        });
    });

    if (result) {
        return result;
    } else {
        console.log(`ERROR! Product with name:(${productName}) and variant:(${variantName}) was not found`);
        return "/";
    }
}