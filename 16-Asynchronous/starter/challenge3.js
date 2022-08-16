// Part 2

const imgPath = 'img/img-1.jpg';
const images = document.querySelector('.images');
let currentImg;
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found 😿'));
    });
  });
};
const loadAll = async function (imgArr) {
  const imgs = imgArr.map(img => createImage(img));
  console.log(imgs);
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg']);
