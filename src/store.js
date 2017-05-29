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

function lsSetObj(key, obj) {
  console.log("lsSetOb: ");
  console.log(obj);
  console.log("lsSetOb: stringify: ");
  console.log(JSON.stringify(obj));
  localStorage.setItem(key, JSON.stringify(obj));
}

function lsGetObj(key) {
  console.log("lsGetObj: parse: ");
  console.log(localStorage.getItem(key));
  return JSON.parse(localStorage.getItem(key));
}

import Zones from './zones.js'
import Mgrs from 'mgrs'

const store = {
  debug: true,
  state: {
    nodeId: null,
    username: null,
    locationExact: {lon: null, lat: null},
    locationWatcher: null,
    locationZones: [],
    messages: [],


    statusNetwork: false,
    statusIpfsRepo: false,
    statusIpfsDaemon: false,
    statusIpfsPubSub: false
  },

  retrieveData() {
    this.debug && console.log('retrieveData: ');
    let self = this;
    let temp;

    this.state.nodeId = lsGetObj('nodeId');
    this.state.username = lsGetObj('username');

    temp = lsGetObj('locationExact');
    temp !== null && temp !== undefined &&
    (this.state.locationExact = temp);

    temp = lsGetObj('locationZones');
    temp !== null && temp.forEach(function (zone) {
      self.state.locationZones.push(zone);
    });

    temp = lsGetObj('messages');
    temp !== null && temp.forEach(function (msg) {
      self.state.messages.push(msg);
    });
  },
  persistData() {
    this.debug && console.log('persistData: ');
    let self = this;

    lsSetObj('nodeId', self.state.nodeId);
    lsSetObj('username', self.state.username);
    lsSetObj('locationExact', self.state.locationExact);
    lsSetObj('locationZones', self.state.locationZones);
    lsSetObj('messages', self.state.messages);
  },

  setNodeId(newNodeId) {
    this.debug && console.log('setNodeId: ', newNodeId);

    this.state.nodeId = newNodeId;
  },
  setUsername(newUsername) {
    this.debug && console.log('setUsername: ', newUsername);

    this.state.username = newUsername;
  },
  setLocationExact(newLocationExact) {
    this.debug && console.log('setLocationExact: ', newLocationExact);

    this.state.locationExact = newLocationExact;
  },

  addLocationZone(newZone) {
    this.debug && console.log('addLocationZone: ', newZone);

    let exists = false;
    this.state.locationZones.forEach(function (zone, ind) {
      zone.id === newZone.id && (exists = true);
    });

    !exists && this.state.locationZones.push(newZone)
  },
  remLocationZone(zoneId) {
    this.debug && console.log('remLocationZone: ', zoneId);
    let self = this;

    self.state.locationZones.forEach(function (zone, ind) {
      zone.id === zoneId && self.state.locationZones.splice(ind, 1)
    });
  },
  startLocationWatcher() {
    let self = this;

    this.state.locationWatcher = navigator.geolocation.watchPosition(function (pos) {
      self.state.locationExact.lon = pos.coords.longitude;
      self.state.locationExact.lat = pos.coords.latitude;
    }, function (err) {
      window.f7.alert('Location Error ! code: ' + err.code + '\n' +
        'message: ' + err.message + '\n');
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000
    });

    setInterval(function() {
      let zone = Mgrs.forward([self.state.locationExact.lon, self.state.locationExact.lat], 1);
      zone = zone.substr(0, zone.length - 2);

      console.log(zone);
      console.log(Zones[zone].sha1Hash);
    }, 5000);
  },

  addMessage(newMessage) {
    this.debug && console.log('addMessage: ', newMessage);

    this.state.messages.splice(bsLocationOf(newMessage, this.state.messages, cmpMsgDate) + 1, 0, newMessage);
  },
  remMessage(msgId) {
    this.debug && console.log('remMessage: ', msgId);
    let self = this;

    self.state.messages.forEach(function (msg, ind) {
      msg.id === msgId && self.state.messages.splice(ind, 1)
    });
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
