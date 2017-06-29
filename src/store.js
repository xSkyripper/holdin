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

function sha1Hash(txt) {
  let shasum = Crypto.createHash('sha1');
  shasum.update(txt);
  return shasum.digest('hex');
}

function cmpMsgDate(obj1, obj2) {
  let d1 = new Date(obj1.year, obj1.month, obj1.day, obj1.time.split(":")[0], obj1.time.split(":")[1], obj1.time.split(":")[2]);
  let d2 = new Date(obj2.year, obj2.month, obj2.day, obj2.time.split(":")[0], obj2.time.split(":")[1], obj2.time.split(":")[2]);
  return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
}

function lsSetObj(key, obj) {
  console.log("lsSetOb: " + key);
  console.log(obj);
  // console.log("lsSetOb: stringify: " + key);
  // console.log(JSON.stringify(obj));
  localStorage.setItem(key, JSON.stringify(obj));
}

function lsGetObj(key) {
  console.log("lsGetObj: parse: " + key);
  console.log(localStorage.getItem(key));
  return JSON.parse(localStorage.getItem(key));
}

import Crypto from 'crypto'
import Mgrs from 'mgrs'

const store = {
  debug: true,
  state: {
    nodeId: null,
    username: null,
    messages: [],
    messagesTTL: 1,

    locationZone: {zoneId: null, zoneHash: null},
    locationExact: {lon: null, lat: null},
    locationWatcher: null,
    zoneUpdater: undefined,
    zoneUpdaterDelay: 5,

    statusNetwork: false,
    statusLocation: false,
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

    temp = lsGetObj('locationZone');
    temp !== null && temp !== undefined &&
    (this.state.locationZone = temp);

    temp = lsGetObj('zoneUpdaterDelay');
    temp !== null && temp !== undefined &&
    (this.state.zoneUpdaterDelay = temp);

    temp = lsGetObj('locationExact');
    temp !== null && temp !== undefined &&
    (this.state.locationExact = temp);

    temp = lsGetObj('messagesTTL');
    temp !== null && temp !== undefined &&
    (this.state.messagesTTL = temp);

  },
  persistData() {
    this.debug && console.log('persistData: ');
    let self = this;

    lsSetObj('nodeId', self.state.nodeId);
    lsSetObj('username', self.state.username);
    lsSetObj('locationZone', self.state.locationZone);
    lsSetObj('zoneUpdaterDelay', self.state.zoneUpdaterDelay);
    lsSetObj('locationExact', self.state.locationExact);
    this.persistMessages();
    lsSetObj('messagesTTL', self.state.messagesTTL);
  },

  setNodeId(newNodeId) {
    this.debug && console.log('setNodeId: ', newNodeId);

    this.state.nodeId = newNodeId;
  },
  setUsername(newUsername) {
    this.debug && console.log('setUsername: ', newUsername);

    this.state.username = newUsername;
  },
  setLocationExact(newLocationExactLon, newLocationExactLat) {
    // this.debug && console.log('setLocationExact: ', newLocationExactLon, newLocationExactLat);

    this.state.locationExact.lon = newLocationExactLon;
    this.state.locationExact.lat = newLocationExactLat;
  },
  setLocationZone(newLocationZone) {
    this.debug && console.log('setLocationZone: ', newLocationZone);

    this.state.locationZone = newLocationZone;
  },

  resetZoneUpdater() {
    this.debug && console.log('resetZoneUpdater: ');
    let self = this;

    this.state.zoneUpdater !== undefined && clearInterval(this.state.zoneUpdater);

    function setZone() {
      let zone = {zoneId: null, zoneHash: null};
      zone.zoneId = Mgrs.forward([
        self.state.locationExact.lon,
        self.state.locationExact.lat
      ], 1);
      zone.zoneId = zone.zoneId.substr(0, zone.zoneId.length - 2);
      zone.zoneHash = sha1Hash(zone.zoneId);

      // only update if the zone is different
      self.state.zoneHash !== zone.zoneHash && self.setLocationZone(zone);

      self.debug && console.log(self.state.zoneUpdaterDelay);
      self.debug && console.log('resetZoneUpdater: ', zone);
    }

    setZone();
    this.state.zoneUpdater = setInterval(setZone,
      self.state.zoneUpdaterDelay * 60000);
  },
  setZoneUpdaterDelay(newZoneUpdaterDelay) {
    this.debug && console.log('setZoneUpdaterDelay: ' + newZoneUpdaterDelay);

    if (this.state.zoneUpdaterDelay <= 0) {
      this.state.zoneUpdaterDelay = 5;
    } else {
      this.state.zoneUpdaterDelay = newZoneUpdaterDelay;
    }

    this.resetZoneUpdater();
  },
  startLocationWatcher() {
    this.debug && console.log('startLocationWatcher: ');
    let self = this;

    this.state.locationWatcher = navigator.geolocation.watchPosition(function (pos) {
      self.setLocationExact(pos.coords.longitude, pos.coords.latitude);
      self.setStatusLocation(true);
    }, function (err) {
      self.setStatusLocation(false);
      window.f7.alert('Location Error ! Maybe it is not enabled ? Code: ' + err.code + '\n' +
        'message: ' + err.message + '\n');
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000
    });

    this.resetZoneUpdater();
  },

  setMessagesTTL(newMsgTTL) {
    this.debug && console.log('setMessagesTTL: ', newMsgTTL);

    this.state.messagesTTL = newMsgTTL;
  },
  deleteOldMessagesUpdater() {
    this.debug && console.log('startLocationWatcher: ');
    let self = this;

    function deleteOldMessages() {
      let now = new Date();

      self.state.messages.forEach(function (msg, ind) {
        let deadDate = new Date(msg.year, msg.month, String(parseInt(msg.day) + parseInt(self.state.messagesTTL)), msg.time.split(":")[0], msg.time.split(":")[1], msg.time.split(":")[2]);

        if (deadDate <= now) {
          console.log(self.state.messages[ind], ' has to die !');
          self.state.messages.splice(ind, 1);// is this right ?
        } else {
          console.log(self.state.messages[ind], ' will live !');
        }

      });
    }

    deleteOldMessages();
    setInterval(deleteOldMessages, 60000 * 1);
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
  getMessage(msgId) {
    this.debug && console.log('getMessage: ', msgId);
    let self = this;
    let message = null;

    self.state.messages.forEach(function (msg, ind) {
      msg.id === msgId && (message = msg)
    });

    return message;
  },
  retrieveMessages(ipfsApi) {
    this.debug && console.log('retrieveMessages:');
    let temp = lsGetObj('messages');

    temp !== null && temp.forEach((msgHash) => {
      this.debug && console.log('Retrieving:' + msgHash);

      //only add if it doesn't exist
      this.getMessage(msgHash) === null &&
      ipfsApi.object.data(msgHash, (err, data) => {
        if (err)
          throw err;

        let savedMessage = JSON.parse(data.toString());
        savedMessage.id = msgHash;
        this.addMessage(savedMessage);

        this.debug && console.log(savedMessage);
      });

    });
  },
  persistMessages() {
    this.debug && console.log('persistMessages: ');

    let temp = [];
    this.state.messages.forEach(function (msg, ind) {
      temp.push(msg.id);
    });
    console.log(temp);
    lsSetObj('messages', temp);
  },

  setStatusNetwork(newStatus) {
    this.debug && console.log('setStatusNetwork: ', newStatus);

    this.state.statusNetwork = newStatus;
  },
  setStatusLocation(newStatus) {
    this.debug && console.log('setStatusLocation: ', newStatus);

    this.state.statusLocation = newStatus;
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
