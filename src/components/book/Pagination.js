import { useEffect, useState } from "react";


const Pagination = props => {
    const [totalPages, setTotalPages] = useState(parseInt(props.page.totalPages))
    const [currentPage, setCurrentPage] = useState(parseInt(props.page.currentPage))
    const [pageNumbers, setPageNumbers] = useState([])
    const [size, setSize] = useState(parseInt(props.page.size))
    const [firstItem, setFirstItem] = useState()
    const [lastItem, setLastItem] = useState()
    
    /*useEffect(() => {
        updatePagination(totalPages, currentPage)
        setFirstItem((size * currentPage) - (size -1 ))
        setLastItem(size * currentPage)
    }, [currentPage])*/

    useEffect(() => {
        updatePagination(totalPages, currentPage)
        setFirstItem((size * currentPage) - (size -1 ))
        setLastItem(size * currentPage)
    }, [])

    const updatePagination = (totalPagesInt, currentPageInt) => {
        let pageNumbersTemp = [];

        pageNumbersTemp.push(1);
        if (totalPagesInt <= 7) {
            for (let i = 2; i <= totalPagesInt; i++) {
                pageNumbersTemp.push(i);
            }
        } else {
            let middlePages = []
            if (currentPageInt <= 5) {
                middlePages = [2, 3, 4, 5, 6]
            } else if (currentPageInt >= totalPagesInt - 4) {
                middlePages = [totalPagesInt - 5, totalPagesInt - 4, totalPagesInt - 3, totalPagesInt - 2, totalPagesInt - 1]
            } else {
                middlePages = [currentPageInt - 2, currentPageInt - 1, currentPageInt, currentPageInt + 1, currentPageInt + 2]
            }
            
            if (middlePages[0] !== 2) {
                pageNumbersTemp.push('...')
            }
            for (let i = 0; i <= 4; i++) {
                pageNumbersTemp.push(middlePages[i]);
            }
            if (middlePages[4] !== totalPagesInt - 1) {
                pageNumbersTemp.push('...')
            }

            pageNumbersTemp.push(totalPagesInt);
        }
        
        setPageNumbers(pageNumbersTemp)
    }

    return (
        <div className="d-flex justify-content-between align-items-center my-3">
            <div>
                <span>Showing {firstItem} to {lastItem} of <b>{props.page.totalElements}</b> books.</span>
            </div>

            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-primary me-2" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {pageNumbers.map((page, index) => page === '...' ? 
                    (<span key={index} className="mx-2">...</span>) : 
                    (
                        <button key={index} className={`btn btn-outline-primary ${page === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>
                            {page}
                        </button>
                    )
                )}
                <button className="btn btn-outline-primary ms-2" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            <div className="d-flex align-items-center">
                <span className="me-2" style={{ whiteSpace: 'nowrap' }}>Rows per page:</span>
                <select className="form-select">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>


        </div>
    );
}

export default Pagination;