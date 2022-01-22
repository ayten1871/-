import React, { useEffect, useState } from 'react';
import getAuthorizationHeader from '../lib/getAuthorizationHeader';
import axios from 'redaxios';
import Row from './Shared/Row';

const TagSpot = () => {
    const [data, setData] = useState([]);
    const cardAmount = 4;

    useEffect(() => {
        axios
            .get(
                `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=ScenicSpotName%2CScenicSpotID%2C%20Picture%2CAddress&$top=${cardAmount}&$format=JSON
                  `,
                { headers: getAuthorizationHeader() }
            )
            .then(function (res) {
                const thisData = res.data;
                setData(res.data);
                //console.log('TagSpot', res.data);
            })
            .catch(function (error) {
                console.log('TagSpot', error);
            });
    }, []);

    return <Row title="熱門打卡景點" seeMore="查看更多景點" data={data} category="ScenicSpot" />;
};

export default TagSpot;
