import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';
import AlertInitiator from '../utils/alert-initiator';

export default class RestaurantApiSource {
  static async Restaurants() {
    const response = await fetch(API_ENDPOINT.RESTAURANTS);
    const responseJSON = await response.json();
    return responseJSON.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJSON = await response.json();
    return responseJSON.restaurant;
  }

  static async searchRestaurant(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async sendReview({ id, name, review }) {
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
      body: JSON.stringify({ id, name, review }),
    };

    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW, settings);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      AlertInitiator.init(
        'error',
        'Tidak dapat mengirim review. Harap periksa koneksi anda.',
      );
      return error;
    }
  }
}
