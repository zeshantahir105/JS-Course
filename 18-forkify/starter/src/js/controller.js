import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import PaginationView from './views/paginationView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Loading Recipe
    RecipeView.renderSpinner();
    ResultsView.update(model.getSearchResultsPage());

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
    const query = await SearchView.getQuery();
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
    ResultsView.renderError();
    // console.log(err);
    // throw err;
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));

  // Rendering the Pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function () {
  // Updating the recipe servings (in state)
  model.updateServings(6);

  // Update the recipe view.
};

const controlAddBookmark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  PaginationView.addHandlerClick(controlPagination);
};
init();
