import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import styled from "styled-components";
import HeroImage from "../../assets/Page-Images/CityBikesimg1.jpeg";
import CityBikesSection from "./CityBikeSection"; 

const CityBikesPage = () => {
  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>PURE CITY BIKES</HeroTitle>
        </HeroContent>
      </HeroSection>

      {/* City Bikes Section */}
      <CityBikesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Styled Components
const HeroSection = styled.div`
  background: url(${HeroImage}) center center/cover no-repeat;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: 768px) {
    height: 400px; /* Smaller height for tablets and mobile */
  }

  @media (max-width: 480px) {
    height: 300px; /* Further reduced height for mobile */
  }
`;

const HeroContent = styled.div`
  text-align: center;
  padding: 0 20px; /* Padding to ensure it looks good on mobile */
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem; /* Smaller heading for tablets */
  }

  @media (max-width: 480px) {
    font-size: 2rem; /* Further reduced heading size for mobile */
  }
`;

export default CityBikesPage;
