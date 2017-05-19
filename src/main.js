import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
// import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
// Import F7 Material Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import MaterialIcons from './assets/css/material-icons.css'

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'
import CustomAppStyles from './assets/sass/custom-main.scss'

import Routes from './routes.js'

import App from './main.vue'

Vue.use(Framework7Vue);

// Init App
let vm = new Vue({
  el: '#app',
  template: '<app/>',
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
