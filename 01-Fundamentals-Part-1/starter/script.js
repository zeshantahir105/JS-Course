// let js = "amazing";
// // if (js == "amazing") alert("Hohoo!");
// console.log(2 + 3 * 20);

// // variables

// let variable = 3;
// var st = 'pakistan' + `zindabad`;
// var a = 2;
// var b = 2.0;
// if (a === b) alert(2 + 3 + '4' + 1 + 2)
// // alert(5 + 6 + '4' + 9 - 4 - 2)


// CODING CHALLENGE 1

// let massM = 78;
// let massJ = 92;

// let heightM = 1.69;
// let heightJ = 1.95;


// bmiM = massM / heightM ** 2;
// bmiJ = massJ / heightJ ** 2;

// var markHigherBMI = (bmiM > bmiJ);
// alert(markHigherBMI)



// CODING CHALLENGE 3

// var dol = 96;

// var key = 'abc';

// switch (key) {
//     case 'abc':
//         console.log('1 character is missing!');
//         break;
//     case 'abcw':
//         console.log('1 character is wrong!');
//         break;
// }


// a = 8;

// //  TERNARY OPERATOR
// a == 8 ? console.log('Conditional Statement') : console.log('Else Condition');


// Coding challenge 3
var bill = prompt("Enter bill amount: ");
bill = Number(bill)
let tip = 0;
bill > 50 && bill < 300 ? tip = bill * 0.15 : tip = bill * 0.20;
bill = bill + tip;
alert(bill)
