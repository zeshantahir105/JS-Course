'use strict';

class workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  _marker = '';
  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // kn/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cyc1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cyc1);

// prettier-ignore

const form = document.querySelector('.form');
const containerworkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const sidebar = document.querySelector('.sidebar');
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #coords;
  #removedWorkouts = [];
  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    this._render();
    const b11 = document.getElementById('reset_buttonn');
    b11.addEventListener('click', function () {
      localStorage.removeItem('workouts');
      location.reload();
    });

    //   function (e) {
    //     e.target.closest('.workout').remove();
    //     this.#map.removeLayer(e.target.closest('.workout').marker);
    //   })
    // );

    // Attach event handlers
    form.addEventListener('submit', this._newworkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    containerworkouts.addEventListener('click', this._moveToPopup.bind(this));
    this.#workouts.forEach(wo => {
      this._applyEventListenerToCross(wo);
      this._applyEventListenerToEdit(wo);
    });
    // document.querySelectorAll('.edit').addEventListener('click', function (e) {
    //   this._applyEventListenerToEdit(e);
    // });
  }
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        // ERROR SCNERIO
        alert("Couldn't get your position!");
      }
    );
  }
  _loadMap(position) {
    // SUCCESS SCNERIO
    // console.log('LOAD MAP!');
    const { latitude, longitude } = position.coords;
    // const { longitude } = position.coords;
    // console.log(position);
    // console.log(latitude, longitude);

    this.#coords = [latitude, longitude];
    this.#map = L.map('map').setView(this.#coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling Clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newworkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    this.#coords = [lat, lng];
    let workout;
    // CHECKING workout!

    let errorMsg = '';
    e.target.childNodes.forEach(cn =>
      cn.className == 'errorMsg' ? (errorMsg = cn) : ''
    );
    if (String(type) === 'running') {
      const cadence = +inputCadence.value;

      // Data Validation
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        errorMsg.innerText = 'Inputs have to be positive number!';
        e.target.style.border = '2px solid red';
        return;
      }
      // return alert('Inputs have to be positive number!');

      errorMsg.innerText = '';
      e.target.style.border = 'none';
      workout = new Running(this.#coords, distance, duration, cadence);
    }
    if (String(type) === 'cycling') {
      const elevation = +inputElevation.value;
      // Data Validation
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        errorMsg.innerText = 'Inputs have to be positive number!';
        e.target.style.border = '2px solid red';
        return;
      }
      // return alert('Inputs have to be positive number!');
      errorMsg.innerText = '';
      e.target.style.border = 'none';
      // console.log(elevation);
      workout = new Cycling(this.#coords, distance, duration, elevation);
    }

    this._renderWorkoutMarker(workout);
    // Render workout on list

    console.log(workout);
    // if (workout != null) {
    this._renderWorkout(workout);
    //Add new object to workout array
    // }

    this.#workouts.push(workout);

    this._hideForm();
    this._applyEventListenerToCross(workout);
    this._applyEventListenerToEdit(workout);

    //  Set local storage to all workouts.
    this._setLocalStorage();
    // console.log(this.#workouts);
  }
  _applyEventListenerToEdit(w) {
    document.querySelectorAll('.workout').forEach((wo, i) => {
      // console.log(workout.id);
      // console.log(wo.dataset.id);
      if (wo.dataset.id == w.id) {
        let span = '';
        wo.childNodes.forEach(cn =>
          cn.className == 'edit' ? (span = cn) : ''
        );

        // const span = wo.childNodes[3];
        span.addEventListener('click', function () {
          form.classList.remove('hidden');
          inputType.value = w.type;
          inputDistance.value = w.distance;
          inputDuration.value = w.duration;
          if (w.type === 'cycling') {
            document.querySelector('.form__input--type').value = 'cycling';
            document.querySelector(
              '.form__input--elevation'
            ).value = `${w.elevationGain}`;
            // document.querySelector('.form__label').classList.remove('hidden');

            document.querySelectorAll('.form__row').forEach(
              fl => {
                if (fl.childNodes[1].textContent == 'Elev Gain')
                  fl.classList.remove('form__row--hidden');
                if (fl.childNodes[1].textContent == 'Cadence') {
                  fl.classList.add('form__row--hidden');
                }
              }
              // fl.childNodes[0].textContent == 'Cadence'
              // ? // ? fl.classList.add('form__row--hidden')
              // : ''
            );

            document.querySelector('.form__input--cadence').value = ``;
          } else {
            document.querySelector('.form__input--type').value = 'running';
            document.querySelector(
              '.form__input--cadence'
            ).value = `${w.cadence}`;

            document.querySelectorAll('.form__row').forEach(
              fl => {
                if (fl.childNodes[1].textContent == 'Elev Gain')
                  fl.classList.add('form__row--hidden');
                if (fl.childNodes[1].textContent == 'Cadence') {
                  fl.classList.remove('form__row--hidden');
                }
              }
              // fl.childNodes[0].textContent == 'Cadence'
              // ? // ? fl.classList.add('form__row--hidden')
              // : ''
            );

            document.querySelector('.form__input--elevation').value = ``;
          }

          app._removeWorkout(w);

          // if (clicked) {

          // } else {
          // app._newworkout(w);
          // }

          // node.className == 'form__input--distance' ? console.log(node) : '';
          app._setLocalStorage();
          // location.reload();
          // console.log(wo);
          // wo.remove();
          // app.#map.removeLayer(w._marker);
          // this.#workouts.(i);

          // app.#workouts = app.#workouts.filter(data => data.id != w.id);
          // // console.log(app.#workouts);
          // app._setLocalStorage();
          // console.log(app.#workouts);
        });
        // const span = wo.closest('.cross');
        // console.log(span);
      }
    });
  }
  _applyEventListenerToCross(w) {
    document.querySelectorAll('.workout').forEach((wo, i) => {
      // console.log(workout.id);
      // console.log(wo.dataset.id);
      if (wo.dataset.id == w.id) {
        let span = '';
        wo.childNodes.forEach(cn =>
          cn.className == 'cross' ? (span = cn) : ''
        );
        // const span = wo.childNodes[3];
        span.addEventListener('click', function () {
          // console.log(wo);
          wo.remove();
          app.#map.removeLayer(w._marker);
          // this.#workouts.(i);
          app.#workouts = app.#workouts.filter(data => data.id != w.id);
          // console.log(app.#workouts);
          app._setLocalStorage();
          // console.log(app.#workouts);
        });
        // const span = wo.closest('.cross');
        // console.log(span);
      }
    });
  }
  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _removeWorkout(wk) {
    document.querySelectorAll('.workout').forEach(w => {
      if (w.dataset.id == wk.id) {
        w.remove();
        workout._marker = wk._marker;
        app.#map.removeLayer(wk._marker);
        app.#workouts = app.#workouts.filter(data => data.id != w.dataset.id);
        app._setLocalStorage();
      }
    });
  }
  _renderWorkoutMarker(workout) {
    // Display Marker
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${String(workout.type)}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    workout.marker = 2;
    // console.log(workout.id);
    workout._marker = marker;
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id=${workout.id}>
    <h5 class="errorMsg"></h5>
    <span class="edit">🖋️</span>
    <span class="cross">x</span>
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    if (workout.type === 'running') {
      // console.log('worked');
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
      </li>
`;
    }
    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details" >
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
  </li>
      `;
    }
    form.insertAdjacentHTML('afterend', html);

    // const workouts_2 = this.#workouts;
    // const mapp = this.#map;
    // console.log(workouts_2);
    // document.querySelectorAll('.cross').forEach(cross =>
    //   cross.addEventListener('click', function (e) {
    //     const target = e.target.closest('.workout');
    //     target.remove();
    //     // mapp.removeLayer(e.target.closest('.workout').marker);
    //     // console.log(this.marker);
    //     workouts_2.forEach(
    //       w => {
    //         if (mapp) {
    //           if (w.id == target.dataset.id) {
    //             mapp.removeLayer(w._marker);
    //             app._removeWorkout(w);
    //           }
    //         }
    //       }
    //       // w => mapp.removeLayer(w.marker);
    //       // console.log(w._marker)
    //     );
    //     // console.log(target.dataset.id);
    //   })
    // );
  }

  _moveToPopup(e) {
    // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
    if (!this.#map) return;

    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    if (workout != null) {
      this.#map.setView(workout.coords, 13, {
        animate: true,
        pan: {
          duration: 1,
        },
      });
    }

    // using the public interface
    // workout.click();
  }

  _getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  _setLocalStorage() {
    // console.log(this.#workouts);
    const markers = [];
    const id = [];
    this.#workouts.forEach(w => id.push(w.id));
    this.#workouts.forEach(w => {
      markers.push(w.marker);
    });
    this.#workouts.forEach(w => delete w.marker);
    localStorage.removeItem('workouts');
    localStorage.removeItem('ids');
    localStorage.removeItem('markers');
    // console.log(this.#workouts);
    // location.reload();
    localStorage.setItem(
      'workouts',
      JSON.stringify(this.#workouts, this._getCircularReplacer())
    );
    localStorage.setItem(
      'markers',
      JSON.stringify(markers, this._getCircularReplacer())
    );
    localStorage.setItem('ids', JSON.stringify(id));

    // console.log(markers);
    // localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    const markers = JSON.parse(localStorage.getItem('markers'));
    const ids = JSON.parse(localStorage.getItem('ids'));

    if (!data) return;
    this.#workouts = data;
    // console.log();
    this.#workouts.forEach((work, i) => {
      ids.forEach(id => {
        if (id === work.id) {
          work.marker = markers[i];
          this._renderWorkout(work);
          // console.log(work.id, id);
        }
      });
    });
    // console.log(this.#workouts);
  }

  _render() {
    // Adding Reset Function
    let html = `<button id="reset_buttonn" class="button-primary">CLEAR</button>`;
    containerworkouts.insertAdjacentHTML('afterend', html);
    html = `<h5 class="errorMsg"></h5>`;
    form.insertAdjacentHTML('beforeend', html);
    html = `<h4>Modified By: Muhammad Zeshan Tahir</h4>`;
    document.querySelector('.copyright').insertAdjacentHTML('afterend', html);
    // document.querySelector('h4').style.textAlign = 'center';
    // Adding cross button
  }
}

const app = new App();
// app.reset();
// app._getPosition();
// console.log(2);
