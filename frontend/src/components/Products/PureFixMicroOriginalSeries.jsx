import React from 'react';
import ProductCard from '../ProductCard';
import PureFixMicroOriginalSeriesImage from '../../assets/Products-Images/PureFixMicroOrignaalSeries.jpeg';

const PureFixMicroOriginalSeries = () => {
  return (
    <ProductCard
      id={28}
      image={PureFixMicroOriginalSeriesImage}
      altText="Pure Fix Micro Original Series"
      name="Pure Fix Micro Original Series"
      brand="PURE CYCLES"
      price="$599.99"
      type="Bikes"
    />
  );
};

export default PureFixMicroOriginalSeries;
