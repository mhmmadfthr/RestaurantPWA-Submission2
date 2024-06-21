import RestaurantSource from '../../data/restaurant-resource.js';
import UrlParser from '../../routes/url-parser.js';
import {
    createRestaurantDetailTemplate,
    createMenuTemplate,
    createCustomerReviewTemplate,
} from '../templates/template-creator.js';

import LikeButtonInitiator from '../../utils/like-button-initiator.js';

const DetailRestaurant = {
    async render() {
        return `
    <div class="content-detail">
        <div id="favoriteButtonContainer"></div>
        <section id="restaurant-detail" class="restaurant-detail"></section>

        <section class="restaurant-menu">
          <h3 class="restaurant-menu-title">Daftar Menu</h3>

          <h4 class="restaurant-menu-subtitle">Makanan</h4>
          <div id="food-menu" class="restaurant-menu-content"></div>

          <h4 class="restaurant-menu-subtitle">Minuman</h4>
          <div id="drink-menu" class="restaurant-menu-content"></div>
        </section>

        <section class="reviews">
          <h3 class="review-title">Customer Review</h3>
          <div id="reviews" class="rev  iews-list"></div>

          <h4 class="reviews-subtitle">Write a Review</h4>
          <form id="reviewForm" class="reviews-form">
              <div class="reviews-form-field">
                <label class="reviews-form-label" for="name">Your name</label>
                <input class="reviews-form-input" type="text" id="name" name="name" placeholder="Your name..." required>
              </div>
              <div class="reviews-form-field">
                <label class="reviews-form-label" for="review">What do you think about this restaurant?</label>
                <input class="reviews-form-input" type="text" id="review" name="review" placeholder="Your Review" required>
              </div>
              <button class="reviews-form-submit" type="submit">Send Review</button>
          </form>
        </section>

    </div>

    <div id="likeButtonContainer"></div>
       
    `;
    },

    async afterRender() {
        //
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.getRestaurant(url.id);

        // render detail
        const restaurantContainer = document.querySelector('#restaurant-detail');
        restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

        // render menu
        const foodMenu = document.querySelector('#food-menu');
        const drinkMenu = document.querySelector('#drink-menu');

        const { foods, drinks } = restaurant.menus;

        foodMenu.innerHTML = foods.map(createMenuTemplate).join('');
        drinkMenu.innerHTML = drinks.map(createMenuTemplate).join('');

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description,
                pictureId: restaurant.pictureId,
                city: restaurant.city,
                rating: restaurant.rating,
            },
        });

        //
        this._renderCustomerReviews(restaurant.customerReviews);

        const reviewForm = document.querySelector('#reviewForm');
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const review = {
                id: restaurant.id,
                name: reviewForm.name.value,
                review: reviewForm.review.value,
            };

            const updateCustomerReviews = await RestaurantSource.postReview(review);
            if (updateCustomerReviews) {
                this._renderCustomerReviews(updateCustomerReviews);
                reviewForm.reset();
            }
        });
    },

    _renderCustomerReviews(customerReviews) {
        const reviewsContainer = document.querySelector('#reviews');
        reviewsContainer.innerHTML = customerReviews
            .map(createCustomerReviewTemplate)
            .join('');
    },
};

export default DetailRestaurant;
