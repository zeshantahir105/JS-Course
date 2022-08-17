import ResultsView from '../views/resultsView.js';

class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      try {
        handler();
      } catch (err) {
        ResultsView.renderError();
        throw err;
      }
    });
  }
}

export default new SearchView();
