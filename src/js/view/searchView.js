import { elements } from "./base";

const renderRecipe = recipe => {
  const markUp = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
        <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="results__data">
        <h4 class="results__name">${recipe.title}</h4>
        <p class="results__author">${recipe.title}</p>
      </div>
    </a>
  </li>
  `;

  elements.searchResultList.insertAdjacentHTML('beforeend', markUp);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = '';
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = '';
  elements.pageButtons.innerHTML = '';

};
 
export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 5) => {

  const start = ( currentPage-1 ) * resPerPage;
  const end = currentPage * resPerPage;


  recipes.slice(start, end).forEach(renderRecipe);

  const totalPages = Math.ceil( recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

const createButton = (page, type, direction) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
  <span>хуудас ${page}</span>
  <svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
  </svg>
</button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHTML;

  if(currentPage === 1 && totalPages > 1){
    //ehnii huudas
    buttonHTML = createButton(2, 'next', 'right');
  } else if (currentPage < totalPages){
    //dund huudas
    buttonHTML = createButton(currentPage + 1, 'next', 'right');
    buttonHTML += createButton(currentPage - 1, 'prev', 'left');
  }
  else if(currentPage === totalPages){
    //suuliin huudas
    buttonHTML = createButton(currentPage - 1, 'prev', 'left');
  };
  elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHTML);
};

