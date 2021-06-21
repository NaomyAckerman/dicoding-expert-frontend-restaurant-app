import RestaurantApiSource from '../../data/restaurantapi-source';
import UrlParser from '../../routes/url-parser';
import LoaderInitiator from '../../utils/loader-initiator';
import SearchInitiator from '../../utils/search-initiator';
import {
  createRestaurantItemTemplate,
  create404Error,
  createNetworkError,
  createNoRestaurant,
} from '../templates/template-creator';

const SearchPage = {
  async render() {
    return /* html */ `
        <div class="hero">
            <div class="hero__inner">
                <h1 class="hero__title">
                Selamat Datang Foody Lover di<br>
                <span>So Delicious</span>
                </h1>
                <p class="hero__tagline">Temukan restauran dengan cita rasa dan nuansa sesuai dengan keinginan hanya di so delicious</p>
                <div class="hero__search">
                    <div class="hero__search__box" id="box-search">
                        <input class="hero__search__input" type="text" name="search" placeholder="Cari restaurant kesukaanmu ..." id="input-search">
                        <button class="hero__search__button" id="btn-search" type="button" aria-label="tombol-cari">
                            <i class="fas fa-search" aria-label="icon-cari"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <main id="maincontent">
            <section class="content">
                <h1 class="search__label"></h1>
                <div class="latest">
                    <div class="posts" id="posts"></div>
                </div>
            </section>
        </main>    
    `;
  },

  async afterRender() {
    // Set hero image
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = "-webkit-image-set(url('./images/heros/hero-image_2-small.jpg') 1x,url('./images/heros/hero-image_2-large.jpg') 2x)";
    hero.style.backgroundImage = "image-set(url('./images/heros/hero-image_2-small.jpg') 1x,url('./images/heros/hero-image_2-large.jpg') 2x)";

    const content = document.querySelector('.content');
    try {
      LoaderInitiator.init(content);

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurants = await RestaurantApiSource.searchRestaurant(url.id);
      const posts = document.querySelector('#posts');

      const searchTitle = document.querySelector('.search__label');
      searchTitle.innerHTML = (restaurants.length > 0)
        ? `Hasil pencarian dari "${url.id}", ditemukan ${restaurants.length} restoran`
        : createNoRestaurant(url.id, restaurants.length);
      restaurants.forEach((restaurant) => {
        posts.innerHTML += createRestaurantItemTemplate(restaurant);
      });

      SearchInitiator.init({
        searchInput: document.querySelector('#input-search'),
        searchButton: document.querySelector('#btn-search'),
        searchBox: document.querySelector('#box-search'),
      });
    } catch (error) {
      content.innerHTML = (error.message === 'Failed to fetch') ? createNetworkError() : create404Error();
    } finally {
      LoaderInitiator.removeLoader();
    }
  },

};

export default SearchPage;
