export const POPUP_SERVICE_CLASSES = {
  HIDDEN: 'hidden',
  BODY_INIT_POPUP: 'modal-open'
};

export const isValidStringLength = (string, maxLength) => string.length <= maxLength;

export const isKeyDown = (event) => event.key === 'Escape';
