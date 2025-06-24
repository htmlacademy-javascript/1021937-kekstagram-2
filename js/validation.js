import { isValidStringLength } from './util.js';

const VALIDATION_RULES = {
  MAX_HASHTAGS: 5,
  MAX_HASHTAG_LENGTH: 20,
  MAX_COMMENT_LENGTH: 140
};

const hashTagRule = /^#[a-zа-яё0-9]+$/i;

export const ERROR_MESSAGES = {
  HASHTAGS: {
    TOO_MANY: 'Нельзя указать больше пяти хэштегов',
    MUST_START_WITH_HASH: 'Хэштег должен начинаться с #',
    ONLY_HASH: 'Хэштег не может состоять только из одной решётки',
    TOO_LONG: `Максимальная длина хэштега — ${VALIDATION_RULES.MAX_HASHTAG_LENGTH} символов`,
    INVALID_CHARACTERS: 'Хэштег может содержать только буквы и цифры, без пробелов и спецсимволов',
    NOT_UNIQUE: 'Один и тот же хэштег не может использоваться дважды'
  },
  COMMENT: {
    TOO_LONG: `Длина комментария не может превышать ${VALIDATION_RULES.MAX_COMMENT_LENGTH} символов`
  }
};

export const parseHashtags = (value) => {
  if (!value) {
    return [];
  }

  return value.trim().toLowerCase().split(/\s+/).filter(Boolean);
};

export const isValidHashtagFormat = (tag) => {
  if (tag[0] !== '#') {
    return false;
  }

  if (tag === '#') {
    return false;
  }

  if (!isValidStringLength(tag, VALIDATION_RULES.MAX_HASHTAG_LENGTH)) {
    return false;
  }

  return hashTagRule.test(tag);
};

export const hasUniqueHashtags = (tags) => {
  const uniqueTags = new Set(tags);
  return uniqueTags.size === tags.length;
};

export const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const tags = parseHashtags(value);

  if (tags.length > VALIDATION_RULES.MAX_HASHTAGS) {
    return false;
  }

  for (const tag of tags) {
    if (!isValidHashtagFormat(tag)) {
      return false;
    }
  }

  return hasUniqueHashtags(tags);
};

export const getHashtagErrorMessage = (value) => {
  if (!value) {
    return '';
  }

  const tags = parseHashtags(value);

  if (tags.length > VALIDATION_RULES.MAX_HASHTAGS) {
    return ERROR_MESSAGES.HASHTAGS.TOO_MANY;
  }

  for (const tag of tags) {
    if (tag[0] !== '#') {
      return ERROR_MESSAGES.HASHTAGS.MUST_START_WITH_HASH;
    }

    if (tag === '#') {
      return ERROR_MESSAGES.HASHTAGS.ONLY_HASH;
    }

    if (!isValidStringLength(tag, VALIDATION_RULES.MAX_HASHTAG_LENGTH)) {
      return ERROR_MESSAGES.HASHTAGS.TOO_LONG;
    }

    if (!hashTagRule.test(tag)) {
      return ERROR_MESSAGES.HASHTAGS.INVALID_CHARACTERS;
    }
  }

  if (!hasUniqueHashtags(tags)) {
    return ERROR_MESSAGES.HASHTAGS.NOT_UNIQUE;
  }

  return '';
};

export const validateCommentLength = (value) => {
  if (!value) {
    return true;
  }

  return isValidStringLength(value, VALIDATION_RULES.MAX_COMMENT_LENGTH);
};

export const getCommentErrorMessage = (value) => {
  if (!validateCommentLength(value)) {
    return ERROR_MESSAGES.COMMENT.TOO_LONG;
  }

  return '';
};
