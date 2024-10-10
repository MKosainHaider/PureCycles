import React from 'react';
import styled from 'styled-components';
import myVideo from '../../assets/Video/Urban Commuter Bike - Pure Cycles.mp4';

const VideoSection = () => {
  return (
    <VideoContainer>
      <Overlay>
        <Title>LET'S RIDE</Title>
        <Subtitle>URBAN COMMUTER</Subtitle>
      </Overlay>
      <StyledVideo muted autoPlay loop>
        <source src={myVideo} type="video/mp4" />
      </StyledVideo>
    </VideoContainer>
  );
};

export default VideoSection;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  color: white;
  text-align: right;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const Title = styled.h2`
  font-size: 4rem;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;
