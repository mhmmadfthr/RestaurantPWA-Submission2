/* eslint-disable implicit-arrow-linebreak */
import CONFIG from './config.js';

const { RESTAURANT_URL } = CONFIG;

const RESTAURANT_API_ENDPOINT = {
    RESTAURANT_LIST: `${RESTAURANT_URL}/list`,
    RESTAURANT_DETAIL: (id) => `${RESTAURANT_URL}/detail/${id}`,
    SEARCH_RESTAURANT: (keyword) => `${RESTAURANT_URL}/search/${keyword}`,
    RESTAURANT_REVIEW: `${RESTAURANT_URL}/review`,

    RESTAURANT_IMAGE: (resolution, id) =>
        `${RESTAURANT_URL}/images/${resolution}/${id}`,
};

export default RESTAURANT_API_ENDPOINT;
