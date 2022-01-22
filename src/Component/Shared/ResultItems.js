import React from 'react';

const ResultItems = ({ currentResults, category }) => {
    return currentResults.map((searchData) => {
        const {
            RestaurantName,
            ActivityName,
            ScenicSpotName,
            Picture,
            City,
            Address,
            RestaurantID,
            ActivityID,
            ScenicSpotID,
        } = searchData;

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
        //const city = Address.slice(0, 3);
        //!部分地址格式以zip code開頭
        //console.log('resultItems');
        return (
            <div
                className="result-card"
                key={ID}
                id={ID}
                onClick={() => navigate(`/${category}/${ID}`)}
            >
                <img className="result-card-img" src={Picture.PictureUrl1} alt={Name} />
                <div className="result-card-content">
                    <h4 className="result-card-title">{Name}</h4>
                    {/* <p className="tagSpot-card-location">{CitiesZh[city]}</p> */}
                    <p className="tagSpot-card-location">{City ? City : Address.slice(0, 3)}</p>
                </div>
            </div>
        );
    });
};

export default React.memo(ResultItems);
