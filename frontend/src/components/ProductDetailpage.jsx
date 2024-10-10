import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : '');
  const navigate = useNavigate();

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.selectedColor === selectedColor
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
    } else {
      const newItem = { ...product, selectedColor, quantity: 1 };
      cartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('storage'));
  };

  const buyNow = () => {
    const productToBuy = { ...product, selectedColor, quantity: 1 };
    navigate('/buy-now', { state: { product: productToBuy } });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <Container>
        <ImageSection>
          <MainImage src={product.image} alt={product.altText} />
          {product.colors && (
            <ColorOptions>
              {product.colors.map((color, index) => (
                <ColorSwatch
                  key={index}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </ColorOptions>
          )}
        </ImageSection>
        <DetailsSection>
          <h1>{product.name}</h1>
          <Price>
            {product.oldPrice && <OldPrice>{product.oldPrice}</OldPrice>}
            <NewPrice>{product.price}</NewPrice>
            {product.oldPrice && (
              <Discount>
                Save{" "}
                {Math.round(
                  ((parseFloat(product.oldPrice.replace("$", "")) -
                    parseFloat(product.price.replace("$", ""))) /
                    parseFloat(product.oldPrice.replace("$", ""))) *
                    100
                )}
                %
              </Discount>
            )}
          </Price>
          <p>{product.description}</p>
          <Availability>
            {product.isSoldOut ? "Out of stock" : "In stock, ready to ship"}
          </Availability>
          <ActionButtons>
            <AddToCartButton disabled={product.isSoldOut} onClick={addToCart}>
              Add to Cart
            </AddToCartButton>
            <BuyNowButton onClick={buyNow}>Buy Now</BuyNowButton>
          </ActionButtons>
        </DetailsSection>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  display: flex;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const ImageSection = styled.div`
  flex: 1;
  padding: 2rem;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  object-fit: contain;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ColorSwatch = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ color }) => color};
  border: ${({ selected }) => (selected ? '2px solid black' : '1px solid gray')};
  border-radius: 50%;
  cursor: pointer;
`;

const DetailsSection = styled.div`
  flex: 2;
  padding: 2rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: gray;
`;

const NewPrice = styled.span`
  color: red;
  font-weight: bold;
  margin-left: 10px;
`;

const Discount = styled.span`
  color: green;
  margin-left: 10px;
`;

const Availability = styled.div`
  color: green;
  margin: 1rem 0;
`;

const ActionButtons = styled.div`
  margin: 2rem 0;
  display: flex;
  gap: 20px;
`;

const AddToCartButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'black')};
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: none;
  border-radius: 5px;
`;

const BuyNowButton = styled.button`
  background-color: purple;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;
