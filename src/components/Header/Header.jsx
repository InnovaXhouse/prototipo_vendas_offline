import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Cart from '../Cart/Cart';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Catálogo de Anéis
        </Typography>
        <Cart />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
