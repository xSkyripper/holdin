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
    // mounted() {
    //
    // },
    framework7: {
      root: '#app',
      material: true,
      routes: Routes,
      // onPageInit: function (app, page) {
      //
      // },
    },
    components: {
      app: App
    },
    methods: {
      initSystem() {
        let self = this;
        this.$myStore.initStore();

        this.$f7.showPreloader("Preparing IPFS ...");
        this.$myIpfs.initIpfs(new CordovaIpfs(), ipfsAPI, function (err) {
          self.$f7.hidePreloader();
          if (err) {
            self.$f7.modal({
              title: 'HOLDIN Error',
              text: err,
              buttons: [
                {
                  text: 'Retry',
                  onClick: function () {
                    self.initSystem();
                  }
                },
                {
                  text: 'Quit',
                  onClick: function () {
                    console.log('Quit app');
                  }
                },
              ]
            })
          } else {
            self.$f7.alert("IPFS Prepared successfully !", "HOLDIN Info");
          }
        });
        //initIpfs
      },
      onF7Init: function () {
        this.initSystem();
      }
    }

  });
}


