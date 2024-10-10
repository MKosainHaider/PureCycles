import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import HeroImage from '../../assets/Page-Images/SingleSpeedimg1.jpeg';
import bikeData from '../../api/bike.json'; // Import the bike data
import ProductCard from '../../components/ProductCard2'; // Assuming you're using this component for bike cards

const SingleSpeedPage = () => {
  const [sortOption, setSortOption] = useState('Featured');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setIsDropdownOpen(false);
  };

  // Filter only Single Speed Bikes
  const filteredData = bikeData.filter((bike) => bike.categories.includes('Single Speed'));

  // Sorting function based on selected sort option
  const sortData = (data, option) => {
    switch (option) {
      case 'Price, low to high':
        return [...data].sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
      case 'Price, high to low':
        return [...data].sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
      case 'A to Z':
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case 'Z to A':
        return [...data].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return data;
    }
  };

  // Apply sorting to filtered data
  const sortedData = sortData(filteredData, sortOption);

  return (
    <div>
      <NavBarContainer>
        <NavBar bgColor="transparent" textColor="white" />
      </NavBarContainer>
      <HeroSection>
        <HeroContent>
          <h1 className="text-6xl font-bold text-white">FIXED GEAR AND SINGLE SPEED BIKES</h1>
        </HeroContent>
      </HeroSection>

      <div className="py-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center px-4 py-2 bg-white border" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <i className="mr-2 fas fa-filter"></i>Filter
          </button>
          <select className="px-4 py-2 bg-white border" value={sortOption} onChange={handleSortChange}>
            <option value="Featured">Featured</option>
            <option value="Price, low to high">Price, low to high</option>
            <option value="Price, high to low">Price, high to low</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {sortedData.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const NavBarContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.div`
  background: url(${HeroImage}) center center/cover no-repeat;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -110px;
`;

const HeroContent = styled.div`
  text-align: center;
`;

export default SingleSpeedPage;
