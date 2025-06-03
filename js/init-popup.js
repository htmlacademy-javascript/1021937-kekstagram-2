import { photoObjects } from './mock.js';
import { isKeyDown } from './util';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const closePopupButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsListElement = bigPicture.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');

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

  removePopupListenersGarbage();
};

const closePopupByPressCloseButton = () => {
  closePopup();
};

const closePopupByKey = (event) => {
  if (event && isKeyDown(event, 'Escape')) {
    closePopup();
  }
};

const closePopupByClickOutside = (event) => {
  if (event.target === bigPicture) {
    closePopup();
  }
};

function removePopupListenersGarbage() {
  closePopupButton.removeEventListener('click', closePopupByPressCloseButton);
  document.removeEventListener('keydown', closePopupByKey);
  bigPicture.removeEventListener('click', closePopupByClickOutside);
}

const initOpenPopupListeners = () => {
  document.addEventListener('keydown', closePopupByKey);
  closePopupButton.addEventListener('click', closePopupByPressCloseButton);
  bigPicture.addEventListener('click', closePopupByClickOutside);
};

const getPhotoComments = (data) => {
  const commentsFragment = document.createDocumentFragment();

  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
  likesCount.textContent = data.likes;
  commentsList.innerHTML = '';

  data.comments.forEach((element) => {
    const clonedCommentTemplate = commentsListElement.cloneNode(true);

    clonedCommentTemplate.querySelector('.social__picture').src = element.avatar;
    clonedCommentTemplate.querySelector('.social__picture').alt = element.name;
    clonedCommentTemplate.querySelector('.social__text').textContent = element.message;

    commentsFragment.append(clonedCommentTemplate);
  });

  commentsList.append(commentsFragment);

  commentsCaption.textContent = data.description;
};

const getPopupData = (id) => {
  const currentPicture = photoObjects.find((element) => element.id === id);

  if (!currentPicture) {
    return;
  }

  getPhotoComments(currentPicture);
  initOpenPopupListeners();

  if (!commentsCount.classList.contains(POPUP_SERVICE_CLASSES.HIDDEN)) {
    commentsCount.classList.add(POPUP_SERVICE_CLASSES.HIDDEN);
  }

  if (!commentsLoaderButton.classList.contains(POPUP_SERVICE_CLASSES.HIDDEN)) {
    commentsLoaderButton.classList.add(POPUP_SERVICE_CLASSES.HIDDEN);
  }

  if (!body.classList.contains(POPUP_SERVICE_CLASSES.BODY_INIT_POPUP)) {
    body.classList.add(POPUP_SERVICE_CLASSES.BODY_INIT_POPUP);
  }

  if (bigPicture.classList.contains(POPUP_SERVICE_CLASSES.HIDDEN)) {
    bigPicture.classList.remove(POPUP_SERVICE_CLASSES.HIDDEN);
  }
};

export const initPopup = () => {
  const pictures = document.querySelector('.pictures');

  if (!pictures) {
    return;
  }

  pictures.addEventListener('click', (event) => {
    const element = event.target.closest('.picture');

    if (!element) {
      return;
    }

    const id = Number(element.dataset.id);
    getPopupData(id);
  });
};
