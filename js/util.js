export const POPUP_SERVICE_CLASSES = {
  HIDDEN: 'hidden',
  BODY_INIT_POPUP: 'modal-open'
};

export const isValidStringLength = (string, maxLength) => string.length <= maxLength;
export const isEscKeyDown = (event) => event.key === 'Escape';

export function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}
