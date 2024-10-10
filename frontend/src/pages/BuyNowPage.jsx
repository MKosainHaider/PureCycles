import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const BuyNowPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Check if we're receiving a single product or cart items
  const cartItems = state?.cartItems || (state?.product ? [state.product] : []);

  // If no products to display, show a message
  if (cartItems.length === 0) {
    return (
      <>
        <NavBar />
        <Container>
          <h1>No items to purchase.</h1>
          <ActionButton onClick={() => navigate("/shop")}>Go to Shop</ActionButton>
        </Container>
        <Footer />
      </>
    );
  }

  // Calculate total price and quantity
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => {
        const itemPrice = parseFloat(item.price.replace("$", ""));
        const itemTotal = itemPrice * item.quantity;
        return {
          totalPrice: acc.totalPrice + itemTotal,
          totalQuantity: acc.totalQuantity + item.quantity,
        };
      },
      { totalPrice: 0, totalQuantity: 0 }
    );

    setTotalPrice(total.totalPrice.toFixed(2));
    setTotalQuantity(total.totalQuantity);
  }, [cartItems]);

  const handleConfirmPurchase = () => {
    alert("Thank you for your purchase!");
    navigate("/shop");
  };

  return (
    <>
      <NavBar />
      <Container>
        <h1>Confirm Your Purchase</h1>

        {/* Products in Grid */}
        <ProductGrid>
          {cartItems.map((item, index) => (
            <ProductItem key={index}>
              <img src={item.image} alt={item.altText || item.name} />
              <ProductDetails>
                <h2>{item.name}</h2>
                <p>Color: {item.selectedColor}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </ProductDetails>
            </ProductItem>
          ))}
        </ProductGrid>

        {/* Billing Details */}
        <BillingDetails>
          <h2>Billing Summary</h2>
          <p>Total Products: {cartItems.length}</p>
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Price: ${totalPrice}</p>
        </BillingDetails>

        {/* Action Buttons */}
        <ButtonGroup>
          <ActionButton onClick={() => navigate("/cart")}>Go Back</ActionButton>
          <ActionButton primary onClick={handleConfirmPurchase}>
            Confirm Purchase
          </ActionButton>
        </ButtonGroup>
      </Container>
      <Footer />
    </>
  );
};

export default BuyNowPage;

const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  text-align: center;

  h1 {
    margin-bottom: 1.5rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  gap: 1rem;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;

  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
`;

const BillingDetails = styled.div`
  margin-top: 2rem;
  text-align: left;
  border-top: 2px solid #ccc;
  padding-top: 1.5rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: ${(props) => (props.primary ? "#28a745" : "#007bff")};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#218838" : "#0056b3")};
  }
`;
