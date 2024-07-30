import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { useCart } from '../Contexts/CestaContext';

const CartIcon = ({ onClick }) => {
  const { cart } = useCart();

  return (
    <IconButton color="inherit" onClick={onClick}>
      <Badge badgeContent={cart.length} color="secondary">
        CESTA
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
