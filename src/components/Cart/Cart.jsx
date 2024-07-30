import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import CartIcon from '../CartIcon/CartIcon';
import { useCart } from '../Contexts/CestaContext';
const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <>
      <CartIcon onClick={() => toggleDrawer(true)} />
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <List style={{ width: '250px' }}>
          {cart.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={item.name} secondary={`Variação: ${item.selectedVariation} - Preço: R$${item.price.toFixed(2)}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Cart;
