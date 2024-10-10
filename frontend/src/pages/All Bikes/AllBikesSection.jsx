import React, { useState } from "react";
import styled from "styled-components";
import bikeData from "../../api/bike.json"; // Assuming you have the updated JSON file for bikes
import ProductCard from "../../components/ProductCard2";

const BikesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSpeed, setSelectedSpeed] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extract unique categories and speeds from data
  const uniqueCategories = ["All", ...new Set(bikeData.map((product) => product.categories).flat())];
  const uniqueSpeeds = ["All", ...new Set(bikeData.map((product) => product.speed))];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleSpeedChange = (event) => {
    setSelectedSpeed(event.target.value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleFilterButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false); // Close dropdown without applying any selection
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

  // Filter data based on selected category and speed
  const filteredData = bikeData.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.categories.includes(selectedCategory);
    const matchesSpeed = selectedSpeed === "All" || product.speed === selectedSpeed;
    return matchesCategory && matchesSpeed;
  });

  // Apply sorting to filtered data
  const sortedData = sortData(filteredData, sortOption);

  return (
    <SectionWrapper>
      <FilterSortWrapper>
        <FilterButton onClick={handleFilterButtonClick}>
          <i className="fas fa-filter"></i> Filter
          {isDropdownOpen && (
            <DropdownMenu onBlur={handleDropdownClose}>
              <DropdownItem>
                <label>
                  Category:
                  <SelectFilter value={selectedCategory} onChange={handleCategoryChange}>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </SelectFilter>
                </label>
              </DropdownItem>
              <DropdownItem>
                <label>
                  Speed:
                  <SelectFilter value={selectedSpeed} onChange={handleSpeedChange}>
                    {uniqueSpeeds.map((speed) => (
                      <option key={speed} value={speed}>
                        {speed}
                      </option>
                    ))}
                  </SelectFilter>
                </label>
              </DropdownItem>
            </DropdownMenu>
          )}
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

const FilterButton = styled.button`
  position: relative;
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
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
