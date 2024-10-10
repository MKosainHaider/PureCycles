import React from 'react';
import ProductCard from '../ProductCard';
import AdventureALImage from '../../assets/Products-Images/AdventureAL.jpeg';

const AdventureAl = () => {
  return (
    <ProductCard
      id={17}  // Pass the correct ID here
      image={AdventureALImage}
      altText="Adventure AL"
      name="Adventure AL"
      price="$849.99"
      type="Bikes"  // Pass the product type
    />
  );
};

export default AdventureAl;
