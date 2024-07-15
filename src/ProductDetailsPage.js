import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import api from '../services/api';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Replace with actual API call to fetch product details by productId
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <Typography variant="body1">Loading product details...</Typography>;
  }

  if (!product) {
    return <Typography variant="body1">Product not found.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Typography variant="h5" gutterBottom>
        {product.productName}
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
    </Container>
  );
};

export default ProductDetailsPage;
