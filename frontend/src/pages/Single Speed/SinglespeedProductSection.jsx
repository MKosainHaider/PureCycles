import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bikeData from '../../api/bike.json'; // Import the bike data
import ProductCard from '../../components/ProductCard2';

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extract unique categories from data
  const uniqueCategories = ['All', ...new Set(bikeData.map((product) => product.categories).flat())];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsDropdownOpen(false);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setIsDropdownOpen(false);
  };

  const handleFilterButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

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

  // Filter data based on selected category
  const filteredData = bikeData.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.categories.includes(selectedCategory);
    return matchesCategory;
  });

  // Apply sorting to filtered data
  const sortedData = sortData(filteredData, sortOption);

  return (
    <SectionWrapper>
      <FilterSortWrapper>
        <FilterButton onClick={handleFilterButtonClick}>
          <i className="fas fa-filter"></i> Filter
        </FilterButton>
        <SortSection>
          <label>Sort By:</label>
          <SortSelect value={sortOption} onChange={handleSortChange}>
            <option value="Featured">Featured</option>
            <option value="Price, low to high">Price, low to high</option>
            <option value="Price, high to low">Price, high to low</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
          </SortSelect>
        </SortSection>
      </FilterSortWrapper>
      <GridWrapper>
        {sortedData.length > 0 ? (
          sortedData.map((product) => (
            // Ensure correct URL generation based on the product type
            <Link to={`/bikes/${product.id}`} key={product.id}>
              <ProductCard {...product} />
            </Link>
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

export default ProductSection;
