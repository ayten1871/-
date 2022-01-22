import React from 'react';
import Searching from '../Component/Shared/Searching';
import Paths from '../Component/Shared/Paths';
import Detail from '../Component/Shared/Detail';
import { Routes, Route } from 'react-router-dom';

function Restaurant({ category }) {

    return (

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Paths zhcategory="在地美食" category="restaurant" />
                            <Searching category={category} />
                        </>
                    }
                />
                <Route path=":id" element={<Detail category={category} />} />
            </Routes>

    );
}

export default Restaurant;
