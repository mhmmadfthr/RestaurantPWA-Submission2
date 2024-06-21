/* eslint-disable operator-linebreak */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';
import { createRestaurantItemTemplate } from '../templates/template-creator.js';

const Like = {
    async render() {
        return `
    <div class="content">
      <h2 class="content-heading">Your Liked Restaurant</h2>

      <div id="noFavoriteMessage" style="display: none;">
        <p>NOT FOUND!</p>
      </div>

      <div id="restaurants" class="restaurants">
 
      </div>
    </div>
    `;
    },

    async afterRender() {
        const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

        const restaurantsContainer = document.querySelector('#restaurants');
        const noFavoriteMessage = document.querySelector('#noFavoriteMessage');

        if (restaurants.length === 0) {
            noFavoriteMessage.style.display = 'block';
        } else {
            noFavoriteMessage.style.display = 'none';
        }

        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML +=
                createRestaurantItemTemplate(restaurant);
        });
    },
};

export default Like;
