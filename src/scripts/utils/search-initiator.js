const SearchInitiator = {
  init({
    searchInput, searchButton, searchBox,
  }) {
    this._searchInput = searchInput;
    this._searchButton = searchButton;
    this._searchBox = searchBox;

    this._handleOnClickListener();
  },

  _handleOnClickListener() {
    this._searchButton.addEventListener('click', () => {
      if (this._validateInput() && this._searchBox.classList.contains('open')) {
        window.location.href = `#/search/${this._searchInput.value}`;
        this._searchInput.value = '';
      } else {
        this._searchBox.classList.toggle('open');
        this._searchInput.focus();
      }
    });
  },

  _validateInput() {
    if (this._searchInput.value === '' || this._searchInput.value === null || this._searchInput.value === undefined) {
      return false;
    }
    return true;
  },
};

export default SearchInitiator;
