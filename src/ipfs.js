const ipfs = {
  debug: true,
  ipfsCordova: null,
  ipfsApi: null,
  store: null,

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
        //TODO: get id to store
        //TODO: subscribe to pubsub
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
  }
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
