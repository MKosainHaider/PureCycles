import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../../assets/Page-Images/Homeimg1.jpeg';

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <SmallText>CITY BIKES</SmallText>
        <MainText>EXPLORE YOUR CITY</MainText>
        <ShopButton>SHOP CITY BIKES</ShopButton>
      </HeroContent>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  background: url(${backgroundImage}) center center/cover no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 90%;
`;

const SmallText = styled.h2`
  font-size: 1.5rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
`;

const MainText = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ShopButton = styled.button`
  background-color: #b5985a;
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: #a07a3a;
  }
`;

export default HeroSection;
