const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.error');
  I.see('Tidak ada restoran favorit', '.error__title');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.seeElement('.error');
  I.see('Tidak ada restoran favorit', '.error__title');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const firstRestaurant = locate('.post-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const likedRestaurantTitle = await I.grabTextFrom('.post-item__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unlike one restaurant', async ({ I }) => {
  I.seeElement('.error');
  I.see('Tidak ada restoran favorit', '.error__title');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const firstRestaurant = locate('.post-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  let likedRestaurantTitle = await I.grabTextFrom('.post-item__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  const firstLikedRestaurant = locate('.post-item__title a').first();
  const firstLikedRestaurantTitle = await I.grabTextFrom(firstLikedRestaurant);
  I.click(firstLikedRestaurant);

  likedRestaurantTitle = await I.grabTextFrom('.detail__title');

  assert.strictEqual(firstLikedRestaurantTitle, likedRestaurantTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.seeElement('.error');
  I.see('Tidak ada restoran favorit', '.error__title');
});
