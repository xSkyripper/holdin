const ipfs = {
  debug: true,
  ipfsCordova: null,
  ipfsApi: null,
  store: null,

  state: {
    zoneHash: null
  },

  initIpfs(cipfs, aipfs, store, cb) {
    let self = this;
    this.ipfsCordova = cipfs;
    this.ipfsApi = aipfs;
    this.store = store;

    self.ipfsCordova.init({
      src: "https://dist.ipfs.io/go-ipfs/v0.4.9/go-ipfs_v0.4.9_linux-arm.tar.gz",
      appFilesDir: cordova.file.dataDirectory.split("file://")[1] + "files/",
      resetRepo: false
    }, function (res) {
      console.log(res);
      self.store.setStatusIpfsRepo(true);

      self.ipfsCordova.start(function (res) {
        console.log(res);
        self.store.setStatusIpfsDaemon(true);
        try {
          self.ipfsApi = new self.ipfsApi();
        } catch (err) {
          self.store.setStatusIpfsPubSub(false);
          cb("IPFS Cannot connect ! Error: " + err);
          return;
        }

        self.ipfsApi.id(function (err, iden) {
          if (err)
            cb("IPFS cannot fetch IPFS ID ! Error: " + err);
          else {
            self.store.setNodeId(iden.id);
          }
        });

        self.updateZone();
        self.store.setStatusIpfsPubSub(true);
        cb();
      }, function (err) {
        console.log(err);
        self.store.setStatusIpfsDaemon(false);
        cb(err);
      });

    }, function (err) {
      console.log(err);
      self.store.setStatusIpfsRepo(false);
      cb(err);
    });
  },

  sendMessage(rawMessage) {
    let self = this;

    this.ipfsApi.object.put({
        Data: new Buffer(JSON.stringify(rawMessage)),
        Links: []
      },
      function (err, node) {
        if (err)
          throw err;

        //TODO: save node.toJSON().multihash as ID for message

        self.ipfsApi.pubsub.publish(
          self.store.state.locationZone.zoneHash,
          new Buffer(node.toJSON().multihash),
          function (err) {
            if (err)
              throw err;
          });

      });
  },
  recvMessage(objMessageHash) {
    console.log("testMsgRcvr:");
    let msgHash = objMessageHash.data.toString();
    console.log(msgHash);

    this.ipfsApi.object.data(msgHash, function (err, data) {
      if (err)
        throw err;

      //TODO: complete ID in msg object and save it to message

      console.log(JSON.parse(data.toString()));
    });
  },

  updateZone() {
    console.log("updateZone: " + this.state.zoneHash + " => " + this.store.state.locationZone.zoneHash);
    let self = this;

    setInterval(function () {
      if (self.state.zoneHash !== self.store.state.locationZone.zoneHash) {
        console.log("updateZone: unsub: " + self.state.zoneHash);
        self.state.zoneHash !== null && self.ipfsApi.pubsub.unsubscribe(self.state.zoneHash, self.recvMessage.bind(self));
        console.log("updateZone: sub: " + self.store.state.locationZone.zoneHash);
        self.store.state.locationZone.zoneHash !== null && self.ipfsApi.pubsub.subscribe(self.store.state.locationZone.zoneHash, self.recvMessage.bind(self));
        self.state.zoneHash = self.store.state.locationZone.zoneHash;
      }
    }, 1000);
  },
};

export default {
  ipfs,
  install (Vue, options) {
    Vue.prototype.$myIpfs = ipfs;
  }
};


// setInterval(function () {
//   cordova.plugins.notification.local.schedule({
//     // id: 1,
//     title: "Single Notif Title",
//     text: "Single Notification",
//     data: {key: "val"}
//   });
// }, 1000);
