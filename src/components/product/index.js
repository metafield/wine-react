import React, { Component } from 'react';
import { CartContext } from '../../context/Cart';

export default class Product extends Component {
  render() {
    const product = this.props.product;
    const testId = this.props.testId;

    const cartActions = (
      <CartContext.Consumer>
        {(context) => (
          <>
            <div className="layout-row justify-content-between align-items-center">
              <button
                className="x-small icon-only outlined"
                data-testid="btn-quantity-subtract"
                onClick={() => context.removeProductQuantity(product, 1)}
              >
                <i className="material-icons">remove</i>
              </button>

              <input
                type="number"
                disabled
                className="cart-quantity"
                data-testid="cart-quantity"
                value={product.cartQuantity}
              />

              <button
                className="x-small icon-only outlined"
                data-testid="btn-quantity-add"
                onClick={() => context.addProductQuantity(product, 1)}
              >
                <i className="material-icons">add</i>
              </button>
            </div>
          </>
        )}
      </CartContext.Consumer>
    );

    const addItemToCartBtn = (
      <CartContext.Consumer>
        {(context) => (
          <>
            <button
              className="x-small outlined"
              data-testid="btn-item-add"
              onClick={() => context.addItemToCart(product, 1)}
            >
              Add To Cart
            </button>
          </>
        )}
      </CartContext.Consumer>
    );

    const actions = product.cartQuantity > 0 ? cartActions : addItemToCartBtn;

    return (
      <section className="w-30" data-testid={'product-item-' + testId}>
        <div className="card ma-16">
          <img
            alt="Your Cart"
            src={this.props.product.image}
            className="d-inline-block align-top product-image"
          />
          <div className="card-text pa-4">
            <h5 className="ma-0 text-center">{product.name}</h5>
            <p className="ma-0 mt-8 text-center">${product.price}</p>
          </div>
          <div className="card-actions justify-content-center pa-4">
            {actions}
          </div>
        </div>
      </section>
    );
  }
}
