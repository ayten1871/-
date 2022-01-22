import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SearchContext } from '../../Providers/SearchContext';
//import { CitiesZh } from '../../lib/SharedLists';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import ResultItems from './ResultItems';
export const StyledResult = styled.section`
    max-width: 90vw;
    margin: auto;
    .result-title-container {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }
    .result-title {
        margin-top: 1rem;
        font-size: 2.2rem;
    }
    .result-amount {
        margin-left: 0.5rem;
        font-size: 1.1rem;
    }
    .result-amount-num {
        color: #bea363;
    }
    .result-content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
    }
    .result-card {
        margin: 1rem 1rem 0 0;
    }
    .result-card-title {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 1.2rem;
        width: 16rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media (max-width: 768px) {
            width: 90vw;
        }
    }
    .result-card-img {
        width: 16rem;
        height: 12.5rem;
        object-fit: cover;
        border-radius: 20px;
        @media (max-width: 768px) {
            width: 90vw;
        }
    }
    .result-card-img:hover {
        cursor: pointer;
    }
    .no-result-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
    }
    .no-result-img {
        height: 80px;
        width: 80px;
        background-color: rgba(127, 151, 123, 0.2);
        border-radius: 50%;
    }
    .no-result-img::after {
        content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMiIGhlaWdodD0iNzEiIHZpZXdCb3g9IjAgMCA3MyA3MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zLjUzOTA2IDcwLjE5OTlINDkuMzUzNUM1MS4xNTc4IDcwLjE5OTkgNTIuNjI2IDY4LjczMDUgNTIuNjI2IDY2LjkyNDlWNTAuNTQ5OUM1Mi42MjYgNTAuNTI4MSA1Mi42MTUxIDUwLjUxMDYgNTIuNjEyOSA1MC40ODg4QzUyLjczMjkgNTAuNDEyNCA1Mi44NTczIDUwLjM0MDMgNTIuOTc1MSA1MC4yNTk1TDcwLjM5NzcgNjcuNjk1NkM3MC40OTgxIDY3LjggNzAuNjE4NCA2Ny44ODM0IDcwLjc1MTQgNjcuOTQwOEM3MC44ODQ0IDY3Ljk5ODEgNzEuMDI3NSA2OC4wMjg1IDcxLjE3MjMgNjguMDI5OUM3MS4zMTcxIDY4LjAzMTQgNzEuNDYwOCA2OC4wMDQgNzEuNTk1IDY3Ljk0OTNDNzEuNzI5MSA2Ny44OTQ2IDcxLjg1MSA2Ny44MTM3IDcxLjk1MzUgNjcuNzExM0M3Mi4wNTYxIDY3LjYwOSA3Mi4xMzczIDY3LjQ4NzIgNzIuMTkyMyA2Ny4zNTMxQzcyLjI0NzQgNjcuMjE5MSA3Mi4yNzUyIDY3LjA3NTMgNzIuMjc0MSA2Ni45MzA0QzcyLjI3MzEgNjYuNzg1NSA3Mi4yNDMyIDY2LjY0MjIgNzIuMTg2MiA2Ni41MDg5QzcyLjEyOTIgNjYuMzc1NiA3Mi4wNDYzIDY2LjI1NTEgNzEuOTQyMyA2Ni4xNTQyTDU0LjY3ODkgNDguODc3NUM1Ni4wOTU1IDQ3LjU1NDcgNTcuMjI1MyA0NS45NTQ3IDU3Ljk5OCA0NC4xNzY2QzU4Ljc3MDcgNDIuMzk4NiA1OS4xNyA0MC40ODA1IDU5LjE3MDkgMzguNTQxNkM1OS4xNjg4IDM2LjE1OTEgNTguNTY2OSAzMy44MTU2IDU3LjQyMDcgMzEuNzI3NUM1Ni4yNzQ1IDI5LjYzOTQgNTQuNjIxIDI3Ljg3NCA1Mi42MTI5IDI2LjU5NDRDNTIuNjE1MSAyNi41NzI2IDUyLjYyNiAyNi41NTUxIDUyLjYyNiAyNi41MzMzVjIxLjA3NDlDNTIuNjI2IDIxLjAzNzggNTIuNjA4NiAyMS4wMDcyIDUyLjYwNjQgMjAuOTcyM0M1Mi42MDIgMjAuOTIyMSA1Mi41ODg5IDIwLjg3ODQgNTIuNTc4IDIwLjgzMDRDNTIuNTQzOCAyMC42Nzg3IDUyLjQ3NjcgMjAuNTM2NCA1Mi4zODE3IDIwLjQxMzRDNTIuMzY2NCAyMC4zOTM3IDUyLjM2ODYgMjAuMzY5NyA1Mi4zNTMzIDIwLjM1MDFMMzQuOTAwMiAwLjcwMDA1MkMzNC44OTM2IDAuNjkzNTAyIDM0Ljg4NDkgMC42OTM1MDIgMzQuODc4NCAwLjY4Njk1MkMzNC43NDU1IDAuNTQ3MzM5IDM0LjU3NzQgMC40NDYyNTQgMzQuMzkxOCAwLjM5NDM4NUMzNC4zNTA0IDAuMzgxMjg1IDM0LjMxMzMgMC4zNzY5MTkgMzQuMjY5NyAwLjM3MDM2OUMzNC4yMDY0IDAuMzU5NDUyIDM0LjE0NzUgMC4zMzMyNTIgMzQuMDgyMSAwLjMzMzI1MkgzLjUzOTA2QzEuNzM0ODUgMC4zMzMyNTIgMC4yNjY2MDIgMS44MDI2NCAwLjI2NjYwMiAzLjYwODI1VjY2LjkyNDlDMC4yNjY2MDIgNjguNzMwNSAxLjczNDg1IDcwLjE5OTkgMy41MzkwNiA3MC4xOTk5Wk01Ni45ODkzIDM4LjU0MTZDNTYuOTg5MyA0NS4xNjM2IDUxLjYwNSA1MC41NDk5IDQ0Ljk5MDMgNTAuNTQ5OUMzOC4zNzU1IDUwLjU0OTkgMzIuOTkxMiA0NS4xNjM2IDMyLjk5MTIgMzguNTQxNkMzMi45OTEyIDMxLjkxOTUgMzguMzc1NSAyNi41MzMzIDQ0Ljk5MDMgMjYuNTMzM0M1MS42MDUgMjYuNTMzMyA1Ni45ODkzIDMxLjkxOTUgNTYuOTg5MyAzOC41NDE2Wk0zNS4xNzI5IDQuMjk2TDQ5LjEwNyAxOS45ODMzSDM2LjI2MzdDMzUuNzgzNyAxOS45ODMzIDM1LjE3MjkgMTkuMDY2MyAzNS4xNzI5IDE4LjM0NThWNC4yOTZaTTIuNDQ4MjQgMy42MDgyNUMyLjQ0ODI0IDMuMzE4NzIgMi41NjMxNyAzLjA0MTA1IDIuNzY3NzQgMi44MzYzM0MyLjk3MjMxIDIuNjMxNiAzLjI0OTc2IDIuNTE2NTkgMy41MzkwNiAyLjUxNjU5SDMyLjk5MTJWMTguMzQ1OEMzMi45OTEyIDIwLjExMjEgMzQuNDIwMiAyMi4xNjY2IDM2LjI2MzcgMjIuMTY2Nkg1MC40NDQ0VjI1LjQ0MzhDNDcuODA5MiAyNC4zNDA2IDQ0LjkwMTggMjQuMDYyOSA0Mi4xMDU3IDI0LjY0NzJDMzkuMzA5NiAyNS4yMzE0IDM2Ljc1NjIgMjYuNjUwMyAzNC43ODI0IDI4LjcxNjZIMTIuMjY1NkMxMS45NzYzIDI4LjcxNjYgMTEuNjk4OSAyOC44MzE2IDExLjQ5NDMgMjkuMDM2M0MxMS4yODk3IDI5LjI0MTEgMTEuMTc0OCAyOS41MTg3IDExLjE3NDggMjkuODA4M0MxMS4xNzQ4IDMwLjA5NzggMTEuMjg5NyAzMC4zNzU1IDExLjQ5NDMgMzAuNTgwMkMxMS42OTg5IDMwLjc4NDkgMTEuOTc2MyAzMC44OTk5IDEyLjI2NTYgMzAuODk5OUgzMy4wNjFDMzEuNzk2NyAzMi44NjY3IDMxLjA0MjQgMzUuMTE3OSAzMC44NjYzIDM3LjQ0OTlIMTIuMjY1NkMxMS45NzYzIDM3LjQ0OTkgMTEuNjk4OSAzNy41NjQ5IDExLjQ5NDMgMzcuNzY5N0MxMS4yODk3IDM3Ljk3NDQgMTEuMTc0OCAzOC4yNTIxIDExLjE3NDggMzguNTQxNkMxMS4xNzQ4IDM4LjgzMTEgMTEuMjg5NyAzOS4xMDg4IDExLjQ5NDMgMzkuMzEzNUMxMS42OTg5IDM5LjUxODIgMTEuOTc2MyAzOS42MzMzIDEyLjI2NTYgMzkuNjMzM0gzMC44NjQxQzMxLjA0MTMgNDEuOTY1IDMxLjc5NTUgNDQuMjE2IDMzLjA1ODkgNDYuMTgzM0gxMi4yNjU2QzExLjk3NjMgNDYuMTgzMyAxMS42OTg5IDQ2LjI5ODMgMTEuNDk0MyA0Ni41MDNDMTEuMjg5NyA0Ni43MDc3IDExLjE3NDggNDYuOTg1NCAxMS4xNzQ4IDQ3LjI3NDlDMTEuMTc0OCA0Ny41NjQ0IDExLjI4OTcgNDcuODQyMSAxMS40OTQzIDQ4LjA0NjhDMTEuNjk4OSA0OC4yNTE2IDExLjk3NjMgNDguMzY2NiAxMi4yNjU2IDQ4LjM2NjZIMzQuNjI3NUMzNC42NzMzIDQ4LjM2NjYgMzQuNzEyNSA0OC4zNDY5IDM0Ljc1ODQgNDguMzQwNEMzNi43MzE1IDUwLjQxNTQgMzkuMjg3OSA1MS44NDE2IDQyLjA4OSA1Mi40MzAzQzQ0Ljg5MDEgNTMuMDE5MSA0Ny44MDM4IDUyLjc0MjUgNTAuNDQ0NCA1MS42MzcyVjY2LjkyNDlDNTAuNDQ0NCA2Ny4yMTQ0IDUwLjMyOTQgNjcuNDkyMSA1MC4xMjQ5IDY3LjY5NjhDNDkuOTIwMyA2Ny45MDE2IDQ5LjY0MjkgNjguMDE2NiA0OS4zNTM1IDY4LjAxNjZIMy41MzkwNkMyLjkyODIgNjguMDE2NiAyLjQ0ODI0IDY3LjUzNjMgMi40NDgyNCA2Ni45MjQ5VjMuNjA4MjVaIiBmaWxsPSIjN0Y5NzdCIi8+DQo8L3N2Zz4NCg==');
    }
    .no-result-txt {
        margin-top: 1rem;
        color: #7f977b;
        font-weight: 700;
        font-size: 1.2rem;
        text-align: center;
    }
`;

function Result({ city, category }) {
    const props = useContext(SearchContext);
    const { searchData } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [resultPerPage] = useState(20);
    const [pageAmount] = useState(Math.ceil(searchData.length / resultPerPage));
    //console.log('Result rendering', searchData);
    const navigate = useNavigate();
    //Get current result
    const indexOfLastResult = currentPage * resultPerPage;
    const indexOfFirstResult = indexOfLastResult - resultPerPage;
    const currentResults = searchData.slice(indexOfFirstResult, indexOfLastResult);
    const NoResult = () => {
        return (
            <span className="no-result-content">
                <div className="no-result-img"></div>
                <p className="no-result-txt">
                    目前查無資料
                    <br />
                    請重新搜尋
                </p>
            </span>
        );
    };
    const ResultItems = () => {
        return currentResults.map((searchData) => {
            const {
                RestaurantName,
                ActivityName,
                ScenicSpotName,
                Picture,
                City,
                Address,
                RestaurantID,
                ActivityID,
                ScenicSpotID,
            } = searchData;

            let Name;
            let ID;
            switch (category) {
                case 'ScenicSpot':
                    Name = ScenicSpotName;
                    ID = ScenicSpotID;
                    break;
                case 'Activity':
                    Name = ActivityName;
                    ID = ActivityID;
                    break;
                case 'Restaurant':
                    Name = RestaurantName;
                    ID = RestaurantID;
                    break;
            }
            //const city = Address.slice(0, 3);
            //!部分地址格式以zip code開頭
            return (
                <div
                    className="result-card"
                    key={Name}
                    id={ID}
                    onClick={() => navigate(`/${category}/${ID}`)}
                >
                    <img className="result-card-img" src={Picture.PictureUrl1} alt={Name} />
                    <div className="result-card-content">
                        <h4 className="result-card-title">{Name}</h4>
                        {/* <p className="tagSpot-card-location">{CitiesZh[city]}</p> */}
                        <p className="tagSpot-card-location">{City ? City : Address.slice(0, 3)}</p>
                    </div>
                </div>
            );
        });
    };

    //const pagesAmount=Math.ceil(searchData.length / resultPerPage)
    const paginate = (num) => {
        if (num < 1 || num > pageAmount) {
            return null;
        }
        setCurrentPage(num);
    };

    return (
        <StyledResult>
            <span className="result-title-container">
                <h3 className="result-title">搜尋結果</h3>
                <p className="result-amount">
                    共有 <span className="result-amount-num">{searchData.length} </span>筆
                </p>
            </span>
            <span className="result-content">
                {searchData.length < 1 ? <NoResult /> : <ResultItems />}
                {/* {searchData.length < 1 ? <NoResult /> : <ResultItems currentResults={currentResults} category={ currentResults}/>} */}
            </span>
            {searchData.length > 20 && (
                <Pagination
                    resultAmount={searchData.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            )}
        </StyledResult>
    );
}

export default React.memo(Result);
