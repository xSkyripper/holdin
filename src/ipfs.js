const ipfs = {
  debug: true,
  ipfsCordova: null,
  ipfsApi: null,

  initIpfs(cipfs, aipfs, cb) {
    let self = this;
    this.ipfsCordova = cipfs;
    this.ipfsApi = aipfs;

    self.ipfsCordova.init({
      src: "https://dist.ipfs.io/go-ipfs/v0.4.9/go-ipfs_v0.4.9_linux-arm.tar.gz",
      appFilesDir: cordova.file.dataDirectory.split("file://")[1] + "files/",
      resetRepo: false
    }, function (res) {
      console.log(res);

      self.ipfsCordova.start(function (res) {
        console.log(res);
        try {
          self.ipfsApi = new self.ipfsApi();
          throw new Error("O eroare");
        } catch (err) {
          cb("IPFS Cannot connect ! Error: " + err);
          return;
        }
        cb();
      }, function (err) {
        console.log(err);
        cb(err);
      });

    }, function (err) {
      console.log(err);
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
