import { previewPicture, uploadPictureForm } from './form-popup-upload-picture';

const effectLevelInput = uploadPictureForm.querySelector('.effect-level__value');
const effectSliderContainer = uploadPictureForm.querySelector('.img-upload__effect-level');
const effectRadioButtons = uploadPictureForm.querySelectorAll('.effects__radio');
const effectSliderElement = effectSliderContainer.querySelector('.effect-level__slider');

let currentEffect = 'none';

const EFFECTS = {
  none: {
    slider: null,
    filter: () => 'none'
  },
  chrome: {
    slider: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
    filter: (value) => `grayscale(${value})`
  },
  sepia: {
    slider: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
    filter: (value) => `sepia(${value})`
  },
  marvin: {
    slider: { range: { min: 0, max: 100 }, start: 100, step: 1 },
    filter: (value) => `invert(${value}%)`
  },
  phobos: {
    slider: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
    filter: (value) => `blur(${value}px)`
  },
  heat: {
    slider: { range: { min: 1, max: 3 }, start: 3, step: 0.1 },
    filter: (value) => `brightness(${value})`
  }
};

const initSlider = () => {
  noUiSlider.create(effectSliderElement, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => Number(value).toFixed(2),
      from: (value) => parseFloat(value)
    }
  });
  effectSliderContainer.classList.add('hidden');
  effectSliderElement.noUiSlider.on('update', (values, handle) => {
    const sliderValue = values[handle];
    effectLevelInput.value = sliderValue;

    if (currentEffect !== 'none') {
      previewPicture.style.filter = EFFECTS[currentEffect].filter(sliderValue);
    }
  });
};

const changeEffect = (effect) => {
  currentEffect = effect;

  if (effect === 'none') {
    effectSliderContainer.classList.add('hidden');
    previewPicture.style.filter = 'none';
    effectLevelInput.value = '';
  } else {
    effectSliderContainer.classList.remove('hidden');
    const { range, start, step } = EFFECTS[effect].slider;
    effectSliderElement.noUiSlider.updateOptions({ range, start, step });
    previewPicture.style.filter = EFFECTS[effect].filter(start);
    effectLevelInput.value = start;
  }
};

const bindRadioButtons = () => {
  effectRadioButtons.forEach((radio) =>
    radio.addEventListener('change', () => changeEffect(radio.value))
  );
};

const resetFilter = () => {
  effectSliderContainer.classList.add('hidden');
  previewPicture.style.filter = 'none';
  effectLevelInput.value = '';
};

export const initEffects = () => {
  initSlider();
  bindRadioButtons();
  resetFilter();
};
