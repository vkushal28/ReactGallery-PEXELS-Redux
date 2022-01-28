const initialState = {
  page:0,
  per_page: 0,
  photos: [],
  total_results : 0,
  next_page : "",
  isFetchingMorePhotos: false,
};

const userProfileSlice = (state = initialState, action) => {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case "GET_PHOTOS":
      newState = { ...state, ...payload };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export default userProfileSlice;
