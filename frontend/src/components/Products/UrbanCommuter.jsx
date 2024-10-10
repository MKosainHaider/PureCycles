import React from 'react';
import ProductCard from '../ProductCard';
import Urbancommuter from '../../assets/Products-Images/UrbanCommuterBike.jpeg';

const UrbanCommuter = () => {
  return (
    <ProductCard
      id={30}
      image={Urbancommuter}
      altText="Urban Commuter Bike"
      name="Urban Commuter Bike"
      price="$899.99"
      type="Bikes"
    />
  );
};

export default UrbanCommuter;
