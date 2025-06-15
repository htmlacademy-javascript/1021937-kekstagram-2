import {isEscKeyDown, POPUP_SERVICE_CLASSES} from './util';
import {validateHashtags, getHashtagErrorMessage, validateCommentLength, getCommentErrorMessage} from './validation';

const body = document.body;
const uploadPictureForm = document.querySelector('.img-upload__form');
const uploadFileInput = uploadPictureForm.querySelector('.img-upload__input');
const pictureEditorOverlay = uploadPictureForm.querySelector('.img-upload__overlay');
const pictureEditorCancelButton = pictureEditorOverlay.querySelector('.img-upload__cancel');

const hashTagInput = uploadPictureForm.querySelector('.text__hashtags');
const commentInput = uploadPictureForm.querySelector('.text__description');

const {HIDDEN, BODY_INIT_POPUP} = POPUP_SERVICE_CLASSES;

export const closePictureEditor = () => {
  pictureEditorOverlay.classList.add(HIDDEN);
  body.classList.remove(BODY_INIT_POPUP);
  uploadFileInput.value = '';

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

    uploadPictureForm.reset();
    closePictureEditor();
  }
};

const addPictureEditorListeners = () => {
  pictureEditorCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

export const initFormPopupUploadPicture = () => {
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

const pristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__form',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'data-error'
});

pristine.addValidator(hashTagInput, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(commentInput, validateCommentLength, getCommentErrorMessage);
