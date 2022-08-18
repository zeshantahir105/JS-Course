import { async } from 'regenerator-runtime';
import { API_URL, KEY, API_URL_SEND } from './config.js';
import { AJAX } from './helpers.js';
// import { sendJSON } from './helpers.js';
import { RES_PER_PAGE } from './config';
import ResultsView from './views/resultsView.js';
import recipeView from './views/recipeView.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data;

  return {
    ...(recipe.recipe_id ? { id: recipe.recipe_id } : { id: recipe.id }),
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings || 'Unset',
    cookingTime: recipe.cooking_time || 'Unset',
    ingredients: recipe.ingredients,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}/${id}`;
    const data = await AJAX(url);
    // prettier-ignore

    // console.log(data);
    const { recipe } = data;
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const url = `${API_URL}?search=${query}&key=${KEY}`;
    const data = await AJAX(url);

    // console.log(data);
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    throw err;
    // console.log(err);
    // resultsView.renderError();
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  // console.log(state.search.results.slice(start, end));
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.array.forEach(ing => {
    ing.quantity = (newServings * ing.quantity) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add Bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  // console.log(state.recipe.bookmarked);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  recipeView.render(state.recipe);
  persistBookmark();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // Marking current recipe as bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  recipeView.render(state.recipe);
  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

/**
 * Uploading the New Recipe
 * @param {} newRecipe The recipe to upload!
 * @returns (ingredients)
 */

export const uploadRecipe = async function (newRecipe) {
  // console.log(Object.entries(newRecipe));
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format and Try Again!'
          );
        const [quantity, unit, description] = ingArr;
        // prettier-ignore
        // return { quantity };
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL_SEND}?key=${KEY}`, recipe);
    console.log(data);
    state.recipe = createRecipeObject(data);
    state.recipe.ingredients.map(ing => console.log(Object.values(ing)));

    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
