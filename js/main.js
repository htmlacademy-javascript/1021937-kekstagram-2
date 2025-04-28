const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomDataFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomValue = (min, max) => getRandomInteger(min, max);

const getRandomComments = () => {
  const comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const firstIndex = Math.floor(Math.random() * comments.length);
  let secondIndex = 0;

  do {
    secondIndex = Math.floor(Math.random() * comments.length);
  } while (secondIndex === firstIndex);

  return `${comments[firstIndex]} ${comments[secondIndex]}`;
};


const getPhotoObjects = (items = 25) => {
  const photos = [];
  const generatePhotoId = createRandomDataFromRangeGenerator(1, 25);
  const generatePhotoUrl = createRandomDataFromRangeGenerator(1, 25);
  const generateCommentId = createRandomDataFromRangeGenerator(1, 25);

  for (let i = 0; i < items; i++) {
    photos.push({
      id: generatePhotoId(),
      url: `photos/${generatePhotoUrl()}.jpg`,
      description: `Photo - ${generatePhotoUrl()}`,
      likes: getRandomValue(15, 200),
      comments: {
        id: generateCommentId(),
        avatar: `img/avatar-${getRandomValue(1, 6)}.svg`,
        message: getRandomComments()
      }
    });
  }

  return photos;
};

getPhotoObjects();
