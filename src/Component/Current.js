import React, { useEffect, useState } from 'react';
import getAuthorizationHeader from '../lib/getAuthorizationHeader';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import axios from 'redaxios';

const Current = () => {
    const [data, setData] = useState([]);
    const cardAmount = 4;
    const today = format(new Date(), 'yyyy-MM-dd');
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(
                //filter top 4 activities that at least have one picture and startTime lt today
                `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$select=ActivityID%2C%20ActivityName%2CCity%2CStartTime%2CEndTime%2CPicture&$filter=length(Picture%2FPictureUrl1)%20ne%200%20and%20date(StartTime)%20gt%20${today}&$top=${cardAmount}&$format=JSON
            `,
                { headers: getAuthorizationHeader() }
            )
            .then(function (res) {
                const thisData = res.data;
                setData(res.data);
                //console.log('Current rendering', res.data);
            })
            .catch(function (error) {
                console.log('Current', error);
            });
    }, []);

    const CurrentData = data.map((data) => {
        let { ActivityID, ActivityName, City, StartTime, EndTime, Picture } = data;
        const startTime = format(new Date(StartTime), 'yyyy/MM/dd');
        const endTime = format(new Date(EndTime), 'yyyy/MM/dd');
        const duration = `${startTime} ~ ${endTime}`;
        return (
            <div className="current-card" key={ActivityID}>
                <img className="current-card-img" src={Picture.PictureUrl1} alt={ActivityName} />
                <div className="current-card-content">
                    <span className="current-card-top">
                        <p className="current-card-date">{duration}</p>
                        <p className="current-card-title">{ActivityName}</p>
                    </span>
                    <span className="current-card-down">
                        <p className="current-card-location">{City}</p>
                        <p
                            className="current-card-more"
                            onClick={() => navigate(`/activity/${ActivityID}`)}
                        >{`詳細介紹`}</p>
                    </span>
                </div>
            </div>
        );
    });

    return (
        <section className="current" id="current">
            <span className="current-top">
                <h3 className="current-title">近期活動</h3>
                <p className="red-link" onClick={() => navigate('/activity')}>
                    查看更多活動
                </p>
            </span>
            <div className="current-content">{CurrentData}</div>
        </section>
    );
};

export default Current;
