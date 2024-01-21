const checkVariantsForPriceDifferences = (variantArray) => {
    let samePrice = true
    for (variantIndex in variantArray) { //Are there multiple prices?
        if (variantArray[variantIndex].price !== variantPrice) {
            samePrice = false
            break
        }
    }
    return samePrice
}

export default checkVariantsForPriceDifferences