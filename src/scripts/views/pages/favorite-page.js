import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import {
  createRestaurantItemTemplate,
  createRestaurantNoFavorite,
} from '../templates/template-creator';

const FavoritePage = {
  async render() {
    return /* html */ `
    <main id="maincontent">        
    <section class="content">
        <article class="headline" id="headline"></article>
        <div class="latest">
        <h1 class="latest__label">Favorite Restaurant</h1>
        <div class="posts" id="posts"></div>
        </div>
    </section>
    </main>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('#posts');
    const content = document.querySelector('.content');

    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      content.innerHTML = createRestaurantNoFavorite();
    }
  },
};

export default FavoritePage;
