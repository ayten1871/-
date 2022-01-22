import React, { useEffect, useState, useContext } from 'react';
import getAuthorizationHeader from '../../lib/getAuthorizationHeader';
import axios from 'redaxios';
import Row from './Row';
import Info from './Info';
import Map from '../Map';
import Paths from './Paths';
import { useParams, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Providers/SearchContext';

function Detail({ category }) {
    let { id } = useParams();
    const navigate = useNavigate();
    const props = useContext(SearchContext);
    const { setCategory, setPosition, setSearchData, setResult } = props;
    const [detailData, setDetailData] = useState([]);
    const [rowData, setRowData] = useState([]);

    let ID;
    switch (category) {
        case 'ScenicSpot':
            ID = 'ScenicSpotID';
            break;
        case 'Activity':
            ID = 'ActivityID';
            break;
        case 'Restaurant':
            ID = 'RestaurantID';
            break;
    }

    useEffect(() => {
        ID &&
            axios
                .get(
                    //picture is required
                    category === 'Restaurant'
                        ? `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?%24filter=${ID}%20eq%20'${id}'&%24top=1&%24format=JSON`
                        : `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?$filter=${ID}%20eq%20'${id}'&$top=1&$format=JSON
                `,

                    { headers: getAuthorizationHeader() }
                )
                .then(function (res) {
                    setDetailData(res.data);
                    //position
                    setPosition(res.data[0].Position);
                    fetchNearBy(category, res.data[0].Position);
                })
                .catch(function (error) {
                    console.log('Detail', error);
                });
        //rowData
        axios
            .get(
                //picture is required
                `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?$filter=%20Picture%2FPictureUrl1%20ne%20null&$top=4&$format=JSON`,
                { headers: getAuthorizationHeader() }
            )
            .then(function (res) {
                setRowData(res.data);
                //console.log("Detail",category,rowData)
            })
            .catch(function (error) {
                console.log('Detail', error);
            });
    }, [id]);

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
                const thisData = res.data;
                //console.log('fetchNearBy', res.data);
            })

            .catch(function (error) {
                console.log('Detail', error);
            });
    }

    let zhCategory;
    switch (category) {
        case 'ScenicSpot':
            zhCategory = '旅遊景點';
            break;
        case 'Activity':
            zhCategory = '節慶活動';
            break;
        case 'Restaurant':
            zhCategory = '在地美食';
            break;
    }

    const Details = detailData.map((data, i) => {
        const {
            RestaurantName,
            ActivityName,
            ScenicSpotName,
            RestaurantID,
            ActivityID,
            ScenicSpotID,
            Picture,
            DescriptionDetail,
            Description,
            Class1,
            Class,
            Position,
            Address,
            City,
        } = data;
        let city;
        let Name;
        let ID;
        switch (category) {
            case 'ScenicSpot':
                Name = ScenicSpotName;
                ID = ScenicSpotID;
                break;
            case 'Activity':
                Name = ActivityName;
                ID = ActivityID;
                break;
            case 'Restaurant':
                Name = RestaurantName;
                ID = RestaurantID;
                break;
        }
        const computedCity = () => {
            if (!City) {
                return (city = Address.slice(0, 3));
            }
            return (city = City);
        };
        return (
            <span key={i}>
                <Paths
                    zhcategory={zhCategory}
                    category={category}
                    city={computedCity()}
                    name={Name}
                    id={id}
                />
                <span key={ID} className="detail-container">
                    <section className="detail-section-top">
                        <img
                            className="detail-section-top-img"
                            src={Picture.PictureUrl1}
                            aria-label={Name}
                            alt={Name}
                        />
                        <h2 className="detail-title">{Name}</h2>
                        {Class1 && <div className="detail-tag-container">#{Class1}</div>}
                        {Class && <div className="detail-tag-container">#{Class}</div>}
                        <article className="detail-article">
                            <h3 className="detail-article-title">景點介紹:</h3>
                            <p className="detail-article-description">
                                {DescriptionDetail ? DescriptionDetail : Description}
                            </p>
                        </article>
                    </section>
                    <section className="detail-section-down">
                        <div className="detail-section-down-left">
                            <Info data={data} category={category} />
                        </div>
                        <div className="detail-section-down-right">
                            <Map Position={Position} Name={Name} />

                            <div className="detail-section-down-right-info">
                                <h4 className="detail-section-down-right-title">周邊資訊：</h4>
                                <span className="detail-section-down-right-more">
                                    <div
                                        className="detail-section-down-right-more-btn  detail-section-down-right-more-btn-hover"
                                        onClick={() => navigate('/scenicspot')}
                                    >
                                        <p className="detail-section-down-right-more-txt">
                                            附近景點
                                        </p>
                                    </div>
                                    <div
                                        className="detail-section-down-right-more-btn detail-section-down-right-more-btn-hover"
                                        onClick={() => navigate('/activity')}
                                    >
                                        <p className="detail-section-down-right-more-txt">
                                            附近活動
                                        </p>
                                    </div>
                                    <div
                                        className="detail-section-down-right-more-btn detail-section-down-right-more-btn-hover"
                                        onClick={() => navigate('/restaurant')}
                                    >
                                        <p className="detail-section-down-right-more-txt">
                                            附近美食
                                        </p>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </section>
                </span>
            </span>
        );
    });

    return (
        <>
            {Details}
            <Row
                title={`還有這些不能錯過的${zhCategory}`}
                seeMore={`查看更多${zhCategory}`}
                data={rowData}
                category={category}
            />
        </>
    );
}

export default Detail;
