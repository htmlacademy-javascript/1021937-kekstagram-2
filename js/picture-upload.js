const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const picture = document.querySelector('.img-upload__preview img');
const previews = document.querySelectorAll('.effects__preview');

export const initPictureUpload = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      picture.src = URL.createObjectURL(file);
      previews.forEach((item) => {
        item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      });
    }
  });
};
