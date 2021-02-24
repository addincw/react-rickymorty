import React from "react";

function Pagination(props) {
    const { currentPage, totalPage, onPrevious, onNext } = props

    return (
        <React.Fragment>
            <p className="has-text-centered mb-5"><span className="has-text-weight-bold">page</span> {currentPage}/{totalPage}</p>
            <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                <ul className="pagination-list" style={{ display: currentPage === totalPage ? 'none' : '' }}>
                    <li>
                        <button
                            className="pagination-link"
                            aria-label="Goto previous page"
                            onClick={() => onPrevious()}
                            disabled={currentPage === 1}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    </li>
                    <li>
                        <button className="pagination-link" aria-label="Goto next page" onClick={() => onNext()}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}

export default Pagination;