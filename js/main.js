import { renderPicture } from './render-picture';
import { photoObjects } from './mock';
import { initPopup } from './init-popup';
import { initFormPopupUploadPicture } from './form-popup-upload-picture';
import { initImageScale } from './picture-styling-scale';
import { initEffects } from './picture-styling-filter';

renderPicture(photoObjects);
initPopup(photoObjects);
initFormPopupUploadPicture();
initImageScale();
initEffects();
