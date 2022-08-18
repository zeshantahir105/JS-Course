import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView.js';
import BookmarksView from './views/bookmarksView.js';
import PaginationView from './views/paginationView.js';
import AddRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarksView from './views/bookmarksView.js';
// import addRecipeView from './views/addRecipeView.js';
// import bookmarksView from './views/bookmarksView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Loading Recipe
    RecipeView.renderSpinner();
    ResultsView.update(model.getSearchResultsPage());
    BookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // Rendering Recipe
    RecipeView.render(recipe);
    // console.log(recipe);
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

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);

  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    // Show loading spinner
    AddRecipeView.renderSpinner();
    // UPLOAD THE NEW RECIPE DATA
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Render Recipe
    RecipeView.render(model.state.recipe);

    // Success Message
    AddRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back();
    // Close the Window
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    AddRecipeView.renderError(err.message);
    console.error('🎇', err);
  }
};

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
