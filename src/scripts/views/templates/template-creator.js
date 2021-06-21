import CONFIG from '../../globals/config';
import summaryText from '../../utils/summary-text-helper';
import starRating from '../../utils/star-rating-helper';

const createHeadlineItemTemplate = (restaurant) => {
  const description = summaryText(restaurant.description, 300);

  return /* html */ `
    <figure class="headline__figure">
        <picture>
            <source media="(max-width: 480px)" data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" type="image/jpeg">
            <img 
            class="lazyload" 
            crossorigin="anonymous"
            width="100%"
            height="360px"
            data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}" 
            alt="restaurant ${restaurant.name}" />
        </picture>
        <div class="headline__figure__city">
            <p>${restaurant.city}</p>
        </div>
        <figcaption>
            Restaurant terbaik di Indonesia : ${restaurant.name}
        </figcaption>
    </figure>
    <div class="headline__content">
        <h1 class="headline__title">#sodelicious : Kualitas yang bisa Anda cicipi</h1>
        <p class="headline__description">
            ${description}
        </p>
        <a href="#/detail/${restaurant.id}" aria-label="headline-read-more" class="headline__button">Read More</a>
    </div>    
    `;
};

const createRestaurantItemTemplate = (restaurant) => {
  const description = summaryText(restaurant.description, 200);
  const rating = starRating(restaurant.rating);

  return /* html */ `
    <article class="post-item">
        <picture>
        <source media="(max-width: 480px)" data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" type="image/jpeg">
            <img
                crossorigin="anonymous"
                class="post-item__thumbnail lazyload"
                width="100%"
                height="250px"
                data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}"
                alt="restaurant ${restaurant.name}"
            />
        </picture>
        <div class="post-item__city">
            <p>${restaurant.city}</p>
        </div>
        <div class="post-item__content">
            <p class="post-item__rating">Rating : </p>
            <p class="post-item__rating__value">${restaurant.rating}</p>
            <div class="post-item__rating__star">
                <ul>
                    ${rating}
                </ul>
            </div>
            <h1 class="post-item__title">
                <a href="#/detail/${restaurant.id}" aria-label="${restaurant.name}">${restaurant.name}</a>
            </h1>
            <p class="post-item__description">
                ${description} <a href="#/detail/${restaurant.id}" aria-label="selengkapnya ${restaurant.name}">Selengkapnya</a>
            </p>
        </div>
    </article>
    `;
};

const createRestaurantDetailTemplate = (restaurant) => {
  const rating = starRating(restaurant.rating);

  return /* html */ `
    <article class="detail__content">
        <figure class="detail__figure">
            <picture>
                <source media="(max-width: 480px)" data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" type="image/jpeg">
                <img 
                    crossorigin="anonymous"
                    class="lazyload"
                    width="100%"
                    height="60%"      
                    data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}"
                    alt="restaurant ${restaurant.name}" />
            </picture>
            <figcaption>
                Restoran daerah ${restaurant.city}
            </figcaption>
        </figure>
        <div class="detail__body">
            <h2 class="detail__title">${restaurant.name}</h2>
            <p class="detail__rating">Rating : ${restaurant.rating}</p>
            <div class="detail__rating__star">
                <ul>
                    ${rating}
                </ul>
            </div>
            <p>Kota : ${restaurant.city}</p>
            <p>Lokasi : ${restaurant.address}</p>
            <p class="detail__category" id="categories">Kategori: </p>
            <p class="detail__description">${restaurant.description}</p>
        </div>
        <div class="menu">
            <h2 class="menu__title">Daftar Menu</h2>
            <div class="menu__list">
                <div class="menu__list__food">
                    <h3>Makanan</h3>
                    <ul id="food-list"></ul>
                </div>
                <div class="menu__list__drink">
                    <h3>Minuman</h3>
                    <ul id="drink-list"></ul>
                </div>
            </div>
        </div>
    </article>
    `;
};

const createRestaurantNoFavorite = () => /* html */ `
<div class="error">
    <h2 class="error__title">Tidak ada restoran favorit</h2>
    <p class="error__description">Anda dapat menambahkan dengan mengklik tombol menyukai di halaman detail restoran</p>
    <a class="error__back" href="#/home" aria-label="back-to-home">Back to Home</a>
</div>
`;

const createNoRestaurant = (restaurant, count) => /* html */ `
<div class="error">
    <h2 class="error__title">Restaurant tidak ditemukan</h2>
    <p class="error__description">Hasil pencarian restaurant ${restaurant} tidak ditemukan jumlah ${count}</p>
</div>
`;

const createCategoryItem = (category) => /* html */ `<span>${category.name}</span> `;

const createDrinkItem = (drink) => /* html */ `<li>${drink.name}</li>`;

const createFoodItem = (food) => /* html */ `<li>${food.name}</li>`;

const createReviewCustomer = (customerReviews) =>/* html */ `
<section class="review">              
    <div class="review__add">
        <h2>Tambah Review</h2>
        <div class="form__group">
            <input type="input" class="form__field" placeholder="Masukkan nama anda" name="nama" id='nama-input' />
            <label for="nama-input" class="form__label">Nama</label>
        </div>
        <div class="form__group">
            <textarea type="text" class="form__field" placeholder="Masukkan review anda" name="review" id="review-input" rows="3"></textarea>
            <label for="review-input" class="form__label">Review</label>
        </div>
        <button type="button" class="button-input" name="send-review" id="button-review">Submit Review</button>
    </div>
    <div class="review__content">
        <h2 id="countReview">Customer Reviews (${customerReviews.length})</h2>
        <div class="review-list" id="review-list"></div>
    </div>
</section>
`;

const createReviewItem = (review) => /* html */ `
<div class="review-item">
    <p class="customer-name">${review.name}</p>
    <p class="review-date">tgl: ${review.date}</p>
    <p>${review.review}</p>
</div>
`;

const createLikeButtonTemplate = () => /* html */ `
<button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="far fa-heart" aria-hidden="true"></i>
</button>
`;

const createLikedButtonTemplate = () => /* html */ `
<button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fas fa-heart" aria-hidden="true"></i>
</button>
`;

const createLoader = () => /* html */ `
<div class="loader">
    <div class="black"></div>
    <div class="gold"></div>
</div>
`;

const createAlert = (type, message) => /* html */ `<div class='alert alert-${type}'>${message}</div>`;

const create404Error = () => /* html */ `
<div class="error">
<h1 class="error__type">404</h1>
<h2 class="error__title">UH OH! You're lost.</h2>
<p class="error__description">The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.</p>
<a class="error__back" href="#/home" aria-label="back-to-home">Back to Home</a>
</div>
`;

const createNetworkError = () => /* html */ `
<div class="error">
<h2 class="error__title">An internal error has occurred.</h2>
<p class="error__description">Please check your connection and try again.</p>
<a class="error__back" href="#/home" aria-label="back-to-home">Back to Home</a>
</div>
`;

export {
  createHeadlineItemTemplate,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantNoFavorite,
  createCategoryItem,
  createDrinkItem,
  createFoodItem,
  createReviewCustomer,
  createReviewItem,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createLoader,
  createAlert,
  create404Error,
  createNetworkError,
  createNoRestaurant,
};
