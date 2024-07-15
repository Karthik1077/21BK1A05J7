// AllProductsPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  productCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const AllProductsPage = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [sortField, setSortField] = useState('price'); // Default sorting by price
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (category, sortField, page) => {
    try {
      setLoading(true);
      const response = await api.get(`/companies/AMZ/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category, sortField, page);
  }, [category, sortField, page]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1); // Reset page when category changes
  };

  const handleSortChange = (event) => {
    setSortField(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange}>
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Phone">Phone</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortField} onChange={handleSortChange}>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              {/* Add more sorting options as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {loading ? (
        <Typography variant="body1">Loading products...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.productCard}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            className={classes.pagination}
          />
        </>
      )}
    </Container>
  );
};

export default AllProductsPage;
