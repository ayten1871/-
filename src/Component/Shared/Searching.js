import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { SearchContext } from '../../Providers/SearchContext';
import { Cities } from '../../lib/SharedLists';
import Subject from './Subject';
import Result from './Result';

export const StyledSearching = styled.div`
max-width:85vw;
margin: auto;
//border:1px green solid;
    .searching-area{
        //border:1px deeppink solid;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        flex-wrap:wrap;
         @media (max-width: 768px) {
             flex-direction:column;
         }
    }
    .searching-select {
        width: 14rem;
    }
    .searching-btn {
        width: 15rem;
    }
    .searching-input{
        width:35rem;
    }
    @media (max-width: 768px) {
        .searching-btn,
        .searching-select,
        .searching-input{
            width:100%;
            flex-grow:1;
            box-sizing:border-box;
            height:2.8rem;
        }
        label{
            width:100%;
        }
    }
    
}
`;
function Searching({ category }) {
    const props = useContext(SearchContext);
    const { city, keyword, setCity, setKeyword, setResult, setCategory, result, searchData } =
        props;

    const [tempCity, setTempCity] = useState('Taipei');
    const [tempKeyword, setTempKeyword] = useState('');
    const [showResult, setShowResult] = useState(result);

    //console.log('searching', category, 'result:', result, 'searchData:', searchData);
    useEffect(() => {
        setCategory(category);
    }, [result]);
    const updateKeyWord = (e) => {
        //console.log(e.target.value, 'keyward');
        setTempKeyword(e.target.value);
        setKeyword(e.target.value);
    };
    const updateCity = (e) => {
        //setCity(e.target.value);
        setTempCity(e.target.value);
        //console.log('city', city, 'tempcity', tempCity);
    };

    const submitScenicSpot = (e) => {
        //e.preventDefault();
        //setScenicSpot(keyword);
        //setPosition();
        setResult(1);
        setCity(tempCity);
        setKeyword(tempKeyword);
        //setShowResult((prevState) => prevState + 1);
    };
    // console.log('Search by city rendering', Citys);
    const Options = () => {
        return Cities.map((city, i) => {
            return (
                <option role="option" value={city[Object.keys(city)]} key={i}>
                    {Object.keys(city)}
                </option>
            );
        });
    };
    return (
        <>
            <StyledSearching>
                <form className="search-area searching-area">
                    <select
                        className="search-select searching-select"
                        role="listbox"
                        onChange={updateCity}
                        value={tempCity}
                    >
                        <Options />
                    </select>
                    <label>
                        <input
                            type="text"
                            className="search-input searching-input"
                            placeholder="你想去哪裡?請輸入關鍵字"
                            aria-label="Enter search text"
                            onChange={updateKeyWord}
                        />
                    </label>
                    <div
                        type="submit"
                        className="search-btn searching-btn"
                        onClick={submitScenicSpot}
                    >
                        <span className="search-btn-txt">搜尋</span>
                    </div>
                </form>
            </StyledSearching>
            {result < 1 ? (
                <Subject category={category} />
            ) : (
                <Result city={city} category={category} />
            )}
        </>
    );
}

export default Searching;
