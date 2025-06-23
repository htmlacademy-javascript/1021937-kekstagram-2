import { isEscKeyDown, POPUP_SERVICE_CLASSES } from './util.js';
import { getCommentErrorMessage, getHashtagErrorMessage, validateCommentLength, validateHashtags } from './validation.js';
import { resetFilter } from './picture-styling-filter.js';
import { sendData } from './api.js';
import { initPictureUpload } from './picture-upload.js';

const { HIDDEN, BODY_INIT_POPUP } = POPUP_SERVICE_CLASSES;

const SUBMIT_MESSAGE = {
  PROCESS: 'Отправка',
  DEFAULT: 'Опубликовать'
};

const { PROCESS, DEFAULT } = SUBMIT_MESSAGE;

const body = document.body;
const uploadPictureForm = document.querySelector('.img-upload__form');
export const previewPicture = uploadPictureForm.querySelector('.img-upload__preview img');
const uploadFileInput = uploadPictureForm.querySelector('.img-upload__input');
const pictureEditorOverlay = uploadPictureForm.querySelector('.img-upload__overlay');
const pictureEditorCancelButton = pictureEditorOverlay.querySelector('.img-upload__cancel');
const submitButton = uploadPictureForm.querySelector('.img-upload__submit');
const hashTagInput = uploadPictureForm.querySelector('.text__hashtags');
const commentInput = uploadPictureForm.querySelector('.text__description');

const pristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error'
});

const showErrorMessage = () => {
  const template = document.querySelector('#error');
  const errorElement = template.content.cloneNode(true).querySelector('.error');
  document.body.append(errorElement);

  const errorButton = errorElement.querySelector('.error__button');

  const removeError = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress);
    errorButton.removeEventListener('click', onButtonClick);
    errorElement.removeEventListener('click', onOutsideClick);
  };

  function onEscPress(evt) {
    if (isEscKeyDown(evt)) {
      evt.preventDefault();
      removeError();
    }
  }

  function onButtonClick() {
    removeError();
  }

  function onOutsideClick(evt) {
    if (evt.target === errorElement) {
      removeError();
    }
  }

  document.addEventListener('keydown', onEscPress);
  errorButton.addEventListener('click', onButtonClick);
  errorElement.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  const template = document.querySelector('#success');
  const successElement = template.content.cloneNode(true).querySelector('.success');
  document.body.append(successElement);

  const successButton = successElement.querySelector('.success__button');

  const removeSuccess = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEscPress);
    successButton.removeEventListener('click', onButtonClick);
    successElement.removeEventListener('click', onOutsideClick);
  };

  function onEscPress(evt) {
    if (isEscKeyDown(evt)) {
      evt.preventDefault();
      removeSuccess();
    }
  }

  function onButtonClick() {
    removeSuccess();
  }

  function onOutsideClick(evt) {
    if (evt.target === successElement) {
      removeSuccess();
    }
  }

  document.addEventListener('keydown', onEscPress);
  successButton.addEventListener('click', onButtonClick);
  successElement.addEventListener('click', onOutsideClick);
};

export const closePictureEditor = () => {
  pictureEditorOverlay.classList.add(HIDDEN);
  body.classList.remove(BODY_INIT_POPUP);
  uploadFileInput.value = '';

  uploadPictureForm.reset();
  pristine.reset();
  resetFilter();
  removePictureEditorListeners();
};

const onCancelButtonClick = () => {
  closePictureEditor();
};

const onDocumentKeyDown = (event) => {
  if (isEscKeyDown(event)) {
    event.preventDefault();

    if (document.activeElement === hashTagInput || document.activeElement === commentInput) {
      event.stopPropagation();
      return;
    }

    closePictureEditor();
  }
};

const addPictureEditorListeners = () => {
  pictureEditorCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

export const initFormPopupUploadPicture = () => {
  initPictureUpload();

  uploadFileInput.addEventListener('change', () => {
    pictureEditorOverlay.classList.remove(HIDDEN);
    body.classList.add(BODY_INIT_POPUP);
    addPictureEditorListeners();
  });
};

function removePictureEditorListeners() {
  pictureEditorCancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

uploadPictureForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = PROCESS;

  const formData = new FormData(uploadPictureForm);

  try {
    await sendData(formData);

    showSuccessMessage();
    closePictureEditor();
  } catch (error) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = DEFAULT;
  }
});

pristine.addValidator(hashTagInput, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(commentInput, validateCommentLength, getCommentErrorMessage);
