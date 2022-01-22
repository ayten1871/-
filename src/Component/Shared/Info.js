import React from "react";
import styled from "styled-components";
import { ScenicSpotTitles, ActivityTitles,RestaurantTitles } from '../../lib/CategoryLists';


const Info = ({data,category}) => {

    let titles = [];
    let template = {};

    switch (category) {
        case "ScenicSpot":
            titles = Object.keys(ScenicSpotTitles);
            template = ScenicSpotTitles;
            break;
        case "Activity":
            titles = Object.keys(ActivityTitles);
            template = ActivityTitles;
            break;
        case "Restaurant":
            titles = Object.keys(RestaurantTitles);
            template = RestaurantTitles;
            break;
    }


    function Attractions(titles,data,template) {
     
        return titles.map((title, i) => {
            const WebsiteUrl=<a className="detail-section-down-left-txt detail-section-down-left-url" href={data[title]} rel="noopener noreferer" target="_blank">{data[title]}</a>;
            const nonUrl=<p className="detail-section-down-left-txt">{data[title]}</p>;
            if (data[title]) {
                //console.log("title:",title,'data:',data)
                return (
                    <div className="detail-section-down-left-info" key={i}>
                        <p className="detail-section-down-left-title">{template[title]}：</p>
                        {title==="WebsiteUrl"? WebsiteUrl: nonUrl}
                    </div>
                )
            }
        })
    }

    return (
        <>
            {Attractions(titles, data,template)}
        </>
    )
}
export default React.memo(Info);