import RESTAURANT_API_ENDPOINT from '../globals/api-endpoint.js';

class RestaurantSource {
    static async getRestaurants() {
        const response = await fetch(RESTAURANT_API_ENDPOINT.RESTAURANT_LIST);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async getRestaurant(id) {
        const response = await fetch(RESTAURANT_API_ENDPOINT.RESTAURANT_DETAIL(id));
        const responseJson = await response.json();
        return responseJson.restaurant;
    }

    static async postReview(review) {
        const response = await fetch(RESTAURANT_API_ENDPOINT.RESTAURANT_REVIEW, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
        });

        const responseJson = await response.json();
        return responseJson.customerReviews;
    }
}

export default RestaurantSource;
