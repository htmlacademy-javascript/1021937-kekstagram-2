import { photoObjects } from './mock.js';
import { isKeyDown } from './util';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const closePopupButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsListElement = bigPicture.querySelector('.social__comment');
const body = document.body;

const POPUP_SERVICE_CLASSES = {
  'HIDDEN': 'hidden',
  'BODY_INIT_POPUP': 'modal-open'
};

export const closePopup = () => {
  if (!bigPicture.classList.contains(POPUP_SERVICE_CLASSES.HIDDEN)) {
    bigPicture.classList.add(POPUP_SERVICE_CLASSES.HIDDEN);
  }

  if (body.classList.contains(POPUP_SERVICE_CLASSES.BODY_INIT_POPUP)) {
    body.classList.remove(POPUP_SERVICE_CLASSES.BODY_INIT_POPUP);
  }
};

const closePopupByPressCloseButton = () => {
  closePopup();

  closePopupButton.removeEventListener('click', closePopupByPressCloseButton);
};

const closePopupByKey = (event) => {
  if (event && isKeyDown(event, 'Escape')) {
    closePopup();

    document.removeEventListener('keydown', closePopupByKey);
  }
};

const closePopupByClickOutside = (event) => {
  if (event.target === bigPicture) {
    closePopup();

    bigPicture.removeEventListener('click', closePopupByClickOutside);
  }
};

const initOpenPopupListeners = () => {
  document.addEventListener('keydown', closePopupByKey);
  closePopupButton.addEventListener('click', closePopupByPressCloseButton);
  bigPicture.addEventListener('click', closePopupByClickOutside);
};

const initPopup = (id) => {
  const currentPicture = photoObjects.find((element) => element.id === id);

  if (!currentPicture) {
    return;
  }

  const commentsFragment = document.createDocumentFragment();

  bigPictureImage.src = currentPicture.url;
  bigPictureImage.alt = currentPicture.description;
  likesCount.textContent = currentPicture.likes;
  commentsList.innerHTML = '';

  currentPicture.comments.forEach((element) => {
    const clonedCommentTemplate = commentsListElement.cloneNode(true);

    clonedCommentTemplate.querySelector('.social__picture').src = element.avatar;
    clonedCommentTemplate.querySelector('.social__picture').alt = element.description;
    clonedCommentTemplate.querySelector('.social__text').textContent = element.message;

    commentsFragment.append(clonedCommentTemplate);
  });

  commentsList.append(commentsFragment);

  commentsCaption.textContent = currentPicture.description;

  bigPicture.classList.remove(POPUP_SERVICE_CLASSES.HIDDEN);
  body.classList.add(POPUP_SERVICE_CLASSES.BODY_INIT_POPUP);

  initOpenPopupListeners();
};

export const openPopup = () => {
  const pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', (event) => {
    const element = event.target.closest('.picture');

    if (!element) {
      return;
    }

    const id = Number(element.dataset.id);
    initPopup(id);
  });
};
