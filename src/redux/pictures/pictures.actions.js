import PicturesActionTypes from "./pictures.types";

export const updatePictures = picturesMap => ({
  type: PicturesActionTypes.UPDATE_PICTURES,
  payload: picturesMap
});
