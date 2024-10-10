import React from 'react';
import ProductCard from '../ProductCard';
import CityStepThrough3SpeedImage from '../../assets/Products-Images/CityStepThrough3Speed.jpeg';

const CityStepThrough3Speed = () => {
  return (
    <ProductCard
      id={21}
      image={CityStepThrough3SpeedImage}
      altText="City Step-Through 3-Speed"
      name="City Step-Through 3-Speed"
      brand="PURE CYCLES"
      price="$699.99"
      type="Bikes"
      colors={['#00743e', '#ffd700', '#6600cc', '#4b0082']}
    />
  );
};

export default CityStepThrough3Speed;
