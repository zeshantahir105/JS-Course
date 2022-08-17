import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config';
import resultsView from './views/resultsView.js';
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

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}get?rId=${id}`;
    const data = await getJSON(url);
    const { recipe } = data;
    // prettier-ignore
    state.recipe = {  
                id: recipe.recipe_id,
                title: recipe.title,
                publisher: recipe.publisher,
                sourceUrl: recipe.source_url,
                image: recipe.image_url,
                servings: recipe.servings || 'Unset',
                cookingTime: recipe.cooking_time || 'Unset',
                ingredients: recipe.ingredients,
                bookmarked: false,
            };
    // console.log(recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const url = `${API_URL}/search?q=${query}`;
    const data = await getJSON(url);

    // console.log(data);
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
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

export const addBookmark = function (recipe) {
  // Add Bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
