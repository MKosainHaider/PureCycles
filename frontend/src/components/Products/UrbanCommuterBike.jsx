import React from 'react';
import ProductCard from '../ProductCard';
import UrbanCommuterImage from '../../assets/Products-Images/UrbanCommuterBike.jpeg';

const UrbanCommuterBike = () => {
  return (
    <ProductCard
      id={31}
      image={UrbanCommuterImage}
      altText="Urban Commuter Bike"
      name="Urban Commuter Bike"
      brand="PURE CYCLES"
      oldPrice="$689.99"
      price="$551.99"
      type="Bikes"
      colors={['#C0C0C0', '#000000', '#3A506B']}
    />
  );
};

export default UrbanCommuterBike;
