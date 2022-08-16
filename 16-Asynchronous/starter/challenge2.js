// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const images = document.querySelector('.images');
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       images.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not found 😿'));
//     });
//   });
// };

// document.querySelector('.btn-country').style.display = 'none';

// const imgPath = 'img/img-1.jpg';

// let currentImg;
// createImage(imgPath)
//   .then(img => {
//     currentImg = img;
//     console.log(`${img.src.replace(/^.*[\\\/]/, '')} Loaded !!`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`${img.src.replace(/^.*[\\\/]/, '')} Loaded !!`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.log(`ERROR FOUND : ${err}`));
