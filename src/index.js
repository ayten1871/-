require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import Home from './Pages/Home';
import Detail from './Component/Shared/Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage';
import Header from './Component/Header';
import Footer from './Component/Footer';
import ScenicSpot from './Pages/ScenicSpot';
import Activity from './Pages/Activity';
import Restaurant from './Pages/Restaurant';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { SearchProvider, SearchContext } from './Providers/SearchContext';

const ele = document.getElementById('root');
ReactDOM.render(
    <SearchProvider>
        <BrowserRouter>
            {/* 在<BrowserRouter>內的元件會被每一頁共用 */}
            <Header />
            <Routes>
                <Route path="/*" element={<ErrorPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/scenicspot" element={<ScenicSpot category="ScenicSpot" />}>
                    <Route path="/scenicspot/*" element={<Detail />} />
                </Route>
                <Route path="/activity" element={<Activity category="Activity" />}>
                    <Route path="/activity/*" element={<Detail />} />
                </Route>
                <Route path="/restaurant" element={<Restaurant category="Restaurant" />}>
                    <Route path="/restaurant/*" element={<Detail />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    </SearchProvider>,
    ele
);
