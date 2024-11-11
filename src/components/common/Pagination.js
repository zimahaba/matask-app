import { useEffect, useState } from "react";

const Pagination = ({ pageResult, onChange, elementName }) => {
    const [pageNumbers, setPageNumbers] = useState([])
    const { totalPages, currentPage, size, totalElements } = pageResult;
    const [firstItem, setFirstItem] = useState()
    const [lastItem, setLastItem] = useState()
    
    useEffect(() => {
        updatePagination(totalPages, currentPage)
        setFirstItem((size * currentPage) - (size -1 ))
        if (currentPage === totalPages) {
            setLastItem(totalElements)
        } else {
            setLastItem(size * currentPage)
        }
    }, [pageResult])

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

    const handlePaginationChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onChange('page', page)
        }
    }

    const handleSizeChange = (e) => {
        onChange('size', e.target.value)
    }

    return (
        <div className="d-flex justify-content-between align-items-center my-3">
            <div>
                <span style={{color: '#183758'}}>Showing {firstItem} to {lastItem} of <b>{pageResult.totalElements}</b> {elementName}.</span>
            </div>

            <div className="d-flex justify-content-center">
                <button className="btn primary-button-outline me-2" onClick={() => handlePaginationChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {pageNumbers.map((page, index) => page === '...' ? 
                    (<span key={index} className="mx-2">...</span>) : 
                    (
                        <button key={index} className={`btn mx-1 primary-button-outline ${page === currentPage ? 'active' : ''}`} onClick={() => handlePaginationChange(page)}>
                            {page}
                        </button>
                    )
                )}
                <button className="btn primary-button-outline ms-2" onClick={() => handlePaginationChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            <div className="d-flex align-items-center">
                <span className="me-2" style={{ whiteSpace: 'nowrap', color: '#183758' }}>Rows per page:</span>
                <select className="form-select select-1" onChange={handleSizeChange}>
                    <option value={10} selected={size === 10}>10</option>
                    <option value={20} selected={size === 20}>20</option>
                    <option value={50} selected={size === 50}>50</option>
                </select>
            </div>


        </div>
    );
}

export default Pagination;