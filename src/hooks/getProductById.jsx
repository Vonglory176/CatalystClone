export const getProductById = (productList, id) => {
    if (productList) {
        let product

        Object.keys(productList).forEach(category => { //For each Product Category

            const foundProduct = Object.values(productList[category]).find(p => p.id === id) //Try to find a Product with the ID
            if (foundProduct) product = foundProduct
        })
        
        if (product) {
            // console.log("Product Found!")
            // console.log(product)
            return product
        }

        console.log(`ERROR! Product with ID:(${id}) was not found`)
        return null
    }
}