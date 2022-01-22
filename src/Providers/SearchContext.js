import React, { createContext, useState, useEffect, useLayoutEffect } from 'react';
import axios from 'redaxios';
import getAuthorizationHeader from '../lib/getAuthorizationHeader';

export const SearchContext = createContext();

export const SearchProvider = (props) => {
    const [searchData, setSearchData] = useState();
    const [keyword, setKeyword] = useState('');
    const [city, setCity] = useState('Taipei');
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('');
    const [result, setResult] = useState(0);
    const [position, setPosition] = useState();
    //!可能會有bug
    const providerValues = React.useMemo(
        () => ({
            setKeyword,
            city,
            setCity,
            subject,
            setSubject,
            searchData,
            setSearchData,
            setCategory,
            result,
            setResult,
            position,
            setPosition,
        }),
        [searchData, result]
    );

    useEffect(() => {
        console.log(
            '>context:',
            keyword,
            'city:',
            city,
            'subject:',
            subject,
            'data:',
            searchData,
            'result:',
            result,
            'category:',
            category,
            'keyword:',
            keyword,
            'Position:',
            position
        );
        if (category && position) {
            fetchNearBy(category, position);
            // console.log("fetch nearby")
        } else if (category) {
            fetch(category, city, keyword, subject);
            //console.log('fetch all');
        }
    }, [category, keyword, city, position, subject]);

    async function fetch(category, city, keyword, subject) {
        let Name;
        switch (category) {
            case 'ScenicSpot':
                Name = 'ScenicSpotName';
                break;
            case 'Activity':
                Name = 'ActivityName';
                break;
            case 'Restaurant':
                Name = 'RestaurantName';
                break;
        }
        await axios
            .get(
                subject && category === 'ScenicSpot'
                    ? `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}/${city}?$filter=(Class1%20eq%20%20'${subject}'%20or%20Class2%20eq%20'${subject}'%20or%20Class3%20eq%20'${subject}'%20)and(Contains(${Name}%2C'${keyword}'))and(length(Picture%2FPictureUrl1)%20gt%201)&$top=50&$format=JSON`
                    : subject && category === 'Activity'
                    ? `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}/${city}?$filter=(Class1%20eq%20%20'${subject}'%20or%20Class2%20eq%20'${subject}'%20)and(Contains(${Name}%2C'${keyword}'))and(length(Picture%2FPictureUrl1)%20gt%201)&$top=50&$format=JSON`
                    : subject && category === 'Restaurant'
                    ? `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city}?$filter=(Class%20eq%20%20'${subject}')and(Contains(${Name}%2C'${keyword}'))and(length(Picture%2FPictureUrl1)%20gt%201)&$top=50&$format=JSON`
                    : `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}/${city}?$filter=contains(${Name},'${keyword}')%20and%20length(Picture%2FPictureUrl1)%20gt%201&$top=50&$format=JSON`,
                { headers: getAuthorizationHeader() }
            )
            .then(function (res) {
                setSearchData(res.data);
                //setResult(1);
                //setPosition(res.data.Position)
                //console.log(res.data,"postiton:",res.data[0].Position,"position",position);
            })

            .catch(function (error) {
                console.log('SearchContext', error);
            });
    }

    function fetchNearBy(category, position) {
        let lon = position.PositionLon;
        let lat = position.PositionLat;
        axios
            .get(
                `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?%24filter=length(Picture%2FPictureUrl1)%20gt%201&%24top=3&%24spatialFilter=nearby(${lat},${lon},2000)&%24format=JSON`,
                { headers: getAuthorizationHeader() }
            )
            .then(function (res) {
                setSearchData(res.data);
                setResult(1);
                //console.log('fetchNearBy', res.data);
            })
            .catch(function (error) {
                console.log('fetchNearBy in SearchContext', error);
            });
    }

    return (
        <SearchContext.Provider value={providerValues}>
            {props.children} {/*To wahtever child between these*/}
        </SearchContext.Provider>
    );
};
