import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { Grid } from '@mui/material';

const ProductList = ({ products }) => {
    return (
        <Grid container spacing={2}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductItem product={product} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
