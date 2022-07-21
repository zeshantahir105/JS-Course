'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // Clear all other stuff

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movements.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${move}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}₤`;

  const outgoings = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoings)}₤`;

  const interests = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * 1.2) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${Math.abs(interests)}₤`;
};
calcDisplaySummary(account1.movements);

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
currentAccount = account2;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const Julia = [3, 5, 2, 12, 7];
// const Kate = [4, 1, 15, 8, 3];
const Julia = [9, 16, 6, 8, 3];
const Kate = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  let dogs = dogsJulia.slice(1, 3);
  dogs = dogs.concat(dogsKate);

  (function () {
    dogs.forEach(function (age, index) {
      console.log(
        `Dog number ${index + 1} is ${
          age >= 3
            ? `is an adult, and is ${age} years old`
            : `is still a puppy 🐶`
        }`
      );
    });
  })();
};

// MAP,Filter and Reduce

// MAP ( Itereation minimizes )

const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const moveDes = movements.map((mov, i, arr) => {
  return mov * 2;
});
console.log(moveDes);

// Computing Usernames

const user = 'Muhammad Zeshan Tahir'; //mzt
const username = user
  .toLowerCase()
  .split(' ')
  .map(x => x[0])
  .join('');
console.log(username);

// Filter Method

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
// OR
const deposits_short = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

// reduce
// Accumulate -> SNOWBALL (It stores all the previous values!!!)
const balance = movements.reduce(function (accumulator, currentValue, i, arr) {
  return accumulator + currentValue;
}, 100);
// ^^^100 after comma actually, intiliazes the value of accumulator.
console.log(balance);

const calcPrintBalance = movements.reduce((acc, cur) => acc + cur, 0);
document.querySelector('.balance__value').textContent =
  calcPrintBalance + 'PKR';

// Coding Challenge 2
// [Updated to]Challenge #3
const data = [5, 2, 4, 1, 15, 8, 3];
// const data = [16, 6, 10, 5, 6, 1, 4];

const average = data
  .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age >= 18)
  .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

console.log(average);

// Find Method ( Useful while finding a special value by knowing the special value of some propert as wwe have done below)
console.log(movements.find(mov => mov < 0));
console.log(accounts.find(acc => acc.owner === 'Jessica Davis'));

////////------------ WHILE LOGIN
// e.preventDefault() It prevents the form from submitting.
//////////////////////////

// Find Index Method ( Return Index of Found Element )
console.log(movements.findIndex(mov => mov == 70));
console.log(movements.includes(1300));
console.log(movements.some(mov => mov > 1500)); // at least 1 element satisfies the equation.
console.log(movements.every(mov => mov > 0)); // all elements must satisfy the condition to be TRUE

//

const owners = ['jonas', 'zach'];
console.log(owners.sort());

// Sorting the numbers

console.log(
  movements.sort((a, b) => {
    return a - b;
  })
);

// Fill
let x = new Array(5);
// x.fill(3);
// x.fill(5, 2); // insert 5s after 2nd index
x.fill(5, 1, 3); // insert 5s after 1st index to 2nd index
console.log(x);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
  // console.log(movementsUI.map(el => el.textContent.replace('€', '')));
});

// CHALLLENGE

// ex 1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// ex 2
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000);
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposits1000);

// ex3
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

// 4

const convertTitleCase = function (title) {
  const expectation = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titlecase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      expectation.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titlecase;
};
console.log(convertTitleCase('the changing the title case'));
console.log(convertTitleCase('or changing the TITLE case'));
console.log(convertTitleCase('with changing the title CASE'));

// Coding Challenge 4
/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(({ weight, curFood, owners }, i, all) => {
  dogs[i].recommended = (weight * 0.75 * 28) / 1000;
});
// console.log(dogs);

// 2
// let dog = dogs.find(item => item.owners.includes('Sarah'));

//3
let eating = function (dog) {
  let x =
    dog.curFood / 1000 > dog.recommended + dog.recommended * 0.1
      ? 'too much'
      : dog.curFood / 1000 < dog.recommended - dog.recommended * 0.1
      ? 'too little'
      : 'ok';
  // console.log(x);
  return x;
};

let tooMuch = [];
let tooLittle = [];
let ok = [];
dogs.forEach((dog, i, all) => {
  console.log(eating(dog));
  if (eating(dog) == 'too much') {
    tooMuch.push(dog.owners);
  } else if (eating(dog) == 'too little') {
    tooLittle.push(dog.owners);
  } else {
    ok.push(dog.owners);
  }
});
console.log(`${tooMuch} eats too much.`);
console.log(`${tooLittle} eats too little.`);
console.log(`${ok} eats ok.`);

console.log(...dogs);
const dogsSorted = dogs.slice().sort((a, b) => a.recommended - b.recommended);
console.log(...dogsSorted);
