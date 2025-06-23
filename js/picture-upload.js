const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const picture = document.querySelector('.img-upload__preview img');

export const initPictureUpload = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      if (picture.src) {
        URL.revokeObjectURL(picture.src);
      }

      picture.src = URL.createObjectURL(file);
    }
  });
};
