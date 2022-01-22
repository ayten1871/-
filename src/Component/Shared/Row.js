import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SearchContext } from '../../Providers/SearchContext';

const Row = ({ title, seeMore, data, category }) => {
    const navigate = useNavigate();
    const props = useContext(SearchContext);
    const { setResult, result } = props;

    //console.log('Row rendering',category,data);
    let navigateTo = category.toLowerCase();

    function linkTo() {
        if (result > 0) {
            setResult(0);
        }
    }

    const cards = data.map((data) => {
        const {
            RestaurantName,
            ActivityName,
            ScenicSpotName,
            Picture,
            Address,
            RestaurantID,
            ActivityID,
            ScenicSpotID,
        } = data;
        const City = Address.slice(0, 3);
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
        return (
            <div
                className="tagSpot-card"
                key={Address}
                onClick={() => {
                    navigate(`/${navigateTo}/${ID}`);
                }}
            >
                <img className="tagSpot-card-img" src={Picture.PictureUrl1} alt={Name} />
                <div className="tagSpot-card-content">
                    <p className="tagSpot-card-title">{Name}</p>
                    <p className="tagSpot-card-location">{City}</p>
                </div>
            </div>
        );
    });

    return (
        <section className="tagSpot">
            <span className="tagSpot-top">
                <h3 className="tagSpot-title">{title}</h3>
                <Link to={`/${navigateTo}`} className="red-link">
                    <span onClick={linkTo}>{seeMore}</span>
                </Link>
            </span>
            <div className="tagSpot-content">{cards}</div>
        </section>
    );
};

export default React.memo(Row);
