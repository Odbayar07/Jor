require('@babel/polyfill');
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';

const state = {};

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
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})