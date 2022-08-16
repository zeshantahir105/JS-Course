// import { addToCart, cart } from './shoppingCart.js';
// import showProduct from './shoppingCart.js'; // IT WILL IMPORT THE FUNCTION WITH THE KEYWORD 'default'
// ('./shoppingCart.js');
// console.log('Importing Module');

// addToCart('Baryani', 5);

// showProduct('Pastaaa!!');
// console.log(cart);
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

//

import cloneDeep from 'lodash-es';

const state = {
  cart: {
    product: 'bread',
    quantity: 5,
  },
  user: {
    loggedIn: true,
  },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = state;
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

import 'core-js/stable';
