import React from 'react';
import styled from 'styled-components';
import heroImage from '../../assets/Page-Images/SingleSpeedimg1.jpeg'; 

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <MainText>FIXED GEAR AND SINGLE SPEED BIKES</MainText>
      </HeroContent>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  background: url(${heroImage}) center center/cover no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 90%;
`;

const MainText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export default HeroSection;
