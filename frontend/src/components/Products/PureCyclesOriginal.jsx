import React from 'react';
import ProductCard from '../ProductCard';
import PureCyclesOriginalImage from '../../assets/Products-Images/purecycleoriginal.webp';

const PureCyclesOriginal = () => {
  return (
    <ProductCard
      id={27}
      image={PureCyclesOriginalImage}
      altText="Pure Cycles Original"
      name="Pure Cycles Original"
      price="$479.99"
      oldPrice="$599.99"
      discount="Save 20%"
      type="Bikes"
      sale={true}
    />
  );
};

export default PureCyclesOriginal;
