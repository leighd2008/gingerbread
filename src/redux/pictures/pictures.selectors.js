import { createSelector } from "reselect";

const selectCategory = state => state.pictures;

export const selectCategoryData = createSelector(
  [selectCategory],
  pictures => pictures.pictures
);

export const selectTeamsForDatabase = createSelector(
  [selectCategoryData],
  pictures => (pictures ? Object.keys(pictures).map(key => pictures[key]) : [])
);

export const selectOneTeam = collectionUrlParam =>
  createSelector(
    [selectCategoryData],
    pictures => (pictures ? pictures[collectionUrlParam] : null)
  );