import { createLoader } from '../views/templates/template-creator';

const LoaderInitiator = {
  init(container) {
    this._container = container;

    this._renderLoaderComponent();
  },

  _renderLoaderComponent() {
    this._container.innerHTML += createLoader();
  },

  removeLoader() {
    const loader = document.querySelector('.loader');
    loader.remove();
  },
};

export default LoaderInitiator;
