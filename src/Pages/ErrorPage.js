import React from 'react';
import styled from 'styled-components';
export const StyledErrorPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    box-sizing: border-box;
    padding: 5vw 15vw;
    text-align: right;
    width: 90vw;
    height: 100vh;
    margin: auto;
    background: url('https://media.thetab.com/blogs.dir/90/files/2021/06/screenshot-2021-06-10-at-110730-1024x537.png')
        no-repeat;
    background-position: center;
    h1 {
        font-size: 5rem;
        font-weight: bolder;
    }
    p {
        font-size: 2rem;
    }
`;
function ErrorPage() {
    return (
        <StyledErrorPage>
            <h1>404</h1>
            <p>頁面不存在</p>
        </StyledErrorPage>
    );
}

export default ErrorPage;
