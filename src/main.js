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

import ipfsAPI from 'ipfs-api'
import myStore from './store.js'
import myIpfs from './ipfs.js'


Vue.use(Framework7Vue);
Vue.use(myStore);
Vue.use(myIpfs);

document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {

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
        // cordova related
        cordova.plugins.backgroundMode.enable();
        document.addEventListener('offline', this.initSystem, false);
        document.addEventListener('pause', function () {
          self.$myStore.persistData();
        }, false);
        document.addEventListener('backbutton', function (evt) {
          evt.preventDefault();
          console.log(self);
          try {
            self.$router.back();
          } catch (ex) {
          }
        }, false);

        if (navigator.connection.type === 'none') {
          self.$myStore.setStatusNetwork(false);
          window.f7.modal({
            title: 'HOLDIN Error',
            text: 'No network connection found ! Please turn on Wifi (recommended) or Mobile Data.',
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
                  //TODO exit app
                }
              },
            ]
          });
          return;
        } else {
          self.$myStore.setStatusNetwork(navigator.connection.type);
        }

        //f7 vue related
        this.$f7.showPreloader("Preparing IPFS ...");
        this.$myIpfs.startIpfs({
            cipfs: new CordovaIpfs(),
            aipfs: ipfsAPI,
            store: this.$myStore,
          },
          function (err) {
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
                      //TODO exit app
                    }
                  },
                ]
              });
            } else {
              //IPFS inited successfully
              self.$myStore.retrieveData();
              self.$myStore.startLocationWatcher();
              self.$myStore.deleteOldMessagesUpdater();
              self.$myStore.retrieveMessages(self.$myIpfs.ipfsApi);

              self.$f7.alert("IPFS Prepared successfully !", "HOLDIN Info");
            }
          });
        //startIpfs
      },
      onF7Init: function () {
        this.initSystem();
      }
    }

  });
}


