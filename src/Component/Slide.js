import React, { useEffect, useState } from 'react';
import axios from 'redaxios';
import getAuthorizationHeader from '../lib/getAuthorizationHeader';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const StyledSlide = styled.section`
    max-width: 90vw;
    margin: auto;
`;

const Slide = () => {
    const [data, setData] = useState([]);
    const slideAmount = 5;
    const defaultGeolocation = '臺北市';
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(
                `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$select=ScenicSpotName%2CScenicSpotID%2CPicture&$top=${slideAmount}&$format=JSON
            `,
                { headers: getAuthorizationHeader() }
            )
            .then(function (res) {
                const thisData = res.data;
                setData(res.data);
                //console.log('Slider rendering', res.data);
            })
            .catch(function (error) {
                console.log('Slider', error);
            });
    }, []);

    const SlideData = data.map((data, i) => {
        const { Picture, ScenicSpotName, ScenicSpotID } = data;
        const imgUrl = Picture.PictureUrl1;
        return (
            <div key={i} className="img-container">
                <div
                    className="carousel-img"
                    style={{ backgroundImage: `url("${imgUrl}")` }}
                    aria-label={ScenicSpotName}
                >
                    <h4
                        className="carousel-txt"
                        onClick={() => navigate(`/scenicspot/${ScenicSpotID}`)}
                    >{`${defaultGeolocation} | ${ScenicSpotName}`}</h4>
                </div>
            </div>
        );
    });
    return (
        <StyledSlide>
            <Carousel showThumbs={false}>{SlideData}</Carousel>
        </StyledSlide>
    );
};

export default Slide;
