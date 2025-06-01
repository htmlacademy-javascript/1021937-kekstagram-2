export const renderPicture = (data) => {
  const pictureSectionList = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const clonedTemplate = template.cloneNode(true);

    clonedTemplate.querySelector('.picture__img').src = element.url;
    clonedTemplate.querySelector('.picture__img').alt = element.description;
    clonedTemplate.querySelector('.picture__likes').textContent = element.likes;
    clonedTemplate.querySelector('.picture__comments').textContent = element.comments.length;

    fragment.append(clonedTemplate);
  });

  pictureSectionList.append(fragment);
};
