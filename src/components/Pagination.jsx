import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function Pagination({resultsPerPage, localProductList, paginationCallback}) {
    // console.log("IN PAGINATION")
    const [searchParams, setSearchParams] = useSearchParams({})

    const initialPage = parseInt(searchParams.get('page'))
    const [currentPage, setCurrentPage] = useState(initialPage? initialPage : 1)

    const pageCount = localProductList && localProductList.length > 0? Math.ceil(localProductList.length / resultsPerPage) : 1

    //For next/prev buttons
    const handlePageChange = (direction) => {
        const newPage = currentPage + direction
    
        if (newPage >= 1 && newPage <= pageCount) {
            setCurrentPage(newPage)
            setSearchParams(prevSearch => {
                prevSearch.set('page', newPage)
                return prevSearch;
            })            
        }
    }

    //For standard list return/renders
    useEffect(() => {
        if (localProductList) {
            const currentPageItems = localProductList.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
            setCurrentPage(parseInt(searchParams.get('page')))
            paginationCallback(currentPageItems)
        }
    }, [localProductList]) //searchParams

    return (
        <div className="pagination">
            <button className="pagination__previous-button" onClick={() => handlePageChange(-1)}>o-- Previous</button>
            <span className="pagination__page-count">{currentPage} of {pageCount}</span>
            <button className="pagination__next-button" onClick={() => handlePageChange(+1)}>Next --o</button>
        </div>
    )
}