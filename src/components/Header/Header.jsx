import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, InputBase, Button } from '@mui/material';
import BasketModal from './BasketModal';
import { useBasket } from '../BasketContext';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const { state, products } = useBasket();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const itemCount = Object.keys(state.items).reduce(
    (total, key) => total + state.items[key],
    0
  );

  const filteredProducts = products
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <AppBar position="static" style={{ marginBottom: '20px' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Catálogo de Joias
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InputBase
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', padding: '2px 10px', marginRight: '10px' }}
            />
            <IconButton color="inherit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <BasketModal open={open} onClose={() => setOpen(false)} items={state.items} />
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <IconButton 
          color="primary" 
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',        
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', 
            padding: '10px',            
          }}
        >
          <Badge badgeContent={itemCount} color="secondary">
            <LocalMallIcon style={{ fontSize: 40, color: '#ffffff' }} />
          </Badge>
        </IconButton>
      </div>
    </>
  );
};

export default Header;