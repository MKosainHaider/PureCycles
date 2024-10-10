import React from 'react';
import ProductCard from '../ProductCard';
import OriginalBikeImage from '../../assets/Products-Images/Original.jpeg';

const OriginalBike = () => {
  return (
    <ProductCard
      id={26}
      image={OriginalBikeImage}
      altText="Original Bike"
      name="Original"
      brand="PURE CYCLES"
      type="Bikes"
      isSoldOut={true}
    />
  );
};

export default OriginalBike;
