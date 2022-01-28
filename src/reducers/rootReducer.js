import { combineReducers } from 'redux';
import photosSlice from './photosSlice';

// all redux slices are registered here and implemented/defined separately
export default combineReducers({
    photosSlice
});