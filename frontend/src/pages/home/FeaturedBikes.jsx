import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import bikes from '../../api/bike.json';
import ProductCard from '../../components/ProductCard2';

const FeaturedBikes = () => {
  const featuredBikes = bikes.slice(0, 4); // Rename data for clarity

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto md:px-8">
        <h2 className="mb-8 text-4xl font-bold text-center">FEATURED BIKES</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredBikes.map((bike) => (
            <ProductCard key={bike.id} {...bike} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/all-bikes"> {/* Ensure the correct route */}
            <button className="bg-[#b5985a] text-white px-8 py-2 font-bold">
              VIEW ALL
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBikes;
