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

import Q from 'q'
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

        // cordova.plugins.backgroundMode.enable();
        // document.addEventListener('offline', this.initSystem, false);
        // document.addEventListener('pause', function () {
        //   self.$myStore.persistData();
        // }, false);
        // document.addEventListener('backbutton', function (evt) {
        //   evt.preventDefault();
        //   console.log(self);
        //   try {
        //     self.$router.back();
        //   } catch (ex) {
        //   }
        // }, false);
        //
        // if (navigator.connection.type === 'none') {
        //   self.$myStore.setStatusNetwork(false);
        //   window.f7.modal({
        //     title: 'HOLDIN Error',
        //     text: 'No network connection found ! Please turn on Wifi (recommended) or Mobile Data.',
        //     buttons: [
        //       {
        //         text: 'Retry',
        //         onClick: function () {
        //           self.initSystem();
        //         }
        //       },
        //       {
        //         text: 'Quit',
        //         onClick: function () {
        //           console.log('Quit app');
        //         }
        //       },
        //     ]
        //   });
        //   return;
        // } else {
        //   self.$myStore.setStatusNetwork(navigator.connection.type);
        // }
        //
        // //f7 vue related
        // this.$f7.showPreloader("Preparing IPFS ...");
        // this.$myIpfs.startIpfs({
        //     cipfs: new CordovaIpfs(),
        //     aipfs: ipfsAPI,
        //     store: this.$myStore,
        //   },
        //   function (err) {
        //     self.$f7.hidePreloader();
        //     if (err) {
        //       self.$f7.modal({
        //         title: 'HOLDIN Error',
        //         text: err,
        //         buttons: [
        //           {
        //             text: 'Retry',
        //             onClick: function () {
        //               self.initSystem();
        //             }
        //           },
        //           {
        //             text: 'Quit',
        //             onClick: function () {
        //               console.log('Quit app');
        //             }
        //           },
        //         ]
        //       });
        //     } else {
        //       //IPFS inited successfully
        //       self.$myStore.retrieveData();
        //       self.$myStore.startLocationWatcher();
        //       self.$myStore.deleteOldMessagesUpdater();
        //       self.$myStore.retrieveMessages(self.$myIpfs.ipfsApi);
        //
        //       self.$f7.alert("IPFS Prepared successfully !", "HOLDIN Info");
        //     }
        //   });

        function startSysInit() {
          let dfrd = new Q.defer();

          self.$f7.showPreloader("Preparing & Initializing");
          dfrd.resolve();

          return dfrd.promise;
        }

        function systemPrereq() {
          let dfrd = new Q.defer();

          cordova.plugins.backgroundMode.enable();
          document.addEventListener('offline', self.initSystem, false);
          document.addEventListener('pause', self.$myStore.persistData.bind(self.$myStore), false);
          document.addEventListener('backbutton', function (evt) {
            evt.preventDefault();

            try {
              self.$router.back();
            } catch (ex) {
            }

          }, false);

          dfrd.resolve();

          return dfrd.promise;
        }

        function checkNetwork() {
          let dfrd = new Q.defer();

          if (navigator.connection.type === 'none') {
            self.$myStore.setStatusNetwork(false);
            dfrd.reject("No network connection found ! Please turn on Wifi (recommended) or Mobile Data.");
          } else {
            self.$myStore.setStatusNetwork(navigator.connection.type);
            dfrd.resolve();
          }

          return dfrd.promise;
        }

        function startIpfsSystem() {
          let dfrd = new Q.defer();

          self.$myIpfs.startIpfs({
              cipfs: new CordovaIpfs(),
              aipfs: ipfsAPI,
              store: self.$myStore,
            },
            function (err) {
              if (err)
                dfrd.reject(err);
              else
                dfrd.resolve();
            });

          return dfrd.promise;
        }

        function getData() {
          let dfrd = new Q.defer();

          self.$myStore.retrieveData();
          self.$myStore.retrieveMessages(self.$myIpfs.ipfsApi);

          self.$myIpfs.ipfsApi.id((err, iden) => {
            if (err)
              dfrd.reject(err);

            self.$myStore.setNodeId(iden.id);
          });

          dfrd.resolve();

          return dfrd.promise;
        }

        function finishInit() {
          let dfrd = new Q.defer();

          self.$myStore.startLocationWatcher();
          self.$myStore.deleteOldMessagesUpdater();

          self.$f7.hidePreloader();
          self.$f7.alert("System initialized successfully !", "HOLDIN Info");

          dfrd.resolve();

          return dfrd.promise;
        }


        startSysInit()
          .then(() => {
            return systemPrereq();
          })
          .then(() => {
            return checkNetwork();
          })
          .then(() => {
            return startIpfsSystem();
          })
          .then(() => {
            return getData();
          })
          .then(() => {
            return finishInit();
          })
          .catch((err) => {

            console.error(err);

            self.$f7.hidePreloader();

            window.f7.modal({
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

          });

        //startIpfs
      },
      onF7Init: function () {
        this.initSystem();
      }
    }

  });
}


