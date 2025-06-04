import { POPUP_SERVICE_CLASSES, isKeyDown } from './util';

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

const {HIDDEN, BODY_INIT_POPUP} = POPUP_SERVICE_CLASSES;

export const closePopup = () => {
  bigPicture.classList.add(HIDDEN);
  body.classList.remove(BODY_INIT_POPUP);

  removePopupListenersGarbage();
};

const onClosePopupByPressCloseButton = () => {
  closePopup();
};

const onClosePopupByKey = (event) => {
  if (isKeyDown(event)) {
    closePopup();
  }
};

const onClosePopupByClickOutside = (event) => {
  if (event.target === bigPicture) {
    closePopup();
  }
};

function removePopupListenersGarbage() {
  closePopupButton.removeEventListener('click', onClosePopupByPressCloseButton);
  document.removeEventListener('keydown', onClosePopupByKey);
  bigPicture.removeEventListener('click', onClosePopupByClickOutside);
}

const initOpenPopupListeners = () => {
  document.addEventListener('keydown', onClosePopupByKey);
  closePopupButton.addEventListener('click', onClosePopupByPressCloseButton);
  bigPicture.addEventListener('click', onClosePopupByClickOutside);
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

const getPopupData = (id, data) => {
  const currentPicture = data.find((element) => element.id === id);

  if (!currentPicture) {
    return;
  }

  getPhotoComments(currentPicture);
  initOpenPopupListeners();

  commentsCount.classList.add(HIDDEN);
  commentsLoaderButton.classList.add(HIDDEN);
  body.classList.add(BODY_INIT_POPUP);
  bigPicture.classList.remove(HIDDEN);
};

export const initPopup = (data) => {
  const pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', (event) => {
    const element = event.target.closest('.picture');

    const id = Number(element.dataset.id);
    getPopupData(id, data);
  });
};
