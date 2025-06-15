const SCALE_SETTINGS = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

export const initImageScale = () => {
  const pictureEditorOverlay = document.querySelector('.img-upload__overlay');
  const uploadFileInput = document.querySelector('.img-upload__input');

  const scaleSmallerButton = pictureEditorOverlay.querySelector('.scale__control--smaller');
  const scaleBiggerButton = pictureEditorOverlay.querySelector('.scale__control--bigger');
  const scaleValueInput = pictureEditorOverlay.querySelector('.scale__control--value');
  const previewImage = pictureEditorOverlay.querySelector('.img-upload__preview img');

  function setScale(value) {
    if (value < SCALE_SETTINGS.MIN) {
      value = SCALE_SETTINGS.MIN;
    }

    if (value > SCALE_SETTINGS.MAX) {
      value = SCALE_SETTINGS.MAX;
    }

    scaleValueInput.value = `${value}%`;
    previewImage.style.transform = `scale(${value / 100})`;
  }

  scaleSmallerButton.addEventListener('click', () => {
    const currentScale = parseInt(scaleValueInput.value, 10);
    setScale(currentScale - SCALE_SETTINGS.STEP);
  });

  scaleBiggerButton.addEventListener('click', () => {
    const currentScale = parseInt(scaleValueInput.value, 10);
    setScale(currentScale + SCALE_SETTINGS.STEP);
  });

  uploadFileInput.addEventListener('change', () => {
    setScale(100);
  });
}
