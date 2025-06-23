import { renderPicture } from './render-picture.js';
import { initPopup } from './init-popup.js';
import { debounce } from './util.js';

let currentData = [];

const randomUniquePhotoCount = 10;

const imgFiltersSection = document.querySelector('.img-filters');
const filterButtons = imgFiltersSection.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');

const clearPictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const getRandomUniquePhotos = (data, count) => {
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const sortDiscussed = (data) => [...data].sort((a, b) => b.comments.length - a.comments.length);

const renderFilteredPhotos = (filterType) => {
  clearPictures();

  let filteredPhotos;

  switch (filterType) {
    case 'filter-default':
      filteredPhotos = currentData;
      break;
    case 'filter-random':
      filteredPhotos = getRandomUniquePhotos(currentData, randomUniquePhotoCount);
      break;
    case 'filter-discussed':
      filteredPhotos = sortDiscussed(currentData);
      break;
    default:
      filteredPhotos = currentData;
  }

  renderPicture(filteredPhotos);
  initPopup(filteredPhotos);
};

const debouncedRender = debounce(renderFilteredPhotos, 500);

const onFilterButtonClick = (evt) => {
  const clickedButton = evt.target;

  if (!clickedButton.classList.contains('img-filters__button')) {
    return;
  }

  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  clickedButton.classList.add('img-filters__button--active');
  debouncedRender(clickedButton.id);
};

export const initFilters = (data) => {
  currentData = data;
  imgFiltersSection.classList.remove('img-filters--inactive');
  renderFilteredPhotos('filter-default');
  imgFiltersSection.addEventListener('click', onFilterButtonClick);
};
