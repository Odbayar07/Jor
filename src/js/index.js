require('@babel/polyfill');
import Search from './model/Search'

const state = {};

const controlSearch = async () => {
  // webees hailtiin tulhuur gargana.
  const query = 'pizza';
  
  if(query){
    // shineer hailtiin object uusgene.
    state.search = new Search(query);
    // hailt hiihed zoriulj interface beltgene.

    // hailtiig guitsetgene.
    await state.search.doSearch();

    // hailtiin ur dung gargaj irne.
    console.log(state.search.result)

  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})