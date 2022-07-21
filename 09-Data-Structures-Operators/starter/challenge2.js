// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order(startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },
  orderDelievery: function ({
    startIndex = 0,
    mainIndex,
    address,
    time = 'UNDEFINEDDD',
  }) {
    console.log(startIndex, mainIndex, address, time);
    console.log(
      `Order received! ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

restaurant.orderDelievery({
  // time: '22:30',
  address: 'Jhangi Syedan',
  mainIndex: 2,
  startIndex: 2,
});

let variable = restaurant.openingHours.fri;
console.log(variable);
let arr = [2, 3, 4];
const [x, y, z] = arr;
let [a1, , a3] = restaurant.categories;

// swaping
console.log(a1, a3);
[a1, a3] = [a3, a1];
console.log(a1, a3);

// Returning 2 values from a function
let [a2, b2] = restaurant.order(2, 1);

// Nested
const nested = [1, 2, [3.1, 3.2]];
console.log(nested);

// Destructuring
let a = 0;
let b = 0;
const { name, openingHours } = restaurant;
// OR
const { name: MyName, openingHours: Hours, starterMenu } = restaurant;
const obj = { abc: 23, b: 7, c: 14 };
({ abc: a, b } = obj);
console.log(a, b);
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//  <<<<< FUNCTIONS >>>>>>

// Variable Aurguments length
const f = function (...All) {
  console.log(All);
};

f(11, 22, 33);
f(123, 567, 9987, 5, 3, 345);

// THE SPREAD OPERATOR (...)

arr = [7, 8, 9];
const newArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(newArr);
const sArr = [1, 2, ...arr];
console.log(sArr);
const menuu = [...restaurant.mainMenu, 'Baryani'];
console.log(menuu);

let r1 = [2, 3, 4];
let r2 = [...r1];
r1 = [1, 1, 1];
console.log(r1);

const menu = [...starterMenu, ...menuu];
console.log(menu);

// Iterables are arrays, strings, maps, sets but NOT objects
const str = 'Zeshan';
console.log(str[2]);
const myArr = [...str]; // Converting string to array
console.log(myArr);
const sttt = `${myArr}`;
console.log(sttt);

// Making Objects
const newRes = {
  foundedIn: 1998,
  ...restaurant,
  founder: 'Guiseppe',
};

console.log(newRes);

// REST PATTERNS AND PARAMETERS (Opposite to Spread Operator)
// [ It used at the left side of the equality operator.]

const [a5, b5, ...others] = [1, 2, 3, 4, 5];
console.log(others);

const { openingHours: oH, ...Ress } = restaurant;
console.log(Ress);

// SHORT CIRCUITING (&& and ||)

console.log(3 || 'Zeshan'); // 3

// example

// let guests = prompt('Enter Guests Num:');
console.log('----- OR -----');
let guests = 0;
let printt = guests || 'No Guests arrived!';
console.log(printt);

console.log('----- AND -----');
let guests2 = 0;
let printt2 = guests2 && 'No Guests arrived!'; // Not a right solution
console.log(printt2);

// Nullish Coalescing ( Difference is that : Here truthy values are only NULL and UNDEFINED values.)

let x4 = 0;
console.log(x4 || 'Its true!');
console.log(x4 && 'Its true!');

// Logical Assignment Operator

const rest1 = {
  name: 'Zeshan',
  age: 0,
};

const rest2 = {
  name: 'Hamza',
  year: 2020,
};
// rest1.age ||= 20;
// rest2.age ||= 20;
rest1.age ??= 0;
rest2.age ??= 0;
console.log(rest1.age);
console.log(rest2.age);

// OPTIONAL CHAINING (?.)

// console.log(restaurant.openingHours.mon.open);
console.log(restaurant?.openingHours?.mon?.open);

// METHODS
// optional chainging for methods
console.log(restaurant.orderrrrr?.(0, 1) ?? 'Method does not exist');
// optional chainging for arrays

const users = [
  {
    name: 'zeshan',
    email: 'zeshan@gmail.com',
  },
];
console.log(users[1]?.name ?? 'User array empty!');

// LOOPING OBJECTS
// Object Keys
for (const day of Object.keys(openingHours)) {
  console.log(day);
}
console.log(Object.keys(openingHours));
console.log(Object.values(openingHours));
console.log(Object.entries(openingHours));

for (const [keys, { open, close }] of Object.entries(openingHours)) {
  console.log(keys, open, close);
}

// Football Game
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
// console.log(game['x']);
// 1
for (const [goalNum, Name] of game.scored.entries()) {
  console.log(goalNum, Name);
}

// 2
odds = Object.values(game.odds);
let average = 0;
for (const o of odds) average += o;
console.log(average);
average /= odds.length;
console.log(average);

// 3

for (let [team, odd] of Object.entries(game.odds)) {
  team == 'x' || console.log(`Odd of victory ${game[team]}: ${odd}`);
  team == 'x' && console.log(`Odd of draw: ${odd}`);
}

// BONUS

let players = Object.values(game.scored);
const scorers = {};
// for (const name of players) scorers[name] = 0;
for (const name of players)
  scorers[name] != undefined
    ? (scorers[name] = scorers[name] + 1)
    : (scorers[name] = 1);

console.log(scorers);

// SETS ( NO REPITITIONS)

const orderSet = new Set([1, 2, 3, 4, 5]);
orderSet.add('88');
console.log(...orderSet);
orderSet.delete('88');
console.log(...orderSet);
orderSet.clear();
console.log(orderSet);
let arrr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 11];
console.log(new Set([...arrr]).size);

// MAPS [ Keys can be arrays, numbers, booleans NOT ONLY STRINGS like we have in objects]

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Zeshoooooooooo');
rest.set('open', 11).set('close', 23);
console.log(rest.get(1));

// consecutively!
rest
  .set(5, '5')
  .set(6, 'umair00')
  .set(true, 'WE ARE OPEN!')
  .set(false, 'WE ARE CLOSE!');
console.log(rest.set(2, 'Umairrrriiii'));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
rest.delete('name');
console.log(rest);
rest.clear();
const arr2 = [1, 2, 3];
const arr4 = [1, 2, 3];
rest.set(arr2, 'ARRAY');
console.log(rest.get(arr2));
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

// Iterating the MAPS
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Js'],
  [true, 'Correct 🎉'],
  [false, 'Try Again 😢'],
  ['correct', 3],
]);
console.log(question);

// Convert Object to Map
console.log(...Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key == 'number') {
    console.log(`Option ${key}: ${value}`);
  }
}
// const answer = Number(prompt('Enter Answer: 1/2/3'));
console.log(question.get(question.get('correct') === answer));
