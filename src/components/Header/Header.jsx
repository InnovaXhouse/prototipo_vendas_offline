import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import BasketModal from "./BasketModal";
import { useBasket } from "../BasketContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const { state } = useBasket();
  const [open, setOpen] = useState(false);

  const itemCount = Object.keys(state.items).reduce(
    (total, key) => total + state.items[key],
    0
  );

  return (
    <>
      <AppBar position="static" style={
        {
          marginBottom: '20px'
        }
      }>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Catálogo de Joias
          </Typography>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <BasketModal
        open={open}
        onClose={() => setOpen(false)}
        items={state.items}
      />
    </>
  );
};

export default Header;
