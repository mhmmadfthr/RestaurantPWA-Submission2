import Home from '../views/pages/home.js';
import DetailRestaurant from '../views/pages/detail.js';
import Favorite from '../views/pages/favorite.js';

const routes = {
    '/': Home,
    '/detail/:id': DetailRestaurant,
    '/favorite': Favorite,
};

export default routes;
