import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function Pagination({resultsPerPage, onChange, localProductList, paginationCallback}) {
    // console.log("IN PAGINATION")
    const [searchParams, setSearchParams] = useSearchParams({})

    const initialPage = parseInt(searchParams.get('page'))
    const [currentPage, setCurrentPage] = useState(initialPage? initialPage : 1)

    const pageCount = localProductList && localProductList.length > 0? Math.ceil(localProductList.length / resultsPerPage) : 1

    //For next/prev buttons
    const handlePageChange = (direction) => {
        const newPage = currentPage + direction
    
        if (newPage >= 1 && newPage <= pageCount) {
            if (onChange) { //Scrolling to top of given element
                const element = document.querySelector(onChange)
                const offset = window.innerWidth > 750? 60 : 10 // Define the offset
                const elementPosition = element.getBoundingClientRect().top + window.scrollY
                const offsetPosition = elementPosition - offset // Subtract the offset
    
                if (window.scrollY > elementPosition) {
                    window.scrollTo({
                        top: offsetPosition,
                    behavior: "smooth"
                })
            }
            }

            //Setting new page
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
    }, [localProductList, searchParams]) //searchParams

    return (
        <div className="pagination">
            <button className="pagination__previous-button" onClick={() => handlePageChange(-1)}>Previous</button>
            <span className="pagination__page-count">{currentPage || 1} of {pageCount || 1}</span>
            <button className="pagination__next-button" onClick={() => handlePageChange(+1)}>Next</button>
        </div>
    )
}