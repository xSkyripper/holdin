import Heap from 'heap';

function lsSetObj(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function lsGetObj(key) {
  return JSON.parse(localStorage.getItem(key));
}

function cmpMsgDate(obj1, obj2) {
  let d1 = new Date(obj1.year, obj1.month, obj1.day, obj1.time.split(":")[0], obj1.time.split(":")[1]);
  let d2 = new Date(obj2.year, obj2.month, obj2.day, obj2.time.split(":")[0], obj2.time.split(":")[1]);
  return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
}

const store = {
  debug: true,
  state: {
    nodeId: null,
    username: null,
    locationArea: null,
    locationExact: null,
    messagesHeap: null,
    messages: []
  },
  initStore() {
    this.state.username = localStorage.getItem('username');
    this.state.locationArea = localStorage.getItem('locationArea');
    this.state.messagesHeap = new Heap(cmpMsgDate);
  },
  setUsername(newUsername) {
    this.debug && console.log('setUsername: ', newUsername);

    this.state.username = newUsername;
    localStorage.setItem('username', newUsername);
  },
  setLocationArea(newLocationArea) {
    this.debug && console.log('setLocationArea: ', newLocationArea);
    // TODO: check if zone in zones array ?

    this.state.locationArea = newLocationArea;
    localStorage.setItem('locationArea', newLocationArea)
  },
  setLocationExact(newLocationExact) {
    this.debug && console.log('setLocationExact: ', newLocationExact);

    this.state.locationExact = newLocationExact;
    localStorage.setItem('locationExact', newLocationExact);
  },
  addMessage(newMessage) {
    this.debug && console.log('addMessage: ', newMessage);

    this.state.messagesHeap.push(newMessage);
    this.state.messages.push(this.state.messagesHeap.top());
  }
};

export default {
  store,
  install (Vue, options) {
    Vue.prototype.$myStore = store;
  }
};
