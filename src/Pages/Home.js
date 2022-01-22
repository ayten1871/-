import React from 'react';
import Search from '../Component/Search';
import Slide from '../Component/Slide';
import Current from '../Component/Current';
import TagSpot from '../Component/TagSpot';
import Food from '../Component/Food';
import { Routes, Route } from 'react-router-dom';
import Paths from '../Component/Shared/Paths';
import { SearchProvider, SearchContext } from '../Providers/SearchContext';
import Detail from '../Component/Shared/Detail';
import ScenicSpot from './ScenicSpot';
import Activity from './Activity';
import Restaurant from './Restaurant';

function Home() {
    return (
        <>
            {/* <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Paths zhcategory="探索景點" category="scenicspot" />
                            <Search />
                        </>
                    }
                />
                <Route path="/scenicspot" element={<ScenicSpot />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/restaurant" element={<Restaurant />} />
            </Routes> */}
            <Paths/>
            <Search />

            <Slide />
            <Current />
            <TagSpot />
            <Food />
        </>
    );
}

export default Home;
