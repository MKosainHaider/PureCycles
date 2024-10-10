import React from 'react';
import ProductCard from '../ProductCard';
import Coasters from '../../assets/Products-Images/Coaster.jpeg';

const Coaster = () => {
  return (
    <ProductCard
      id={25}
      image={Coasters}
      altText="Coaster"
      name="Coaster"
      brand="PURE CYCLES"
      oldPrice="$429.99"
      price="$299.99"
      type="Bikes"
      colors={['#000000', '#C0C0C0', '#FFD700']}
    />
  );
};

export default Coaster;
