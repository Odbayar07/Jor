require('@babel/polyfill');
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';
import { renderRecipe, clearRecipe, highlightSelectedRecipe} from './view/recipeView'
import List from './model/List';
import * as listView from './view/listView';
import Like from './model/Like';
import * as likesView from './view/likesView'

const state = {};

likesView.toggleLikeMenu(0);

const controlSearch = async () => {
  // webees hailtiin tulhuur gargana.
  const query = searchView.getInput();
  
  if(query){
    // shineer hailtiin object uusgene.
    state.search = new Search(query);

    // hailt hiihed zoriulj interface beltgene.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // hailtiig guitsetgene.
    await state.search.doSearch();

    // hailtiin ur dung gargaj irne.
    clearLoader();
    if(state.search.result === undefined) alert('hailt ilertsgui');
    else searchView.renderRecipes(state.search.result);
  };
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if(btn){
    const gotoPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

const controlRecipe = async () => {
  // url aas id g salgana
  const id = window.location.hash.replace('#', '');
  if(!state.likes) state.likes = new Like();

  if (id){
    // joriin model hiine
    state.recipe = new Recipe(id);

    // delgets beldene
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    
    // joroo tatna
    await state.recipe.getRecipe();

    // jor guitsetgeh hugatsaa bolon orts tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();

    // joroo delgetsend gargana
    renderRecipe(state.recipe, state.likes.isLiked(id));
  };
};
['hashchange', 'lead'].forEach(e => window.addEventListener(e, controlRecipe));

const controlList = () => {
  state.list = new List();

  listView.clearItems();

  state.recipe.ingredients.forEach( n => {
    const item = state.list.addItem(n);
    listView.renderItem(item);
  });
};

const controlLike = () => {

  if(!state.likes) state.likes = new Like();

  const currentRecipeId = state.recipe.id;

  if(state.likes.isLiked(currentRecipeId)){

    state.likes.deleteLike(currentRecipeId);

    likesView.deleteLike(currentRecipeId);

    likesView.toggleLikeBtn(false);

  }else{
    const newLike = state.likes.addLike(
      currentRecipeId, 
      state.recipe.title, 
      state.recipe.publisher, 
      state.recipe.image_url
    );
    likesView.renderLike(newLike);
    
    likesView.toggleLikeBtn(true);
  };

  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
}

elements.recipeDiv.addEventListener('click', e => {
  if(e.target.matches('.recipe__btn, .recipe__btn *')){
    controlList();
  } else if(e.target.matches('.recipe__love, .recipe__love *')){
    controlLike();
  }
});

elements.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  state.list.deleteItem(id);
  listView.deleteItem(id);
});