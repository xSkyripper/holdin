function lsSetObj(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function lsGetObj(key) {
  return JSON.parse(localStorage.getItem(key));
}

function bsLocationOf(element, array, comparer, start, end) {
  if (array.length === 0)
    return -1;

  start = start || 0;
  end = end || array.length;
  let pivot = (start + end) >> 1;

  let compRes = comparer(element, array[pivot]);
  if (end - start <= 1)
    return compRes === -1 ? pivot - 1 : pivot;

  switch (compRes) {
    case -1:
      return bsLocationOf(element, array, comparer, start, pivot);
    case 0:
      return pivot;
    case 1:
      return bsLocationOf(element, array, comparer, pivot, end);
  }
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
    messages: [],

    statusNetwork: false,
    statusIpfsRepo: false,
    statusIpfsDaemon: false,
    statusIpfsPubSub: false
  },
  retrieveData() {
    let self = this;
    this.state.nodeId = lsGetObj('nodeId');
    this.state.username = lsGetObj('username');
    this.state.locationArea = lsGetObj('locationArea');
    this.state.locationExact = lsGetObj('locationExact');

    let temp = lsGetObj('messages');
    temp !== null && temp.forEach(function (msg) {
      self.state.messages.push(msg);
    });

    console.log(this.state.messages);
  },
  persistData(){
    lsSetObj('nodeId', this.state.nodeId);
    lsSetObj('username', this.state.username);
    lsSetObj('locationArea', this.state.locationArea);
    lsSetObj('locationExact', this.state.locationExact);
    lsSetObj('messages', this.state.messages);
  },
  setUsername(newUsername) {
    this.debug && console.log('setUsername: ', newUsername);

    this.state.username = newUsername;
  },
  setLocationArea(newLocationArea) {
    this.debug && console.log('setLocationArea: ', newLocationArea);
    // TODO: check if zone in zones array ?

    this.state.locationArea = newLocationArea;
  },
  setLocationExact(newLocationExact) {
    this.debug && console.log('setLocationExact: ', newLocationExact);

    this.state.locationExact = newLocationExact;
  },
  addMessage(newMessage) {
    this.debug && console.log('addMessage: ', newMessage);

    this.state.messages.splice(bsLocationOf(newMessage, this.state.messages, cmpMsgDate) + 1, 0, newMessage);

    this.persistData();
  },

  setStatusNetwork(newStatus) {
    this.debug && console.log('setStatusNetwork: ', newStatus);

    this.state.statusNetwork = newStatus;
  },
  setStatusIpfsRepo(newStatus) {
    this.debug && console.log('setStatusIpfsRepo: ', newStatus);

    this.state.statusIpfsRepo = newStatus;
  },
  setStatusIpfsDaemon(newStatus) {
    this.debug && console.log('setStatusIpfsDaemon: ', newStatus);

    this.state.statusIpfsDaemon = newStatus;
  },
  setStatusIpfsPubSub(newStatus) {
    this.debug && console.log('setStatusIpfsPubSub: ', newStatus);

    this.state.statusIpfsPubSub = newStatus;
  },

};

export default {
  store,
  install (Vue, options) {
    Vue.prototype.$myStore = store;
  }
};
