import HomePage from '../views/pages/home-page';
import SearchPage from '../views/pages/search-page';
import DetailPage from '../views/pages/detail-page';
import FavoritePage from '../views/pages/favorite-page';

const routes = {
  '/': HomePage,
  '/home': HomePage,
  '/search/:id': SearchPage,
  '/detail/:id': DetailPage,
  '/favorite': FavoritePage,
};

export default routes;
