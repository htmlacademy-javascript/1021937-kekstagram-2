import { isEscKeyDown, POPUP_SERVICE_CLASSES } from './util.js';

const COMMENT_RENDER_COUNT = 5;

const {HIDDEN, BODY_INIT_POPUP} = POPUP_SERVICE_CLASSES;

let currentComments = [];
let shownCommentsCount = 0;

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

const commentsShownCountElement = commentsCount.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = commentsCount.querySelector('.social__comment-total-count');

export const closePopup = () => {
  bigPicture.classList.add(HIDDEN);
  body.classList.remove(BODY_INIT_POPUP);

  removePopupListenersGarbage();
};

const onClosePopupByPressCloseButton = () => {
  closePopup();
};

const onClosePopupByKey = (event) => {
  if (isEscKeyDown(event)) {
    closePopup();
  }
};

const onClosePopupByClickOutside = (event) => {
  if (event.target === bigPicture) {
    closePopup();
  }
};

const initOpenPopupListeners = () => {
  document.addEventListener('keydown', onClosePopupByKey);
  closePopupButton.addEventListener('click', onClosePopupByPressCloseButton);
  bigPicture.addEventListener('click', onClosePopupByClickOutside);
};

const renderComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENT_RENDER_COUNT);
  const commentsFragment = document.createDocumentFragment();

  nextComments.forEach((element) => {
    const clonedCommentTemplate = commentsListElement.cloneNode(true);

    clonedCommentTemplate.querySelector('.social__picture').src = element.avatar;
    clonedCommentTemplate.querySelector('.social__picture').alt = element.name;
    clonedCommentTemplate.querySelector('.social__text').textContent = element.message;

    commentsFragment.append(clonedCommentTemplate);
  });

  commentsList.append(commentsFragment);

  shownCommentsCount += nextComments.length;

  commentsShownCountElement.textContent = shownCommentsCount;
  commentsTotalCountElement.textContent = currentComments.length.toString();

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

const resetComments = () => {
  commentsList.innerHTML = '';
  shownCommentsCount = 0;
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const getPhotoComments = (data) => {
  currentComments = data.comments;
  resetComments();

  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
  likesCount.textContent = data.likes;

  commentsCaption.textContent = data.description;

  renderComments();

  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
};

const getPopupData = (id, data) => {
  const currentPicture = data.find((element) => element.id === Number(id));

  if (!currentPicture) {
    return;
  }

  getPhotoComments(currentPicture);
  initOpenPopupListeners();

  body.classList.add(BODY_INIT_POPUP);
  bigPicture.classList.remove(HIDDEN);
};

export const initPopup = (data) => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((element) =>
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      getPopupData(element.dataset.id, data);
    })
  );
};

function removePopupListenersGarbage() {
  closePopupButton.removeEventListener('click', onClosePopupByPressCloseButton);
  document.removeEventListener('keydown', onClosePopupByKey);
  bigPicture.removeEventListener('click', onClosePopupByClickOutside);
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
}
