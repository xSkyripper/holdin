export default [
  {
    path: '/home/',
    component: require('./main.vue')
  },
  {
    path: '/alerts/',
    component: require('./assets/vue/alerts.vue')
  },
  {
    path: '/profile/',
    component: require('./assets/vue/profile.vue')
  },
  {
    path: '/settings/',
    component: require('./assets/vue/settings.vue')
  },
  {
    path: '/login/',
    component: require('./assets/vue/login.vue')
  },
  {
    path: '/message/:id',
    component: require('./assets/vue/message.vue')
  },
  {
    path: '/send_message/',
    component: require('./assets/vue/send_message.vue')
  }
]
