import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'

import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import MaterialIcons from './assets/css/material-icons.css'

import AppStyles from './assets/sass/main.scss'
import CustomAppStyles from './assets/sass/custom-main.scss'

import Routes from './routes.js'
import App from './main.vue'
import myStore from './store.js'
import myIpfs from './ipfs.js'
import ipfsAPI from 'ipfs-api'

Vue.use(Framework7Vue);
Vue.use(myStore);
Vue.use(myIpfs);

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  cordova.plugins.backgroundMode.enable();

  // setInterval(function () {
  //   cordova.plugins.notification.local.schedule({
  //     // id: 1,
  //     title: "Single Notif Title",
  //     text: "Single Notification",
  //     data: {key: "val"}
  //   });
  // }, 1000);

  let vm = new Vue({
    el: '#app',
    template: '<app/>',
    mounted() {
      let self = this;
      this.$myStore.initStore();

      this.$myIpfs.setIpfsCordova(new CordovaIpfs());
      console.log(this.$myIpfs);

      this.$myIpfs.ipfsCordova.init({
        src: "https://dist.ipfs.io/go-ipfs/v0.4.9/go-ipfs_v0.4.9_linux-arm.tar.gz",
        appFilesDir: cordova.file.dataDirectory.split("file://")[1] + "files/",
        resetRepo: false
      }, function (res) {
        console.log(res);

        self.$myIpfs.ipfsCordova.start(function (res) {
          console.log(res);

          let ipfsApi = ipfsAPI();
          console.log(ipfsApi);

          self.$myIpfs.setIpfsApi(ipfsAPI());
        }, function (err) {
          console.log(err);
        });

      }, function (err) {
        console.log(err);
      });
    },
    framework7: {
      root: '#app',
      material: true,
      routes: Routes,
      // onPageInit: function (app, page) {
      //
      // },
      // onF7Init: function () {
      //   console.log('f7-init');
      // }
    },
    components: {
      app: App
    },

  });
}

// Init App

