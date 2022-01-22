import React from 'react';
import styled from 'styled-components';
export const StyledPagination = styled.div`
    width: 90vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pagination-ul {
        list-style: none;
        display: flex;
        flex-direction: row;
    }
    .pagination-li,
    .pagination-btn {
        height: 2rem;
        width: 2rem;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 5px;
        cursor: pointer;
    }
    .pagination-li {
        border: 1px solid #e5e5e5;
        color: #646464;
    }
    .pagination-btn {
        //color: rgba(127, 151, 123, 0.5);
        background-color: #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pagination-btn-prev,
    .pagination-btn-next {
        border-left: 2px solid rgba(127, 151, 123, 0.5);
        border-top: 2px solid rgba(127, 151, 123, 0.5);
        width: 0.4rem;
        height: 0.4rem;
    }
    .pagination-btn-prev {
        transform: rotate(314deg);
    }
    .pagination-btn-next {
        transform: rotate(137deg);
    }
    .pagination-li-active {
        color: #7f977b;
        border-color: #65895f;
    }
    .pagination-btn-active {
        background-color: #7f977b;
        .pagination-btn-next,
        .pagination-btn-prev {
            border-color: #f9f9f9;
        }
    }
`;

const Pagination = ({ resultAmount, paginate, currentPage }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(resultAmount / 20); i++) {
        pageNumber.push(i);
    }
    //console.log('pagation', pageNumber, 'resultAmount', resultAmount);
    return (
        <StyledPagination>
            <ul className="pagination-ul">
                <li
                    className={`pagination-btn ${currentPage > 1 && 'pagination-btn-active'}`}
                    onClick={() => paginate(currentPage - 1)}
                >
                    <span className="pagination-btn-prev"></span>
                </li>
                {pageNumber.map((num, i) => {
                    return (
                        <span key={i}>
                            <li
                                className={`pagination-li ${
                                    num === currentPage && 'pagination-li-active'
                                }`}
                                onClick={() => paginate(num)}
                            >
                                {num}
                            </li>
                        </span>
                    );
                })}
                <li
                    className={`pagination-btn ${
                        currentPage < pageNumber.length && 'pagination-btn-active'
                    }`}
                    onClick={() => paginate(currentPage + 1)}
                >
                    <span className="pagination-btn-next"></span>
                </li>
            </ul>
        </StyledPagination>
    );
};
export default React.memo(Pagination);
