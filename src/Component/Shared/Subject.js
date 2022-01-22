import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SearchContext } from '../../Providers/SearchContext';
import { ScenicSpotSubject, ActivitySubject, RestaurantSubject } from '../../lib/CategoryLists';

export const StyledSubject = styled.section`
    max-width: 90vw;
    margin: auto;
    .subject-title {
        //margin: 1rem 0;
        margin-top: 1rem;
        font-size: 2.2rem;
    }
    .subject-title-container {
        display: flex;
        flex-direction: row;
        align-items: end;
    }
    .subject-label {
        display: flex;
        flex-direction: row;
        margin-left: 2px;
        border-radius: 24px;
        padding: 3px 7px;
        align-items: center;
    }
    .subject-label:hover {
        background-color: rgba(127, 151, 123, 0.1);
    }

    .subject-content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        @media (max-width: 768px) {
            justify-content: space-between;
        }
    }
    .subject-content-img {
        width: 15rem;
        height: 8rem;
        margin-right: 1rem;
        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 1.5rem;
        color: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        filter: brightness(60%);
        text-shadow: black 0.1em 0.1em 0.2em;
        @media (max-width: 768px) {
            width: 43vw;
            margin: 0;
        }
    }
    .subject-content-img:hover {
        cursor: pointer;
    }
    .subject-content-input {
        //all: unset;
        visibility:hidden;
    }
    .subject-img-culture {
        background-image: url('../../img/Subject/culture.jpg');
    }
    .subject-img-touristFactory {
        background-image: url('../../img/Subject/touristFactory.jpg');
    }
    .subject-img-tourism {
        background-image:url("../../img/Subject/tourism.png");
    }
    .subject-img-scene {
        background-image: url('../../img/Subject/scene.jpg');
    }
    .subject-img-nature {
        background-image:url("../../img/Subject/nature.jpg");
    }
    .subject-img-hotSpring {
        background-image:url("../../img/Subject/hotSpring.jpg");
    }
    .subject-img-monument {
        background-image:url("../../img/Subject/monument.jpg");
    }
    .subject-img-workout {
        background-image:url("../../img/Subject/workout.jpg");
    }
    .subject-img-agriculture {
        background-image:url("../../img/Subject/agriculture.jpg");
    }
    .subject-img-art {
        background-image:url("../../img/Subject/art.jpg");
    }
    .subject-img-festival {
        background-image:url("../../img/Subject/festival.jpg");
    }
    .subject-img-localFood {
        background-image:url("../../img/Subject/localFood.jpg");
    }
    .subject-img-foreignFood {
        background-image:url("../../img/Subject/foreignFood.jpg");
    }
    .subject-img-otherFood {
        background-image:url("../../img/Subject/otherFood.jpg");
    }
    input[type='radio']:checked ~ .subject-content-img {
        filter: brightness(90%);
        box-shadow: 2px 1px 5px 4px #e5e5e5;
        //box-sizing: border-box;
        //border: 5px inset rgba(127, 151, 123, 0.9);
    }
`;
export const categoryArray = ['ScenicSpot', 'Activity', 'Restaurant'];
function Subject({ category }) {
    console.log('Subject rendering');
    const props = useContext(SearchContext);
    const { subject, setSubject, result } = props;
    const [currentSubject, setCurrentSubject] = useState('');

    const updateSubject = (e) => {
        //e.preventDefault();
        console.log('熱門主題: ', e.target.value);
        //setSubject((prevState) => (prevState.length > 1 ? '' : e.target.value));
        setSubject(e.target.value);
        setCurrentSubject(e.target.value);
    };

    function checkCategory(category) {
        let categoryList;
        switch (category) {
            case 'ScenicSpot':
                categoryList = ScenicSpotSubject;
                break;
            case 'Activity':
                categoryList = ActivitySubject;
                break;
            case 'Restaurant':
                categoryList = RestaurantSubject;
                break;
        }
        // if (category == 'ScenicSpot') {
        return categoryList.map((imgObj, i) => {
            //console.log('img', imgObj);
            const { subject, className } = imgObj;
            return (
                <span key={i}>
                    <input
                        type="radio"
                        className="subject-content-input"
                        id={subject}
                        onChange={updateSubject}
                        value={subject}
                        //name={category}
                        checked={subject === currentSubject ? true : false}
                    />
                    <label className={`subject-content-img ${className}`} htmlFor={subject}>
                        <p className="subject-content-txt">{subject}</p>
                    </label>
                </span>
            );
        });
        //}
    }

    return (
        <StyledSubject>
            <span className="subject-title-container">
                <h2 className="subject-title">熱門主題</h2>
                <label className="subject-label">
                    不限主題
                    <span className="subject-checkbox"></span>
                    <input
                        type="radio"
                        id={subject}
                        onChange={updateSubject}
                        value=""
                        name={category}
                        checked={currentSubject.length < 1 ? true : false}
                    />
                </label>
            </span>
            <span className="subject-content">{checkCategory(category)}</span>
        </StyledSubject>
    );
}

export default React.memo(Subject);
