import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import accessories from "../../api/accessories.json";
import ProductCard from '../../components/ProductCard';

const ITEMS_PER_PAGE = 12;

const AccessoriesSection = () => {
  const [sortKey, setSortKey] = useState('Featured');
  const [filterKey, setFilterKey] = useState('All'); // New filter state
  const [filteredData, setFilteredData] = useState(accessories);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const parsePrice = (price) => {
      if (price.startsWith('from ')) {
        price = price.replace('from ', '');
      }
      const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(priceNumber) ? 0 : priceNumber;
    };

    // Filter data based on filterKey
    let filteredData = accessories;
    if (filterKey !== 'All') {
      filteredData = accessories.filter(item => item.type === filterKey || item.categories.includes(filterKey));
    }

    // Sort filtered data
    let sortedData = [...filteredData];
    
    switch (sortKey) {
      case 'Price, low to high':
        sortedData.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'Price, high to low':
        sortedData.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'A to Z':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z to A':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Newest arrivals':
        sortedData.sort((a, b) => b.id - a.id);
        break;
      default:
        // No sorting
        break;
    }
    
    setFilteredData(sortedData);
  }, [sortKey, filterKey]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <SectionWrapper>
      <FilterSelect
        value={filterKey}
        onChange={(e) => setFilterKey(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Accessories">Accessories</option>
        <option value="Comfort">Comfort</option>
        <option value="Saddle">Saddle</option>
        <option value="Protection">Protection</option>
        <option value="Fenders">Fenders</option>
        <option value="Storage">Storage</option>
        <option value="Rack">Rack</option>
        <option value="Lighting">Lighting</option>
        <option value="Lamp">Lamp</option>
        <option value="Grip">Grip</option>
        <option value="Handlebar Tape">Handlebar Tape</option>
        <option value="Mechanics">Mechanics</option>
        <option value="Chain">Chain</option>
        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Pedals">Pedals</option>
        <option value="Adapters">Adapters</option>
        <option value="Footwear">Footwear</option>
        <option value="Tires">Tires</option>
        <option value="Stems">Stems</option>
        <option value="Bottles">Bottles</option>
        <option value="Cargo">Cargo</option>
        <option value="Crates">Crates</option>
      </FilterSelect>

      <SortSelect
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="Featured">Featured</option>
        <option value="Price, low to high">Price, low to high</option>
        <option value="Price, high to low">Price, high to low</option>
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
        <option value="Newest arrivals">Newest arrivals</option>
      </SortSelect>

      <GridWrapper>
        {displayedData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </GridWrapper>

      <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageNumber
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageNumber>
        ))}
      </PaginationWrapper>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  padding: 2rem 1rem;
  background-color: #ffffff;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #ffffff;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
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

const PaginationWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const PageNumber = styled.button`
  background: ${(props) => (props.active ? '#b5985a' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#000000')};
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default AccessoriesSection;
