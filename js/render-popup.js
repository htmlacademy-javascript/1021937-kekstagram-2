import { photoObjects } from './mock.js';
import { isKeyDown } from './util';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const closePopupPictureButton = bigPicture.querySelector('.big-picture__cancel');

export const closePopup = () => {
  bigPicture.classList.add('hidden');
};

const closePopupPictureByPressCloseButton = () => {
  closePopup();

  closePopupPictureButton.removeEventListener('click', closePopupPictureByPressCloseButton);
};

const closePopupPictureByKey = (event) => {
  if (event && isKeyDown(event, 'Escape')) {
    closePopup();

    document.removeEventListener('keydown', closePopupPictureByKey);
  }
};

const renderPopup = (id) => {
  const currentPicture = photoObjects.find((item) => item.id === id);

  if (!currentPicture) {
    return;
  }

  bigPictureImage.src = currentPicture.url;
  bigPictureImage.alt = currentPicture.description;
  likesCount.textContent = currentPicture.likes;

  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', closePopupPictureByKey);
  closePopupPictureButton.addEventListener('click', closePopupPictureByPressCloseButton);
};

export const openPopupPicture = () => {
  const pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', (event) => {
    const element = event.target.closest('.picture');

    if (!element) {
      return;
    }

    const id = Number(element.dataset.id);
    renderPopup(id);
  });
};
