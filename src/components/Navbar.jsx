import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #141414;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  color: white;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/popular">Popular</NavItem>
      <NavItem to="/search">Search</NavItem>
      <NavItem to="/wishlist">Wishlist</NavItem>
    </NavContainer>
  );
};

export default Navbar;
