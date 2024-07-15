// ProductList.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ProductCard>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.productName}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price}
                <br />
                Rating: {product.rating}
                <br />
                Discount: {product.discount}%
                <br />
                Availability: {product.availability}
              </Typography>
            </CardContent>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
