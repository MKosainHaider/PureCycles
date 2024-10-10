import React from 'react';
import ProductCard from '../ProductCard';
import CityStepThrough8SpeedImage from '../../assets/Products-Images/CityStepThrough8Speed.jpeg';

const CityStepThrough8Speed = () => {
  return (
    <ProductCard
      id={22}
      image={CityStepThrough8SpeedImage}
      altText="City Step-Through 8-Speed"
      name="City Step-Through 8-Speed"
      brand="PURE CYCLES"
      price="$659.99"
      type="Bikes"
      colors={['#008000', '#ffd700', '#6600cc']}
    />
  );
};

export default CityStepThrough8Speed;
