import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import accessories from './api/accessories.json';
import bikes from './api/bike.json';
import ProductDetailPage from './components/ProductDetailpage';

const RenderProductDetail = ({ type }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Use the correct data source based on the type
  const data = type === "accessories" ? accessories : bikes;

  useEffect(() => {
    // Find the product by matching the ID
    const product = data.find((item) => item.id.toString() === id);
    setProduct(product);
  }, [id, data]);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return <ProductDetailPage product={product} />;
};

export default RenderProductDetail;
