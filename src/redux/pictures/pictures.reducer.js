import PicturesActionTypes from "./pictures.types";

const INITIAL_STATE = {
  pictures: null
};

const picturesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PicturesActionTypes.UPDATE_PICTURES:
      return {
        ...state,
        pictures: action.payload
      };
    default:
      return state;
  }
};

export default picturesReducer;