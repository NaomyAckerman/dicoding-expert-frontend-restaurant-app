export default function starRating(rating) {
  const floorRating = Math.floor(rating);
  let countUnstar = 4;
  let htmlRating = '';
  const star = '<li><i aria-hidden="true" class="fas fa-star" ></i></li>';
  const unstar = '<li><i aria-hidden="true" class="far fa-star" ></i></li>';
  const halfStar = '<li><i aria-hidden="true" class="fas fa-star-half-alt" ></i></li>';
  // Iteration Star
  for (let index = 1; index <= 5; index++) {
    if (index <= floorRating) htmlRating += star;
  }
  // Half Star
  if (rating % 1 > 0) {
    htmlRating += halfStar;
    countUnstar = 4;
  } else { countUnstar = 5; }
  // Iteration Unstar
  for (let index = floorRating; index < countUnstar; index++) {
    htmlRating += unstar;
  }
  return htmlRating;
}
