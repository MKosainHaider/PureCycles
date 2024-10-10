import React from 'react';
import ProductCard from '../ProductCard';
import CityStepThrough26_8SpeedImage from '../../assets/Products-Images/CityStepThrough26-8Speed.jpeg';

const CityStepThrough26_8Speed = () => {
  return (
    <ProductCard
      id={24}
      image={CityStepThrough26_8SpeedImage}
      altText="City Step-Through 26'' 8-Speed"
      name="City Step-Through 26'' 8-Speed"
      brand="PURE CYCLES"
      price="$699.99"
      type="Bikes"
      colors={['#00743e', '#ffd700', '#6600cc', '#4b0082']}
    />
  );
};

export default CityStepThrough26_8Speed;
