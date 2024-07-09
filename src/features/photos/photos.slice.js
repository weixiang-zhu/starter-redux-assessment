import {createSelector, createSlice} from '@reduxjs/toolkit';
import photos from './photos.data.js';

const initialState = {
  photos
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos. 
    // Task 1 Hint: You can use state.photos.unshift()
    // `unshift()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    addPhoto: (state, action) => {
      const { caption, imageUrl } = action.payload;
      state.photos.unshift({ id: state.photos.length + 1, caption, imageUrl });
    },
    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    // Task 6 Hint: You can use state.photos.splice()
    // `splice()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    removePhoto: (state, action) => {
      const index = state.photos.findIndex((photo) => photo.id === action.payload);
      if (index !== -1) {
        state.photos.splice(index, 1);
      }
    }
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;

export const selectSearchTerm = (state) => state.search.searchTerm;

export const selectFilteredPhotos = createSelector(
    [selectAllPhotos, selectSearchTerm],
    (photos, searchTerm) =>
        photos.filter((photo) => photo.caption.toLowerCase().includes(searchTerm.toLowerCase()))
);