
export default function Pagination({ currentPage, pageCount, onPageChange}) {
    return (
        <div className="pagination">
            <button className="pagination__previous-button" onClick={() => onPageChange(-1)}>o-- Previous</button>
            <span className="pagination__page-count">{currentPage} of {pageCount}</span>
            <button className="pagination__next-button" onClick={() => onPageChange(+1)}>Next --o</button>
        </div>
    )
}