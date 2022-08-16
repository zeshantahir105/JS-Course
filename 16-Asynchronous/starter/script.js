'use strict';

console.log('<< Async JavaScript! >>');
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   console.log(request.responseText);
//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     let data = JSON.parse(this.responseText);
//     data = data[0];
//     console.log(data);
//     const html = `
//     <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h 4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//     </article>
//         `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h 4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryDataAndNeighbour = function (country) {
  //   AJAX Call Country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  console.log(request.responseText);
  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    let data = JSON.parse(this.responseText);
    data = data[0];
    // Render Country 1
    renderCountry(data);
    // Get Neighbour Country
    const neighbour = data.borders?.[0];
    // console.log(neighbour);

    if (!neighbour) throw new Error('No neighbour found!');

    // AJAX Call Country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      //   console.log(data2);
      //   console.log(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

// Asynchronous JavaScript
// getCountryDataAndNeighbour('Pakistan');
// getCountryDataAndNeighbour('pakistan');
// getCountryDataAndNeighbour('Germany');

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

const request = fetch(`https://restcountries.com/v2/name/pakistan`);
// console.log(request);

const getJSON = function (url, errorMsg = 'Something went wrong ') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg}(${response.status})`);
    return response.json();
  });
};

// CHAINING PROMISES

const getCountryData = function (country) {
  // Handling FULFILLED promise
  // .json is the async function ( it will return promise )
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found!`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');

      //   Country 2 ( NEIGHBOUR )
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err =>
      renderError(`Something went wrong 🤔 ${err.message}. Try AGAIN!`)
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// btn.addEventListener('click', function () {
//   getCountryData('Australia');
// }),
//   { once: 'true' };
// getCountryData('usa');

// Event Loop in practice

// console.log('Test Start'); // 1
// setTimeout(() => console.log(' 0 sec timer'), 0); // 5
// Promise.resolve('Resolved Promise 1').then(res => console.log(res)); // 3
// console.log('Test End'); // 2

// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res); // 4
// });

// // Building a simple promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('Win');
//     } else {
//       reject(new Error('You lost'));
//     }
//   }, 1000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('1s Passed!');
//     return wait(0);
//   })
//   .then(() => {
//     console.log('2s Passed!');
//     return wait(0);
//   })
//   .then(() => {
//     console.log('3s Passed!');
//     return wait(0);
//   })
//   .then(() => {
//     console.log('4s Passed!');
//     return wait(0);
//   });

// Promise.resolve('abc').then(x => console.log(x));
// Promise.resolve(new Error('Problem!')).catch(x => console.error(x));

// Proimisfying the Geolocaiton API

navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.log(err)
);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // OR

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

// Consume Promises with Async/Await

const whereAmI = async function (country) {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // Reverse geocoding
  const resGeo = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=610414598993639380259x24873`
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo);
  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  const data = await res.json();
  renderCountry(data[0]);
  return `Your city is ${dataGeo.city}`;
};
whereAmI('pakistan');
whereAmI('china');
console.log('FIRST');

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// Returning values from async functions

// console.log('1');
// // const city = whereAmI('Pakistan');
// console.log(whereAmI('Pakistan').then(value => console.log(value)));
// console.log(2);
// console.log(3);

(async function () {
  try {
    const city = await whereAmI('Pakistan');
    console.log(`1: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  } finally {
    console.log(`3: DONE!`);
  }
})();

(async function () {
  // Promise.race ( it will return fastest output )
  const res = await Promise.race('x', 'y', 'z');
  console.log(res);
})();
