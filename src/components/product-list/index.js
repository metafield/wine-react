import React, { Component } from 'react';
import Product from '../product';
import './index.css';

export default class ProductList extends Component {
  render() {
    return (
      <div className="layout-row wrap justify-content-center flex-70 app-product-list">
        {this.props.products.map((product, i) => (
          <Product product={product} testId={i} key={product.id} />
        ))}
      </div>
    );
  }
}

export const UpdateMode = {
  ADD: 1,
  SUBTRACT: 0,
};
