import styled from '@emotion/styled';
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const Wrapper = styled.div`
 width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-y: scroll;
    background:url('https://newsroomcdn.bugatti.com/w_3200/f014c3ff-2a67-4034-912a-2028aa1841aa.jpg') ;
    padding: 30px 100px;
    background-size: cover;
    background-position: center;
`;

const Container = styled.div`
    display: flex;
    height: fit-content;
    background: black;
    flex-direction: column;
    padding: 50px 50px;
    gap: 30px;
`;

const UpperContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    h1 {
        font-size: 22px;
        text-align: start;
        max-width: 500px;
        width: 100%;
    }
    p {
        max-width: 500px;
    }
`;

const Header = styled.h1`
    padding: 5px;
    margin: 0;
    font-size: 4rem;
`;

const LowerContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Styledimg = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
`;



export default function ReviewsPage() {

    return (
        <Wrapper>
            <Container>
                <Header>REVIEWS</Header>
                <UpperContainer>
                    <TextContainer style={{ width: '100%', }}>
                        <h1>Quoting jhon doe</h1>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </TextContainer>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                        01/15
                    </div>
                </UpperContainer>

            </Container>
        </Wrapper>
    );
}
