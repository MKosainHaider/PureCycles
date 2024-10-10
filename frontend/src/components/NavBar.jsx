  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { FaSearch, FaShoppingCart, FaBars, FaUser, FaTimes } from "react-icons/fa";
  import styled from "styled-components";
  import LogoImage from "../assets/logo.png";
  import { logoutUser } from "../api/userapi"; // Import the logout function

  const NavBar = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check for user data in localStorage on mount
    useEffect(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
    }, []);

    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    useEffect(() => {
      updateCartCount();

      const handleCartChange = () => updateCartCount();
      window.addEventListener("storage", handleCartChange);
      window.addEventListener("cartUpdated", handleCartChange);

      return () => {
        window.removeEventListener("storage", handleCartChange);
        window.removeEventListener("cartUpdated", handleCartChange);
      };
    }, []);

    // Logout function
    const handleLogout = async () => {
      try {
        await logoutUser(); // Call the logout API
        // Clear user data from localStorage
        localStorage.removeItem("user");
        // Update state
        setIsLoggedIn(false);
        setUser(null);
        navigate("/login"); // Redirect to login after logout
        console.log("User has logged out successfully."); // Console log for confirmation
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    

    return (
      <Nav>
        <Container>
          <LogoLink to="/">
            <Logo src={LogoImage} alt="PURE CYCLES" />
          </LogoLink>

          {/* Desktop Menu */}
          <MenuItems className="desktop-menu">
            <NavItem to="/single-speed">SINGLE SPEED</NavItem>
            <NavItem to="/city-bikes">CITY BIKES</NavItem>
            <NavItem to="/commuter-bikes">COMMUTER BIKES</NavItem>
            <NavItem to="/all-bikes">ALL BIKES</NavItem>
            <NavItem to="/accessories">ACCESSORIES</NavItem>
          </MenuItems>

          {/* Right Icons */}
          <Icons>
            <IconLink to="/cart">
              <FaShoppingCart size={24} />
              {cartCount > 0 && <CartCount>({cartCount})</CartCount>}
            </IconLink>

            {isLoggedIn ? (
              <>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </>
            ) : (
              <IconLink to="/login">Login</IconLink>
            )}

            <IconLink to="/profile">
              <FaUser size={24} />
            </IconLink>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </MenuButton>
          </Icons>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <MobileMenu>
              <MobileNavItem to="/single-speed">SINGLE SPEED</MobileNavItem>
              <MobileNavItem to="/city-bikes">CITY BIKES</MobileNavItem>
              <MobileNavItem to="/commuter-bikes">COMMUTER BIKES</MobileNavItem>
              <MobileNavItem to="/all-bikes">ALL BIKES</MobileNavItem>
              <MobileNavItem to="/accessories">ACCESSORIES</MobileNavItem>
              <MobileNavItem to="/profile">Profile</MobileNavItem>
              {!isLoggedIn && <MobileNavItem to="/login">Login</MobileNavItem>} {/* Show Login link in mobile menu when not logged in */}
            </MobileMenu>
          )}
        </Container>
      </Nav>
    );
  };

  // Styled Components
  const Nav = styled.nav`
    background-color: #1f2937; // Dark background color
    color: white;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
  `;

  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const LogoLink = styled(Link)`
    text-decoration: none;
  `;

  const Logo = styled.img`
    max-height: 40px;
  `;

  const MenuItems = styled.div`
    display: none;

    @media (min-width: 768px) {
      display: flex;
      gap: 20px;
    }
  `;

  const NavItem = styled(Link)`
    text-decoration: none;
    color: #f9fafb; // Light text color
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #60a5fa; // Light blue on hover
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 12px;
    }
  `;

  const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; // Adjusted gap between icons

    @media (max-width: 768px) {
      gap: 5px; // Reduce gap on small screens
    }
  `;

  const IconLink = styled(Link)`
    color: #f9fafb; // Light icon color
    position: relative;
    text-decoration: none;
    transition: color 0.3s;

    // Responsive sizing
    @media (max-width: 768px) {
      font-size: 18px; // Decrease size of icons on small screens
    }
  `;

  const CartCount = styled.span`
    font-size: 10px;
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 4px;
  `;

  const MenuButton = styled.button`
    display: block;
    background: none;
    border: none;
    color: #f9fafb; // Light button color
    cursor: pointer;

    @media (min-width: 768px) {
      display: none;
    }
  `;

  const LogoutButton = styled.button`
    background: none;
    border: none;
    color: #f9fafb; // Light button color
    cursor: pointer;
    font-size: 14px; // Decrease font size for smaller screens
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #60a5fa; // Light blue on hover
    }

    @media (max-width: 768px) {
      font-size: 12px; // Further decrease font size on small screens
    }
  `;

  const MobileMenu = styled.div`
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #1f2937; // Dark background for mobile menu
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 999;

    @media (min-width: 768px) {
      display: none;
    }
  `;

  const MobileNavItem = styled(Link)`
    text-decoration: none;
    color: #f9fafb; // Light mobile link color
    font-size: 18px;
    padding: 10px 20px;
    transition: background 0.3s;

    &:hover {
      background-color: #444; // Darker background on hover
    }
  `;

  export default NavBar;
