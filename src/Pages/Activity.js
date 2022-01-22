import React from 'react';
import Searching from '../Component/Shared/Searching';
import Paths from '../Component/Shared/Paths';
import Detail from '../Component/Shared/Detail';
import { Routes, Route } from 'react-router-dom';

function Activity({ category }) {

    return (
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Paths zhcategory="節慶活動" category="activity" />
                            <Searching category={category} />
                        </>
                    }
                />
                <Route path=":id" element={<Detail category={category} />} />
            </Routes>

    );
}

export default Activity;
