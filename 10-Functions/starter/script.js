'use strict';

// Functions Accepting Callback Functions

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const Transformer = function (str, fn) {
  console.log('Original String:', str);
  console.log('Transformed String: ', fn(str));
  console.log('Transformed By: ', fn.name + '()');
};

console.log(Transformer('Muhammad Zeshan Tahir', upperFirstWord));

const high5 = function () {
  console.log('👋');
};
['a', 'b', 'c'].forEach(high5);

// Functions returning Functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
};

const getGreet = greet('Hello');
console.log(getGreet('Zeshan'));

const greetArr = greeting => name => console.log(`${greeting}, ${name}!`); // Functions Returning functions in a single line.
greetArr('Hello')('Zeshan');

// The call and apply Methods

const book = function (flightNum, name) {
  console.log(
    `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
  );
  this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name: name });
};

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
};

book.call(lufthansa, 239, 'Zeshan Tahir');
book.call(lufthansa, 423, 'Umair Qaisar');
console.log(lufthansa);

const eurowings = {
  airline: 'Rurowings',
  iataCode: 'EW',
  bookings: [],
};

// Not Working
// book(23, 'Sarah Williams');

// As we used 'this' Keyword inside the 'Book()' function. So, we need to use the 'Call" property to tell that it is calling by which reference.
book.call(eurowings, 23, 'Sarah WIlliams');
// 'Apply' method is not used in modern js, as we have the '...' operator
let arr3 = [23, 'Sarah Williams'];
// book.apply(eurowings, arr3);
book.call(eurowings, ...arr3); // Same Functioning

// Bind Function
const bookEW = book.bind(eurowings);
bookEW(23, 'NEWWWW');
const bookLT = book.bind(lufthansa, 45); // Next argument '45' also binded to the bookLT.
bookLT('LT');

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // console.log(poll.question);
    // console.log(poll.options);
    for (const option of poll.options) {
      console.log(`${option}`);
    }
    const option = prompt('Choose the answer: (0/1/2/3)');
    poll.answers[option] += 1;
    poll.displayResults('string');
  },
  displayResults(type) {
    type === 'string'
      ? console.log(...poll.answers)
      : console.log(poll.answers);
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer);

poll.displayResults('arr');

// Immidiately Invoked Functions Expressions (IIFE) .. Used to hide the secret information from the outer scope!
console.log(
  '\n--------Immidiately Invoked Functions Expressions (IIFE)----\n\n'
);
const runOnce = function () {
  console.log('Once Running');
};
runOnce();

(function () {
  console.log('Once Running');
  const secretKey = '1231232';
})();

// console.log(secretKey); // ERROR

// CLOSURES
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
// booker();
// booker();
// console.dir(booker);

// example
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
const h = function () {
  const b = 50;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// re-assigning
h();
f();

// Example 2

const boardPassangers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers/`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait}seconds`);
};

// boardPassangers(180, 3);

// CODING CHALLENGE 2
let head = function () {};
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  head = function () {
    header.style.color = 'blue';
  };
})();

document.querySelector('body').addEventListener('click', head);

// ARRAYS

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, -1));

// SPLICE ( Cut those elements from the original array)
console.log(arr.splice(2));
arr.splice(1, 2);
console.log(arr);

// REEVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.reverse());
console.log(arr);

// CONCAT
let arr2 = ['f', 'g', 'h'];
const letters = arr.reverse().concat(arr2);
console.log(letters);

// JOIN
console.log(letters.join('.'));

//New at method

arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(-1));
// console.log(arr.at(2));

// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// For Each

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements.forEach(function (movement) {
  console.log(movement);
});

movements.forEach(function (mov, i, arr) {
  console.log(i);
});

// For Each with Maps and Sets
const currencies = new Map([
  ['USD', 'UNSSSDDDDD'],
  ['sUSD', 'sUNSSSDDDDD'],
  ['2USD', '2UNSSSDDDDD'],
]);
console.log(currencies);
currencies.forEach(function (value, key, map) {
  console.log(value, key);
});

const sett = new Set(['1', '4', 'd', '4']);
sett.forEach(function (value, _, set) {
  console.log(value);
});
