const store = {
  debug: true,
  state: {
    nodeId: null,
    username: null,
    locationArea: null,
    locationExact: null,
    messages: [],
  },
  initStore() {
    this.state.username = localStorage.getItem('username');
    this.state.locationArea = localStorage.getItem('locationArea');
  },
  setUsername(newUsername) {
    this.debug && console.log('setUsername: ', newUsername);

    localStorage.setItem('username', newUsername);
    this.state.username = newUsername;
  },
  setLocationArea(newLocationArea) {
    this.debug && console.log('setLocationArea: ', newLocationArea);

    localStorage.setItem('locationArea', newLocationArea)
  }
};

export default {
  store,
  install (Vue, options) {
    Vue.prototype.$myStore = store;
  }
};
