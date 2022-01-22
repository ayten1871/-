import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../Providers/SearchContext';

const Header = () => {
    const [hasMenu, setHasMenu] = useState(false);
    const props = useContext(SearchContext);
    const { setResult, result, position, setPosition } = props;

    //console.log('Header rendering',"result",result);
    function linkTo() {
        if (result) {
            setResult(0);
        }
        if (position) {
            setPosition(null);
        }
    }
    return (
        <header>
            <span className="header-container">
                <Link to="/" className="logo-container">
                    <h1 className="logo" onClick={linkTo}>
                        台灣走走 Tai Walk
                    </h1>
                </Link>
                <ul className="header-menu">
                    <nav className={`${hasMenu ? 'nav-li-container-hasMenu' : 'nav-li-container'}`}>
                        <Link to="scenicspot">
                            <li
                                className="nav-li"
                                role="navigation"
                                aria-label="探索景點"
                                onClick={linkTo}
                            >
                                探索景點
                            </li>
                        </Link>

                        <Link to="activity">
                            <li
                                className="nav-li"
                                role="navigation"
                                aria-label="節慶活動"
                                onClick={linkTo}
                            >
                                節慶活動
                            </li>
                        </Link>
                        <Link to="restaurant">
                            <li
                                className="nav-li"
                                role="navigation"
                                aria-label=" 品嘗美食"
                                onClick={linkTo}
                            >
                                品嘗美食
                            </li>
                        </Link>
                    </nav>
                    <li className="nav-hamburger" onClick={() => setHasMenu((prev) => !prev)}>
                        <span
                            className={`${
                                hasMenu ? 'nav-hamburger-line-hasMenu' : 'nav-hamburger-line'
                            }`}
                        ></span>
                        <span
                            className={`${
                                hasMenu ? 'nav-hamburger-line-hasMenu' : 'nav-hamburger-line'
                            }`}
                        ></span>
                        <span
                            className={`${
                                hasMenu ? 'nav-hamburger-line-hasMenu' : 'nav-hamburger-line'
                            }`}
                        ></span>
                    </li>
                </ul>
            </span>
        </header>
    );
};

export default React.memo(Header);
