import {renderPicture} from './render-picture.js';
import {photoObjects} from './mock.js';
import {initPopup} from './init-popup';
import {initFormPopupUploadPicture} from './form-popup-upload-picture';
import { initImageScale } from './picture-styling.js';

renderPicture(photoObjects);
initPopup(photoObjects);
initFormPopupUploadPicture();
initImageScale();
