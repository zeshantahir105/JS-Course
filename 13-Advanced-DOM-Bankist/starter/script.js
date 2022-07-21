'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const dotsContainer = document.querySelector('.dots');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//console.log(document.documentElement);
//console.log(document.head);
//console.log(document.body);
//console.log(document.querySelector('.header'));
//console.log(document.querySelectorAll('.header'));
//console.log(document.getElementsByTagName('button'));

// Creating and Inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent('We used cookies 😁');
message.innerHTML =
  'We used cookies 😁. <button class="btn btn--close-cookie" style="margin: 10px;">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = '#37363d';
message.style.width = '120%';
//console.log(message.style.backgroundColor);
//console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
//console.log(message.style.height);
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo ');
//console.log(logo.alt);
//console.log(logo.src); // absolute path
//console.log(logo.getAttribute('src')); // relative path
//console.log(logo.className);
logo.alt = 'NICE LOGO DEAR 🙂';

//console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

// Data Attributes
//console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('z');
logo.classList.remove('z');
// logo.classList.toggle('z');
//console.log(logo.classList.toggle('z')); // Will add the class if not exists and remove the class if already exists.
//console.log(logo.classList.toggle('z'));
//console.log(logo.classList.contains('z'));

// SMOOTHLY SCROLLING

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  //console.log(s1coords);
  //console.log(e.target.getBoundingClientRect());
  //console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Implementing the Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     //console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // //console.log(e.target);

  // // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Types of Events and Event Handlers

const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('MOUSEEEE IS HEREERRER 😂');
// });

// h1.onmouseenter = function (e) {
//   alert('Second alert');
// };

const myAlert = function (e) {
  // alert('Tada!');
  h1.removeEventListener('mouseenter', myAlert);
};
h1.addEventListener('mouseenter', myAlert);
setTimeout(() => h1.removeEventListener('mouseenter', myAlert), 3000);

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//console.log(randomColor());
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // e.stopPropagation();
});

// DOM TRAVERSING

// const h1 = document.querySelector('h1');
//console.log(h1.querySelectorAll('.highlight'));
//console.log(h1.childNodes);
//console.log(h1.children);
h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: oarents
//console.log(h1.parentNode);
//console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways : siblings
//console.log(h1.previousSibling);
//console.log(h1.nextSibling);
[...h1.parentElement.children].forEach(function (el) {
  // if (el !== h1) el.style.transform = 'scale(0.5)';
});

// Building a tabbed component

const tabs = document.querySelectorAll('.ssssssssssssssoperations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => //console.log('TAB')));

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);

  // Gaurd clause
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  for (let id = 1; id <= 3; id++) {
    if (id == clicked.dataset.tab) {
      // Activate content area
      document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
    } else {
      document
        .querySelector(`.operations__content--${id}`)
        .classList.remove('operations__content--active');
    }
  }
});

// Menu fade animation

const handleHover = function (e, opacity) {
  const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
  siblings.forEach(el => {
    if (el !== e.target) el.style.opacity = opacity;
    logo.style.opacity = opacity;
  });
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// Sticky Header

const navHeight = nav.getBoundingClientRect().height;

const initialCoords = section1.getBoundingClientRect();
// // //console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // //console.log(this.window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// // Sticky navigation : Intersection Oberver API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     // //console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // nav.classList.add('sticky');
};
// const header = document.querySelector('.header');
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,
  rootMargin: '200px',
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  // console.log('Observed!');

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));

let curSlide = 0;

// Slider
const slides = document.querySelectorAll('.slide');
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.3) translateX(-750px)';
// slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide= ${i}></button>`
    );
  });
};

createDots();

const activeDot = function (dot) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  dot.classList.add('dots__dot--active');
};

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // console.log(e.target);
    const { slide } = e.target.dataset;
    // console.log(slide);
    gotoSlide(slide);
    // console.log(dotsContainer);
  }
});

const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );

  document.querySelectorAll('.dots__dot').forEach(s => {
    if (s.getAttribute('data-slide') == slide) {
      activeDot(s);
    }
  });
  curSlide = slide;
};
gotoSlide(0);

const nextSlide = function () {
  curSlide = (curSlide + 1) % slides.length;
  gotoSlide(curSlide);
};
const prevSlide = function () {
  curSlide =
    curSlide > 0
      ? (curSlide - 1) % slides.length
      : (curSlide = slides.length - 1);
  gotoSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
// console.log(sliders);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

// Life Cycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});
// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded!');
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
