import React, { useState } from "react";
import styled from "styled-components";
import bikeData from "../../api/bike.json"; // Assuming you have the updated JSON file for bikes
import ProductCard from "../../components/ProductCard2"; // Assuming this is the card component used to display products

const BikeSection = () => {
  const [sortOption, setSortOption] = useState("Featured");

  // Filter the bike data to only include UrbanCommuterBike
  const filteredData = bikeData.filter((bike) => bike.name === "Urban Commuter Bike");

  // Sorting function based on selected sort option
  const sortData = (data, option) => {
    switch (option) {
      case "Price, low to high":
        return [...data].sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
      case "Price, high to low":
        return [...data].sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
      case "A to Z":
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case "Z to A":
        return [...data].sort((a, b) => b.name.localeCompare(a.name));
      case "Newest arrivals":
        return [...data].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case "Featured":
      default:
        return data;
    }
  };

  // Apply sorting to filtered data
  const sortedData = sortData(filteredData, sortOption);

  return (
    <SectionWrapper>
      <FilterSortWrapper>
        <SortSection>
          <label>Sort By:</label>
          <SortSelect value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="Featured">Featured</option>
            <option value="Price, low to high">Price, low to high</option>
            <option value="Price, high to low">Price, high to low</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
            <option value="Newest arrivals">Newest arrivals</option>
          </SortSelect>
        </SortSection>
      </FilterSortWrapper>
      <GridWrapper>
        {sortedData.length > 0 ? (
          sortedData.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <NoResultsMessage>No bikes available for the selected filters.</NoResultsMessage>
        )}
      </GridWrapper>
    </SectionWrapper>
  );
};

// Styled components for layout
const SectionWrapper = styled.div`
  padding: 2rem 1rem;
  background-color: #ffffff;
`;

const FilterSortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SortSection = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 0.5rem;
  }
`;

const SortSelect = styled.select`
  padding: 0.25rem;
  border: 1px solid #ccc;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const NoResultsMessage = styled.div`
  grid-column: span 3;
  text-align: center;
  color: #888;
`;

export default BikeSection;
