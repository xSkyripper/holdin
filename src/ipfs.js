const ipfs = {
  debug: true,
  ipfsCordova: null,
  ipfsApi: null,
  setIpfsCordova(cipfs) {
    this.ipfsCordova = cipfs;
  },
  setIpfsApi(aipfs){
    this.ipfsApi = aipfs;
  }
};

export default {
  ipfs,
  install (Vue, options) {
    Vue.prototype.$myIpfs = ipfs;
  }
};
