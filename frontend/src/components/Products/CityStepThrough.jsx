import React from 'react';
import ProductCard from '../ProductCard';
import CityStepThroughs from '../../assets/Products-Images/CityStepThrough3Speed.jpeg';

const CityStepThrough = () => {
  return (
    <ProductCard
      id={20}
      image={CityStepThroughs}
      altText="City Step-Through 3-Speed"
      name="City Step-Through 3-Speed"
      price="$599.99"
      type="Bikes"
    />
  );
};

export default CityStepThrough;
