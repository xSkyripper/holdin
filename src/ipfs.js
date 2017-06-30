import Q from 'q'

const ipfs = {
  debug: true,
  ipfsCordova: null,
  ipfsApi: null,
  store: null,

  state: {
    zoneHash: null
  },

  startIpfs(ctx, cb) {
    let self = this;
    this.ipfsCordova = ctx.cipfs;
    this.ipfsApi = ctx.aipfs;
    this.store = ctx.store;

    // self.ipfsCordova.init({
    //   src: "https://dist.ipfs.io/go-ipfs/v0.4.9/go-ipfs_v0.4.9_linux-arm.tar.gz",
    //   appFilesDir: cordova.file.dataDirectory.split("file://")[1] + "files/",
    //   resetRepo: false
    // }, function (res) {
    //   self.debug && console.log(res);
    //   self.store.setStatusIpfsRepo(true);
    //
    //   self.ipfsCordova.start(function (res) {
    //     self.debug && console.log(res);
    //     self.store.setStatusIpfsDaemon(true);
    //     try {
    //       self.ipfsApi = new self.ipfsApi();
    //     } catch (err) {
    //       self.store.setStatusIpfsPubSub(false);
    //       cb("IPFS Cannot connect ! Error: " + err);
    //       return;
    //     }
    //
    //     self.ipfsApi.id(function (err, iden) {
    //       if (err) {
    //         cb("IPFS cannot fetch IPFS ID ! Error: " + err);
    //       }
    //       else {
    //         self.store.setNodeId(iden.id);
    //       }
    //     });
    //
    //     self.updateZone();
    //
    //     cb();
    //   }, function (err) {
    //     self.debug && console.log(err);
    //     self.store.setStatusIpfsDaemon(false);
    //     cb(err);
    //   });
    //
    // }, function (err) {
    //   self.debug && console.log(err);
    //   self.store.setStatusIpfsRepo(false);
    //   cb(err);
    // });

    function prepareIpfs() {
      let dfrd = new Q.defer();

      self.ipfsCordova.init({
        src: "https://dist.ipfs.io/go-ipfs/v0.4.9/go-ipfs_v0.4.9_linux-arm.tar.gz",
        appFilesDir: cordova.file.dataDirectory.split("file://")[1] + "files/",
        resetRepo: false
      }, function (res) {
        self.debug && console.log(res);
        self.store.setStatusIpfsRepo(true);

        dfrd.resolve();
      }, function (err) {
        self.debug && console.log(err);
        self.store.setStatusIpfsRepo(false);
        //cb(err);
        dfrd.reject(err);
      });


      return dfrd.promise;
    }

    function startDaemon() {
      let dfrd = new Q.defer();

      self.ipfsCordova.start(
        function (res) {
          self.debug && console.log(res);
          self.store.setStatusIpfsDaemon(true);

          dfrd.resolve();
        }, function (err) {
          self.debug && console.log(err);
          self.store.setStatusIpfsDaemon(false);
          //cb(err);
          dfrd.reject(new Error(err));
        });

      return dfrd.promise;
    }

    function connectApi() {
      let dfrd = new Q.defer();

      try {
        self.ipfsApi = new self.ipfsApi();
      } catch (err) {
        self.store.setStatusIpfsPubSub(false);
        dfrd.reject(err);
        // cb("IPFS Cannot connect ! Error: " + err);
        // return;
      }

      dfrd.resolve();

      return dfrd.promise;
    }

    prepareIpfs()
      .then(() => {
        return startDaemon();
      })
      .then(() => {
        return connectApi();
      })
      .then(() => {
        self.updateZone();
      })
      .then(() => {
        cb();
      })
      .catch((err) => {
        console.log("catch error in q: " + err);
        cb(err);
      })
  },

  sendMessage(rawMessage) {
    this.debug && console.log("sendMessage: ", rawMessage);
    let self = this;

    this.ipfsApi.object.put({
        Data: new Buffer(JSON.stringify(rawMessage)),
        Links: []
      },
      function (err, node) {
        if (err)
          throw err;

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
    // let self = this;

    this.debug && console.log("testMsgRcvr:");
    let msgHash = objMessageHash.data.toString();
    this.debug && console.log(objMessageHash);

    this.ipfsApi.object.data(msgHash, (err, data) => {
      if (err)
        throw err;

      let recvdMessage = JSON.parse(data.toString());
      recvdMessage.id = msgHash;
      this.store.addMessage(recvdMessage);

      this.debug && console.log(recvdMessage);
    });
  },

  updateZone() {
    this.debug && console.log("updateZone: " + this.state.zoneHash + " => " + this.store.state.locationZone.zoneHash);
    let self = this;

    setInterval(function () {
      if (self.state.zoneHash !== self.store.state.locationZone.zoneHash) {
        self.debug && console.log("updateZone: unsub: " + self.state.zoneHash);
        self.state.zoneHash !== null && self.ipfsApi.pubsub.unsubscribe(self.state.zoneHash, self.recvMessage.bind(self));
        self.debug && console.log("updateZone: sub: " + self.store.state.locationZone.zoneHash);
        self.store.state.locationZone.zoneHash !== null && self.ipfsApi.pubsub.subscribe(self.store.state.locationZone.zoneHash, self.recvMessage.bind(self));
        self.state.zoneHash = self.store.state.locationZone.zoneHash;
      }
    }, 1000);

    this.store.setStatusIpfsPubSub(true);
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
