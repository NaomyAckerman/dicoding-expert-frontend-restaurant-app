import RestaurantApiSource from '../data/restaurantapi-source';
import { createReviewItem } from '../views/templates/template-creator';

const AddReviewInitiator = {
  async init({
    reviewButton, inputName, inputReview, reviewListContainer, id,
  }) {
    this._reviewListContainer = reviewListContainer;
    this._inputName = inputName;
    this._inputReview = inputReview;
    this._reviewButton = reviewButton;
    this._id = id;

    await this._refreshReviewList();
  },

  async _refreshReviewList() {
    const restaurant = await RestaurantApiSource.detailRestaurant(this._id);
    this._reviews = restaurant.customerReviews;

    await this._renderReviewList();
  },

  async _renderReviewList() {
    this._reviewListContainer.innerHTML = '';
    this._inputName.value = '';
    this._inputReview.value = '';

    const countReview = document.querySelector('#countReview');
    countReview.innerHTML = `Customer Reviews (${this._reviews.length})`;

    this._reviews.forEach((review) => {
      this._reviewListContainer.innerHTML += createReviewItem(review);
    });

    this._handleOnClickListener();
  },

  _handleOnClickListener() {
    this._reviewButton.addEventListener('click', async (event) => {
      event.stopPropagation();
      if (this._inputName.value !== '' && this._inputReview.value !== '') {
        try {
          const response = await RestaurantApiSource.sendReview({
            id: this._id,
            name: this._inputName.value,
            review: this._inputReview.value,
          });

          const newCustomerReviews = response.customerReviews;
          this._reviews = newCustomerReviews;

          this._renderReviewList();
        } catch (error) {
          console.log(error);
        }
      }
    });
  },
};

export default AddReviewInitiator;
