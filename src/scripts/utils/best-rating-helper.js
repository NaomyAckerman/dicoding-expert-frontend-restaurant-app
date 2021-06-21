export default function bestRating(restaurants) {
  return Math.max.apply(Math, restaurants.map((restaurant) => restaurant.rating));
}
