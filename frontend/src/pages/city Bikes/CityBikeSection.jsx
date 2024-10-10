import React, { useState } from "react";
import styled from "styled-components";
import bikeData from "../../api/bike.json"; // Import the bike data
import ProductCard from "../../components/ProductCard2";

const BikesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");

  // Specific bike names you want to display
  const targetBikes = [
    "City Step-Through 3-Speed",
    "City Classic 3-Speed",
    "City Step-Through 8-Speed",
    "City Classic 8-Speed",
    "City Step-Through 26'' 3-Speed",
    "City Step-Through 26'' 8-Speed"
  ];

  // Filter the data to include only the target bikes
  const filteredData = bikeData.filter((bike) => targetBikes.includes(bike.name));

  // Handle category filter change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle sort option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

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
        <FilterButton>
          <label>
            Category:
            <SelectFilter value={selectedCategory} onChange={handleCategoryChange}>
              <option value="All">All</option>
              {/* Add other categories if necessary */}
            </SelectFilter>
          </label>
        </FilterButton>
        <SortSection>
          <label>Sort By:</label>
          <SortSelect value={sortOption} onChange={handleSortChange}>
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

const FilterButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SelectFilter = styled.select`
  margin-left: 0.5rem;
  padding: 0.25rem;
  border: 1px solid #ccc;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
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

export default BikesSection;
