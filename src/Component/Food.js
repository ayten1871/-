import React, { useEffect, useState } from 'react';
import getAuthorizationHeader from '../lib/getAuthorizationHeader';
import axios from 'redaxios';
import Row from './Shared/Row';

const Food = () => {
    const [data, setData] = useState([]);
    const cardAmount = 4;

    useEffect(() => {
        axios
            .get(
                `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?%24select=RestaurantName%2CRestaurantID%2CPicture%2CAddress&%24top=${cardAmount}&%24format=JSON
                  `,
                { headers: getAuthorizationHeader() }
            )
            .then(function (res) {
                const thisData = res.data;
                setData(res.data);
                //console.log('Restaurant', res.data);
            })
            .catch(function (error) {
                console.log('Restaurant', error);
            });
    }, []);

    return <Row title="一再回訪美食" seeMore="查看更多美食" data={data} category="Restaurant" />;
};

export default Food;
