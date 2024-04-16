import styled from 'styled-components'
import React from 'react'

const Login = (props) => {
  return (
    <Container>
        <Content>
            <CTA>
                <CTALogoOne src="/images/cta-logo-one.svg" alt="" />
                <SignUp>Get All There</SignUp>
                <Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Description>
                <CTALogoTwo src="/images/cta-logo-two.png" alt="" />
            </CTA>
            <BgImage />
        </Content>
    </Container>
  )
};

const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
`;


const Content = styled.div`
    font-size: 1.5rem;
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 40px;
    height: 100%;
`;

const BgImage = styled.div`
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    background-image: url("/images/login-background.jpg");
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
`;

const CTA = styled.div`
    width: 100%
    max-width: 650px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 0;
    margin-bottom: 2vw;
    margin-left: auto;
    margin-right: auto;
    transition-timing-function: ease-out;
    transition : opacity 0.2s; 
`;

const CTALogoOne = styled.img`
    width: 100%;
    max-width: 600px;
    min-height: 1px;
    display: block;
    margin-bottom: 12px;
`;

const SignUp = styled.a`
    font-weight: bold;
    color: white;
    background-color: #0063e5;
    margin-bottom: 12px;
    max-width: 650px;
    width: 100%;
    letter-spacing: 1.5px;
    font-size: 18px;
    padding: 16px 0;
    border-radius: 5px;

    &:hover {
        background-color: #0483ee;
    }
`;

const Description = styled.p`
    max-width: 650px;
    color: white;
    font-size: 16px;
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
    width: 100%;
    max-width: 600px;
    min-height: 1px;
`;

export default Login;