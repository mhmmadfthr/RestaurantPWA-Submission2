import RestaurantSource from '../../data/restaurant-resource.js';
import { createRestaurantItemTemplate } from '../templates/template-creator.js';

const Home = {
    async render() {
        return `
      <div class="hero">
        <div class="hero-content">
          <div class="hero-title">Selamat Datang di Rate Resto.</div>
          <div class="hero-tagline">Kenalilah restoran-restorannya sebelum anda berkunjung!</div>
          <a href="#mainContent" class="hero-button">Explore Restaurant</a>
        </div>
      </div>

      <div class="content">
        <h2 class="content-heading">Restaurant List</h2>
        <div id="restaurants" class="restaurants">
      
        </div>
      </div>
    `;
    },

    async afterRender() {
        const restaurants = await RestaurantSource.getRestaurants();

        const restaurantsContainer = document.querySelector('#restaurants');
        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
    },
};

export default Home;
