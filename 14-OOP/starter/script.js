'use strict';
// OOP with JS

// CONSTRUCTOR FUNCTIONS

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  //   Dont add functions in the constructor functions
};
const jonas = new Person('Jonas', 1992);
// console.log(jonas);
// 1. New {} is created.
// 2. Function is called, this = {}
// 3. {} linked to prototype.
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('jack', 1975);
// console.log(matilda, jack);
// console.log(jonas instanceof Person); // True

// console.log(Person.prototype);

// Prototypes
Person.prototype.calcAge = function () {
  // console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
// console.log(jonas.birthYear);
// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.species = 'My Species';
// console.log(jonas.species);
// console.log(jonas.hasOwnProperty('species'));

// console.log(jonas.__proto__.__proto__);
// console.log(Person.prototype.constructor);
// console.log('asdasdasd');
console.dir(Person.prototype.constructor);
const arr = [3, 6, 4, 5, 6, 9, 3];
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

// console.log(arr.unique());
const h1 = document.querySelector('h1');
// console.log(h1.__proto__);

// // Challenge 1
// const car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// car.prototype.accelerate = function () {
//   this.speed += 10;
//   // console.log('Accelerated! : ', this.speed);
// };
// car.prototype.brake = function () {
//   this.speed -= 10;
//   // console.log('Applied Break! : ', this.speed);
// };

// const C = new car(1, 40);
// C.accelerate();
// C.brake();
// C.brake();

// ES6 Classes ( Using Class Expression )

// console.log('------------------------------');
// const PersonCl = class {};
class PersonCl {
  constructor(firstName, birthYear) {
    this.fullName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    // console.log('Khud nikalo boss 🤔');
  }

  get Nickname() {
    // console.log('ULUU');
  }
  // Setting
  set fullName(name) {
    // console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert('NOT A FULL NAME');
  }

  get fullName() {
    return this._fullName;
  }
}

const Umair = new PersonCl('Umair Qaiser', 1999);
// console.log(Umair);
// Umair.calcAge();
// Umair.Nickna
// Umair.fullName;

// CHALLENGE 2

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//   }

//   break() {
//     this.speed -= 10;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
//   get speedUS() {
//     return this.speed / 16;
//   }
// }

// const x = new Car('X', 35);
// x.accelerate();
// x.speedUS = 50;
// // console.log(x);
// // console.log('Pakistan');

// Inheritance between Constructor Functions
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);

  this.firstName = firstName;
  this.birthYear = birthYear;
  this.course = course;
};

const zesh = new Student('Zeshan', 2022, 'CE');
// Linking the prototypes.
// Student.prototype = Object.create(Person.prototype); // Emopty Object

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
console.log(zesh);
zesh.introduce();

// Coding Challenge #3

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};
Car.prototype.brake = function () {
  this.speed -= 5;
};
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= -1;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}`
  );
};
const Honda = new EV('Honda', 150, 10);
Honda.accelerate();
Honda.accelerate();
Honda.accelerate();
Honda.brake();
Honda.accelerate();
Honda.accelerate();
Honda.accelerate();
Honda.accelerate();
Honda.chargeBattery(90);
Honda.accelerate();

// Inheritance between classes.

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log('Introduce');
  }
}

const hamza = new StudentCl('M. Hamza', 2018, 'CE');
hamza.introduce();
hamza.calcAge();

// Challenge # 04

// class EVCL extends CarCl {
//   #charge;
//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.charge = charge;
//   }
// }
