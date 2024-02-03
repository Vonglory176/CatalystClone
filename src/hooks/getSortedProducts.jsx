import { useSearchParams } from "react-router-dom"

export const getSortedProducts = (e, listToSort) => {
    const [searchParams, setSearchParams] = useSearchParams({})

    const sortBy = e.target.value
    const [method, order] = sortBy? sortBy.split(' ') : ["name", ""] // "name desc" becomes ["name", "desc"]
    console.log("IN SORTING!")

    let tempProductList = listToSort? [...listToSort] : [...localProductList]
    console.log(tempProductList)

    tempProductList.sort((a, b) => {
        let aValue, bValue

        // Determine the path to get the value
        if (method === "price") {
            aValue = a.props.product.variants['variant1'].price
            bValue = b.props.product.variants['variant1'].price
        } else { // Assume "name" if not "price"
            aValue = a.props.product[method]
            bValue = b.props.product[method]
        }

        // Convert to lowercase if the values are strings for case-insensitive sorting
        if (typeof aValue === 'string') aValue = aValue.toLowerCase()
        if (typeof bValue === 'string') bValue = bValue.toLowerCase()

        // Determine the order of sorting
        if (order === "desc") {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        } else { // Assume "asc" if not "desc"
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        }
    })    
    
    // Prepare the new parameters
    // const page = parseInt(searchParams.get('page')) //Reset page if needed
    
    const newParams = {
        ...Object.fromEntries(searchParams),
        sort_by: sortBy? sortBy : "name",
        // page: page? page : 1
    };

    // Update the search parameters
    replaceSearchParams(newParams);
    console.log("DONE SORTING!")
    
    //Returning sorted list
    return tempProductList
}