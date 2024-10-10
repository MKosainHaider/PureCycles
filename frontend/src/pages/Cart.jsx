import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Calculate totals whenever cartItems change
  useEffect(() => {
    const calculateTotals = () => {
      let totalPrice = 0;
      let totalItems = 0;

      cartItems.forEach((item) => {
        const price = parseFloat(item.price.replace('$', '').trim()) || 0;
        const quantity = item.quantity || 1;

        totalPrice += price * quantity;
        totalItems += quantity;
      });

      setTotalPrice(totalPrice.toFixed(2));
      setTotalItems(totalItems);
      setTotalProducts(cartItems.length);
    };

    calculateTotals();
  }, [cartItems]);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    updateCartInLocalStorage(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCartInLocalStorage(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    updateCartInLocalStorage(updatedCart);
  };

  return (
    <>
      <NavBar />
      <Container>
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <CartGrid>
              {cartItems.map((item, index) => (
                <CartItem key={index}>
                  <img src={item.image} alt={item.altText} />
                  <CartDetails>
                    <h3>{item.name}</h3>
                    <p>Selected Color: {item.selectedColor}</p>
                    <p>${item.price}</p>
                    <QuantityControls>
                      <button onClick={() => decreaseQuantity(index)}>-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => increaseQuantity(index)}>+</button>
                    </QuantityControls>
                    <RemoveButton onClick={() => removeItem(index)}>Remove</RemoveButton>
                  </CartDetails>
                </CartItem>
              ))}
            </CartGrid>

            {/* Bill Section */}
            <BillSection>
              <h2>Summary</h2>
              <p>Total Products: {totalProducts}</p>
              <p>Total Items: {totalItems}</p>
              <p>Total Price: ${totalPrice}</p>
              <ButtonGroup>
                <Link to="/shop">
                  <ActionButton>Continue Shopping</ActionButton>
                </Link>
                {/* Buy Now Button that sends the entire cart to BuyNowPage */}
                <ActionButton onClick={() => navigate("/buy-now", { state: { cartItems } })}>
                  Buy Now
                </ActionButton>
              </ButtonGroup>
            </BillSection>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;

const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
  }
`;

const CartDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QuantityControls = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  button {
    background-color: #ddd;
    border: none;
    padding: 5px;
    cursor: pointer;
  }
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const BillSection = styled.div`
  margin-top: 2rem;
  text-align: right;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
