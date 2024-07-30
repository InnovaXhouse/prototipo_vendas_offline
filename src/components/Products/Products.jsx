import React, { useState } from 'react';
import { useCart } from '../Contexts/CestaContext';
import { Card, CardMedia, CardContent, Typography, Button, Select, MenuItem } from '@mui/material';

const Product = ({ product }) => {
  const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
  const { addItem } = useCart(); // Usar o hook para adicionar itens ao carrinho

  const handleAddToCart = () => {
    addItem({
      ...product,
      selectedVariation
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          R$ {product.price.toFixed(2)}
        </Typography>
        <Select
          value={selectedVariation}
          onChange={e => setSelectedVariation(e.target.value)}
          fullWidth
        >
          {product.variations.map(variation => (
            <MenuItem key={variation} value={variation}>{variation}</MenuItem>
          ))}
        </Select>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;
