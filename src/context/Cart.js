import React from 'react';
import { PRODUCTS } from '../db/products';

export const CartContext = React.createContext();

export class CartProvider extends React.Component {
  constructor() {
    super();
    const products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
    this.state = {
      cart: {
        items: [],
      },
      products,
    };
  }

  productIndexByName(productName) {
    const productIndex = this.state.cart.items.findIndex(
      (item) => item.name === productName
    );

    if (productIndex === -1) {
      throw new Error(
        `Product with name: ${productName} was not found in the cart`
      );
    }

    return productIndex;
  }

  addItemToCart(product) {
    product.cartQuantity = 1;

    this.setState({
      cart: { items: [...this.state.cart.items, product] },
    });

    return;
  }

  addProductQuantity(product, amount) {
    if (amount < 1) {
      throw new Error(`Amount: ${amount} is less than 1`);
    }

    const productIndex = this.productIndexByName(product.name);

    const newItems = [...this.state.cart.items];
    newItems[productIndex].cartQuantity += amount;

    this.setState({
      cart: { items: newItems },
    });

    return;
  }

  removeProductQuantity(product, amount) {
    if (amount < 1) {
      throw new Error(`Amount: ${amount} is less than 1`);
    }

    const productIndex = this.productIndexByName(product.name);

    const newItems = [...this.state.cart.items];
    newItems[productIndex].cartQuantity -= amount;

    // if products are now zero or less, remove the item from the cart.
    if (newItems[productIndex].cartQuantity <= 0) {
      newItems[productIndex].cartQuantity = 0;
      newItems.splice(productIndex, 1);
    }

    this.setState({
      cart: { items: newItems },
    });

    return;
  }

  render() {
    const provided = {
      cart: this.state.cart,
      products: this.state.products,
      addItemToCart: (product) => this.addItemToCart(product),
      addProductQuantity: (product, amount) =>
        this.addProductQuantity(product, amount),
      removeProductQuantity: (product, amount) =>
        this.removeProductQuantity(product, amount),
    };

    return (
      <CartContext.Provider value={provided}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
