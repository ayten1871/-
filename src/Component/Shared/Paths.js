import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const StyledPath = styled.div`
    color: #7f977b;
    width: 90vw;
    margin: auto;
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    margin-top: 1rem;
    line-height: 1.5;
    .paths-link {
        cursor: pointer;
        transition: color 0.3s ease-out;
    }
    .paths-link:hover {
        color: rgba(127, 151, 123, 0.5);
    }
`;
const Paths = (props) => {
    const navigate = useNavigate();
    //onClick={()=>navigate(`/${category}/${ID}`)}
    const RouteArray = ['zhcategory', 'city', 'name'];
    const { zhcategory, category, city, name, id } = props;
    //console.log('path props:', props, category);

    const Paths = (
        <>
           
            {category&&  <>
            <p className="paths-link" onClick={() => navigate('/')}>
                首頁{''}
            </p>
            <p
                className="paths-link"
                onClick={() => navigate(`/${category}`)}
            >{`/ ${zhcategory}`}</p>
            </>
            }
           
            {city && <p className="">{` / ${city} / `}</p>}
            {name && (
                <p
                    className="paths-link"
                    onClick={() => navigate(`/${category}/${id}`)}
                >{` ${name}`}</p>
            )}
        </>
    );

    console.log('Routes rendering', category);

    return <StyledPath>{Paths}</StyledPath>;
};

export default React.memo(Paths);
