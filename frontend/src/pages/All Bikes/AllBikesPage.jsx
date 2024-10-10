import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import styled from "styled-components";
import HeroImage from "../../assets/Page-Images/AllBikesImg1.jpg";
import BikesSection from "./AllBikesSection"; 

const AllBikesPage = () => {
  return (
    <>
        <NavBar  />
      
      <HeroSection>
        <HeroContent>
          <h1 className="text-4xl font-bold text-white md:text-6xl">BICYCLES</h1>
        </HeroContent>
      </HeroSection>

      <BikesSection />

        <Footer />
     
    </>
  );
};




const HeroSection = styled.div`
  background: url(${HeroImage}) center center/cover no-repeat;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    height: 500px;
  }

  @media (min-width: 1024px) {
    height: 600px;
  }
`;

const HeroContent = styled.div`
  text-align: center;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;

    @media (min-width: 768px) {
      font-size: 3.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 4.5rem;
    }
  }
`;


export default AllBikesPage;
