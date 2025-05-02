import { getRandomInteger, createRandomDataFromRangeGenerator } from './number-utils.js';
import { getRandomTwoComments } from './comments.js';
import { getRandomName } from './names.js';

export const getPhotoObjects = (items = 25) => {
  const photos = [];
  const generatePhotoId = createRandomDataFromRangeGenerator(1, 25);
  const generatePhotoUrl = createRandomDataFromRangeGenerator(1, 25);
  const generateCommentId = createRandomDataFromRangeGenerator(1, 25);

  for (let i = 0; i < items; i++) {
    const name = getRandomName();

    photos.push({
      id: generatePhotoId(),
      url: `photos/${generatePhotoUrl()}.jpg`,
      description: `Фото от ${name}`,
      likes: getRandomInteger(15, 200),
      comments: {
        id: generateCommentId(),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomTwoComments()
      },
      name: name
    });
  }

  return photos;
};
