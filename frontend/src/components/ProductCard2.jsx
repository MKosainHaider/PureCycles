import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, altText, name, brand, price, oldPrice, isSoldOut, colors }) => {
  return (
    <div className="text-center">
      <Link to={`/bikes/${id}`}>
        <img src={image} alt={altText} className="w-full max-w-xs mx-auto mb-4" />
        <h3 className="text-xl font-semibold">{name}</h3>
      </Link>
      {brand && <p className="text-gray-600">{brand}</p>}
      {isSoldOut ? (
        <p className="text-gray-400">Sold Out</p>
      ) : (
        <>
          {oldPrice ? (
            <div className="text-red-500">
              <span className="line-through">{oldPrice}</span> from <span>{price}</span>
              <span className="text-red-500"> Save {Math.round(((oldPrice - price) / oldPrice) * 100)}%</span>
            </div>
          ) : (
            <p className="text-lg">{price}</p>
          )}
        </>
      )}
      {colors && (
        <div className="flex justify-center mt-2 space-x-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
