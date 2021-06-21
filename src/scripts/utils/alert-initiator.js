import { createAlert } from '../views/templates/template-creator';

const AlertInitiator = {
  init(type = 'success', message) {
    this._type = type;
    this._message = message;

    this._renderAlertComponent();
  },

  _renderAlertComponent() {
    const container = document.querySelector('#app');
    container.innerHTML += createAlert(this._type, this._message);
    this._showAlert();
    this._removeAlert();
  },

  _showAlert() {
    this._alert = document.querySelector('.alert');
    this._alert.classList.toggle('show');
  },

  _removeAlert() {
    setTimeout(
      () => {
        this._alert.classList.toggle('show');
      }, 5000,
    );
    setTimeout(
      () => {
        this._alert.remove();
      }, 6000,
    );
  },
};

export default AlertInitiator;
