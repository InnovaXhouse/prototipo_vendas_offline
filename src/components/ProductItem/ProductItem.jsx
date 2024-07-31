import React from 'react';
import { useBasket } from '../BasketContext';
import { Card, CardMedia, CardContent, Typography, Button, Stack } from '@mui/material';

const ProductItem = ({ product }) => {
  const { state, dispatch } = useBasket();

  const handleAddItem = (id) => {
    dispatch({ type: 'ADD_ITEM', id });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
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
          Referência: {product.reference}
        </Typography>
        {product.variations.map((variation, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.primary">
              {variation}
            </Typography>
            <Button size="small" onClick={() => handleAddItem(`${product.id}_${index}`)}>+</Button>
            <Typography>{state.items[`${product.id}_${index}`] || 0}</Typography>
            <Button size="small" onClick={() => handleRemoveItem(`${product.id}_${index}`)}>-</Button>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}

export default ProductItem;