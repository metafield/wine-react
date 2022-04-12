import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import ProductList from './components/product-list';
import Cart from './components/cart';
import { CartContext, CartProvider } from './context/Cart';

const title = 'HackerShop';

class App extends Component {
  render() {
    return (
      <CartProvider>
        <CartContext.Consumer>
          {(context) => {
            return (
              <>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                  <ProductList products={context.products} />
                  <Cart />
                </div>
              </>
            );
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
  }
}
export default App;
