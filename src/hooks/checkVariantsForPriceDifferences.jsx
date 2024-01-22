const checkVariantsForPriceDifferences = (variantArray) => {
    let samePrice = true
    for (let i in variantArray) { //Are there multiple prices?
        if (variantArray[i].price !== variantArray[0].price) {
            samePrice = false
            break
        }
    }
    return samePrice
}

export default checkVariantsForPriceDifferences