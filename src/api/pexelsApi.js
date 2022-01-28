import axios from "axios";

const BASE_URL = "https://api.pexels.com/v1";
const API_KEY = "";

const getImages = () => async (dispatch) => {
  const { data } = await axios.get(`${BASE_URL}/curated`, {
    headers: {
      Authorization: `${API_KEY}`,
    },
  });
  dispatch({ type: "GET_PHOTOS", payload: data });
};

const fetchNextPage = (photoStore) => async (dispatch) => {
  dispatch({ type: "GET_PHOTOS", payload: { isFetchingMorePhotos: true } });
  const { data } = await axios.get(`${photoStore.next_page}/curated`, {
    headers: {
      Authorization: `${API_KEY}`,
    },
  });
  dispatch({ type: "GET_PHOTOS", payload: {isFetchingMorePhotos: false, ...data} });
};

export { getImages, fetchNextPage };
