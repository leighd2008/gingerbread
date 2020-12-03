import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import picturesReducer from "./pictures/pictures.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  pictures: picturesReducer,
});

export default persistReducer(persistConfig, rootReducer);
