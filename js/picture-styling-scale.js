import { previewPicture } from './form-popup-upload-picture';

const SCALE_SETTINGS = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const {STEP, MIN, MAX} = SCALE_SETTINGS;

export const initImageScale = () => {
  const pictureEditorOverlay = document.querySelector('.img-upload__overlay');
  const uploadFileInput = document.querySelector('.img-upload__input');

  const scaleSmallerButton = pictureEditorOverlay.querySelector('.scale__control--smaller');
  const scaleBiggerButton = pictureEditorOverlay.querySelector('.scale__control--bigger');
  const scaleValueInput = pictureEditorOverlay.querySelector('.scale__control--value');

  function setScale(value) {
    if (value < MIN) {
      value = MIN;
    }

    if (value > MAX) {
      value = MAX;
    }

    scaleValueInput.value = `${value}%`;
    previewPicture.style.transform = `scale(${value / 100})`;
  }

  scaleSmallerButton.addEventListener('click', () => {
    const currentScale = parseInt(scaleValueInput.value, 10);
    setScale(currentScale - STEP);
  });

  scaleBiggerButton.addEventListener('click', () => {
    const currentScale = parseInt(scaleValueInput.value, 10);
    setScale(currentScale + STEP);
  });

  uploadFileInput.addEventListener('change', () => {
    setScale(100);
  });
};
