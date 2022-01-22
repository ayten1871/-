import React, { useContext, useState } from 'react';
import { SearchContext } from '../Providers/SearchContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const props = useContext(SearchContext);
    const navigate = useNavigate();
    const [category, setCategory] = useState('scenicspot');
    const [tempKeyword, setTempKeyword] = useState('');
    const { keyword, setKeyword, setResult } = props;

    const updateCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
        //console.log('category in search', e.target.value, category);
    };
    const updateKeyWord = (e) => {
        e.preventDefault();
        //console.log('keyword in search', e.target.value, tempKeyword);
        setTempKeyword(e.target.value);
        setKeyword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setResult((prevState) => prevState + 1);
        setKeyword(tempKeyword);
        navigate(`/${category}`);
    };

    //console.log('Searching rendering', category, keyword);
    return (
        <div className="search">
            <span className="search-left">
                <h2 className="search-title">
                    探索<span className="search-title-underline">台灣之美</span>
                    <br />
                    讓我們更親近這片土地
                </h2>
                <h3 className="search-guide">台灣旅遊景點導覽 Taiwan Travel Guide</h3>
            </span>
            <div className="search-right">
                <form className="search-area">
                    <select className="search-select" role="listbox" onChange={updateCategory}>
                        <option role="option" value="scenicspot">
                            探索景點
                        </option>
                        <option role="option" value="activity">
                            節慶活動
                        </option>
                        <option role="option" value="restaurant">
                            品嘗美食
                        </option>
                    </select>
                    <label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="你想去哪裡?請輸入關鍵字"
                            aria-label="Enter search text"
                            onChange={updateKeyWord}
                        />
                    </label>
                    <div type="submit" className="search-btn" onClick={handleSubmit}>
                        <span className="search-btn-txt">搜尋</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Search;
