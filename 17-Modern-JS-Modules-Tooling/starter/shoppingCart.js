// import './shoppingCart.js';
console.log('Exporting module');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
};
export default function (product) {
  console.log(`You entered ${product}!`);
}
addToCart('HIHII', 6);

// export default cart;
const totalPrice = 237;
const totalQuantity = 23;
