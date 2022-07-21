'strict';
const removeUnderscore = function (str) {
  str = str.split('_').join('');
  return str;
};

// 1
console.log(
  removeUnderscore('underscore_case'.padEnd(20, ' ').padEnd(21, '✅'))
);
// 2
console.log(
  removeUnderscore(' first_name').trim().padEnd(19, ' ').padEnd(21, '✅')
);
// 3
let newStr = removeUnderscore('Some_Variable');
console.log(
  newStr
    .replace(newStr[0], newStr[0].toLowerCase())
    .padEnd(19, ' ')
    .padEnd(22, '✅')
);
// 4
newStr = ' calculate_AGE';
let a = newStr.slice(-2).toLowerCase();
let b = newStr.slice(0, newStr.length - 2);
let c = [b, a];
c = c.join('').trim();
console.log(removeUnderscore(c).padEnd(19, ' ').padEnd(23, '✅'));
// 5
newStr = 'delayed_departure';
let [k, l] = newStr.split('_');
l = l.replace('d', 'D');
console.log([k, l].join('').padEnd(19, ' ').padEnd(25, '✅'));

// STRING METHODS PRACTICE
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

for (const flight of flights.split('+')) {
  let [a, b, c, d] = flight.slice(1).split(';');
  let s = [
    a.split('_')[0] === 'Delayed' ? '🔴' : '',
    a.replace('_', ' '),
    'from',
    b.slice(0, 3).toUpperCase(),
    'to',
    c.slice(0, 3).toUpperCase(),
    '(' + d.replace(':', 'h') + ')',
  ]
    .join(' ')
    .padStart(50, ' ');
  console.log(s);
}
