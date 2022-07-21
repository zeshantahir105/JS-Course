'use strict';
// let hasDriversLicence = false;
// const passTest = true;

// if (passTest) hasDriversLicence = true;
// if (hasDriversLicence) console.log('I can Drive!');

// // const interface = 'Audio';

// //  F U N C T I O N S

// function logger() {
//     console.log('function ')
// }

// // Calling / running / invoking function
// logger();

// function food(apples, oranges) {
//     console.log(apples, oranges);
//     const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//     return juice;
// }

// console.log(food(5, 0));

// //  ANOTHER WAY OF MAKING FUNCTIONS
// const myJuice = function (apples, oranges) {
//     const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//     return juice;
// }
// console.log(myJuice(2, 9));

// //  Arrow Functions (One liner functions)

// const age = birthYear => 2022 - birthYear;
// const find = age(2000);
// console.log(find)

// // Arrow Function for more than 1 variable.
// const ret = (year, name) => {
//     return year + name;
// }

// //  Coding Challenge 1

// function checkWinner(avgDolphins, avgKoalas) {
//     if (avgDolphins >= 2 * avgKoalas) return 'Dolphins';
//     else if (avgKoalas >= 2 * avgDolphins) return 'Koalas';
//     else return 'No Winner 🤢';
// }

// var d1 = 44;
// var d2 = 23;
// var d3 = 71;
// var k1 = 65;
// var k2 = 54;
// var k3 = 49;

// var DolphinAverage = (d1 + d2 + d3) / 3;
// var KoalasAverage = (k1 + k2 + k3) / 3;

// var winner = checkWinner(DolphinAverage, KoalasAverage);
// console.log(winner)

// // ARRAYS
// var myarray = ['a', 'b', 'c'];
// // OR
// var myarr = new Array(2, 5, 4, 5, 6, 5, 7, 8);
// myarr.push(12);
// console.log(myarr)
// myarr.unshift('start'); // For putting it in the start.
// console.log(myarr)
// myarr.pop();
// console.log(myarr)
// myarr.shift(); // Removing the first element of an array.
// console.log(myarr)
// console.log(myarr.indexOf(5))
// console.log(myarr.includes(4)) // To find an element in the array.

// CODING CHALLENGE 2

// var bill = prompt("Enter bill amount: ");
// bill = Number(bill)

// function calcTip(bill) {
//     let tip = 0;
//     bill = Number(bill);
//     bill > 50 && bill < 300 ? tip = bill * 0.15 : tip = bill * 0.20;
//     return tip;
// }

// console.log(calcTip(100));
// let bills = [125, 555, 44];
// var tips = [];
// tips.push(calcTip(bills[0]));
// tips.push(calcTip(bills[1]));
// tips.push(calcTip(bills[2]));
// console.log(tips);

//  INTORDUCTION TO OBJECTS

// const zeshan = {
//     firstName: 'Muhammad Zeshan',
//     lastName: 'Tahir',
//     age: 22,
//     job: 'Web Developer',
//     driverLicence: false,
//     calcBirthDate: function (year) {
//         return year - this.age;
//     },

//     summary: function () {
//         console.log(`${this.firstName} ${this.lastName} is a ${this.age}-year old employee, and he ${this.driverLicence ? 'has' : 'does not have'} driver licence!`);
//     }
// }

// console.log(zeshan.lastName);
// // OR
// console.log(zeshan['lastName']);

// // Checking if the element is in the object.

// if (zeshan['age']) {
//     console.log('YES EXISTS !')
// }

// // Updating Value
// zeshan.job = 'Junior Web Developer';
// console.log(zeshan.job)
// zeshan['joiningYear'] = 2022;
// console.log(zeshan.joiningYear);

// console.log(zeshan.calcBirthDate(2022));
// console.log(zeshan.summary());

// // CODING CHALLENGE 3

// let Mark = {
//     fullname: 'Mark',
//     mass: 78,
//     height: 1.69,

//     calcBMI: function () {
//         return this.mass / this.height ** 2;
//     }
// }

// let John = {
//     fullname: 'John',
//     mass: 92,
//     height: 1.95,

//     calcBMI: function () {
//         return this.mass / this.height ** 2;
//     }
// }

// var BMIs = [];

// Mark.calcBMI() > John.calcBMI() ? BMIs.push(Mark, John) : BMIs.push(John, Mark);
// // console.log(BMIs)
// console.log(`${BMIs[0].fullname}'s BMI (${BMIs[0].calcBMI()}) is higher than ${BMIs[1].fullname}'s (${BMIs[1].calcBMI()})`);

// FOR LOOPS

// for (let i = 0; i < 10; i++) {
//     if (i == 5) continue; // continue will skip all the lines next to it if the condition would be true.
//     console.log(`${i}`);
// }
// 0 1 2 3 4 6 7 8 9

//  WHILE LOOPS
// let i = 0
// while (i < 5) {
//     i++;
//     console.log(Math.trunc(Math.random() * 6) + 1)
// }

// CODING CHALLENGE 4

function calcTip(bill) {
  let tip = 0;
  bill = Number(bill);
  bill > 50 && bill < 300 ? (tip = bill * 0.15) : (tip = bill * 0.2);
  return tip;
}

let bills = [22, 295, 176, 440, 37, 105, 10, 110, 86, 52];
let tips = [],
  totals = [];

for (let i = 0; i < bills.length; i++) {
  let tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(bills[i] + tip);
}
console.log(bills);
// console.log(tips);
// console.log(totals);

// SECTION 5 - CODING CHALLENGE 1
