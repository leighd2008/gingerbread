import { createSelector } from "reselect";

const selectCategory = state => state.pictures;

export const selectCategoryData = createSelector(
  [selectCategory],
  pictures => pictures.pictures
);
