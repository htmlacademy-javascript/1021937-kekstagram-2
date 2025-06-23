import { getData } from './api.js';
import { initFilters } from './filters.js';
import { initFormPopupUploadPicture } from './form-popup-upload-picture.js';
import { initImageScale } from './picture-styling-scale.js';
import { initEffects } from './picture-styling-filter.js';

const showErrorMessage = () => {
  const template = document.querySelector('#data-error');
  const errorElement = template.content.cloneNode(true).querySelector('.data-error');
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

getData()
  .then((photoObjects) => {
    initFilters(photoObjects);
  })
  .catch(showErrorMessage);

initFormPopupUploadPicture();
initImageScale();
initEffects();
