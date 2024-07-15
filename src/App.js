// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={AllProductsPage} />
          <Route path="/product/:productId" component={ProductDetailsPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
