import React from 'react';
import ProductCard from '../ProductCard';
import CityClassic3SpeedImg from '../../assets/Products-Images/CityClassic3speed.jpeg';

const CityClassic3Speed = () => {
  return (
    <ProductCard
      id={18}
      image={CityClassic3SpeedImg}
      altText="City Classic 3-Speed"
      name="City Classic 3-Speed"
      brand="PURE CYCLES"
      price="$689.99"
      type="Bikes"
    />
  );
};

export default CityClassic3Speed;
