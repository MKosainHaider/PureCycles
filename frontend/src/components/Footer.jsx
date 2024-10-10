import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaStrava,
} from "react-icons/fa";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        {/* Shop Section */}
        <FooterSection>
          <FooterHeading>SHOP</FooterHeading>
          <FooterList>
            <FooterItem>
              <a href="/" className="hover:underline">
                Bikes
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Accessories
              </a>
            </FooterItem>
          </FooterList>
        </FooterSection>

        {/* Connect Section */}
        <FooterSection>
          <FooterHeading>CONNECT</FooterHeading>
          <FooterList>
            <FooterItem>
              <a href="tel:555-555-5555" className="hover:underline">
                (555) 255-5011
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Returns
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Warranty
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                FAQ
              </a>
            </FooterItem>
            <FooterItem>
              <a href="mailto:support@purecycles.com" className="hover:underline">
                support@purecycles.com
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Become a Dealer
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Register your Bike
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Privacy Policy
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                E-Bike Battery Recycling
              </a>
            </FooterItem>
          </FooterList>
        </FooterSection>

        {/* About Section */}
        <FooterSection>
          <FooterHeading>ABOUT</FooterHeading>
          <FooterList>
            <FooterItem>
              <a href="/" className="hover:underline">
                About
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Find a Dealer
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Press
              </a>
            </FooterItem>
            <FooterItem>
              <a href="/" className="hover:underline">
                Promotional Videos
              </a>
            </FooterItem>
          </FooterList>
        </FooterSection>

        {/* Don't Miss Out Section */}
        <FooterSection>
          <FooterHeading>DON'T MISS OUT</FooterHeading>
          <p>
            These days our bikes sell out fast! Sign up so you don't miss it.
          </p>
          <Form>
            <Input type="email" placeholder="Enter your email" />
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </Form>
          <SocialIcons>
            <SocialLink href="/">
              <FaInstagram size={24} />
            </SocialLink>
            <SocialLink href="/">
              <FaFacebookF size={24} />
            </SocialLink>
            <SocialLink href="/">
              <FaYoutube size={24} />
            </SocialLink>
            <SocialLink href="/">
              <FaTwitter size={24} />
            </SocialLink>
            <SocialLink href="/">
              <FaStrava size={24} />
            </SocialLink>
          </SocialIcons>
        </FooterSection>
      </FooterGrid>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  padding: 40px 40px; 
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2fr, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div`
  font-size: 14px;
`;

const FooterHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  letter-spacing: 2px;
`;

const FooterList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FooterItem = styled.li`
  margin-bottom: 10px;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #ccc;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #333;
  border: none;
  color: white;
  border-bottom: 2px solid white;
  outline: none;
  font-size: 14px;

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background-color: #ccc;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  transition: color 0.3s;

  &:hover {
    color: #ccc;
  }
`;

export default Footer;
