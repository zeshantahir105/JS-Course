import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import PaginationView from './views/paginationView.js';
// import paginationView from './views/paginationView.js';

if (module.hot) {
  module.hot.accept();
}

// console.log('Nice');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Loading Recipe
    RecipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // Rendering Recipe
    RecipeView.render(recipe);
  } catch (err) {
    // alert(err);
    RecipeView.renderError();
    // recipeView.renderError(`${err} 🤕`);
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // 1. Get search query
    const query = SearchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    // console.log(model.state.search.results);
    // ResultsView.render(model.state.search.results);
    ResultsView.render(model.getSearchResultsPage(1));

    // Rendering the Pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    // 4. Catching errors
    // throw err;
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));

  // Rendering the Pagination buttons
  PaginationView.render(model.state.search);
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};
init();
