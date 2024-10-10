import React from 'react';
import accessories from '../../api/accessories.json'
import ProductCard from '../../components/ProductCard';
const FeaturedCollections = () => {

  const data = accessories.slice(0,4)

  return (
    <section className="py-16 bg-gray-100">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center">FEATURED COLLECTIONS</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
           {data.map((product)=>
          
          {
            return <ProductCard key={product.id} {...product} />;
          }
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
