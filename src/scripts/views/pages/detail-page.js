import RestaurantApiSource from '../../data/restaurantapi-source';
import UrlParser from '../../routes/url-parser';
import LoaderInitiator from '../../utils/loader-initiator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import AddReviewInitiator from '../../utils/add-review-initiator';
import {
  createNetworkError,
  create404Error,
  createRestaurantDetailTemplate,
  createCategoryItem,
  createDrinkItem,
  createFoodItem,
  createReviewCustomer,
} from '../templates/template-creator';

const DetailPage = {
  async render() {
    return /* html */ `
    <main id="maincontent">
        <div class="detail-container"></div>
    </main>
    <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const content = document.querySelector('.detail-container');
    try {
      LoaderInitiator.init(content);
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantApiSource.detailRestaurant(url.id);
      const { foods, drinks } = restaurant.menus;
      const { categories, customerReviews } = restaurant;

      // Detail restaurant
      content.innerHTML += createRestaurantDetailTemplate(restaurant);

      // Category restaurant
      const categoryElement = document.querySelector('#categories');
      categories.forEach((category) => categoryElement.innerHTML += createCategoryItem(category));

      // Drinks & Foods
      const drinkElement = document.querySelector('#drink-list');
      const foodElement = document.querySelector('#food-list');
      drinks.forEach((drink) => drinkElement.innerHTML += createDrinkItem(drink));
      foods.forEach((food) => foodElement.innerHTML += createFoodItem(food));

      // Review
      content.innerHTML += createReviewCustomer(customerReviews);

      AddReviewInitiator.init({
        reviewButton: document.querySelector('#button-review'),
        inputName: document.querySelector('#nama-input'),
        inputReview: document.querySelector('#review-input'),
        reviewListContainer: document.querySelector('#review-list'),
        id: url.id,
      });

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          city: restaurant.city,
        },
      });
    } catch (error) {
      content.innerHTML = (error.message === 'Failed to fetch') ? createNetworkError() : create404Error();
    } finally {
      LoaderInitiator.removeLoader();
    }
  },
};

export default DetailPage;
