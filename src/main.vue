<template>
    <div id="app">
        <f7-statusbar></f7-statusbar>
        <f7-views>
            <f7-view id="main-view" class="layout-dark" main toolbar-through>
                <f7-pages>
                    <f7-page>

                        <f7-tabs swipeable>
                            <f7-tab id="home">
                                <home></home>
                            </f7-tab>
                            <f7-tab id="alerts" active>
                                <alerts></alerts>
                            </f7-tab>
                            <f7-tab id="profile">
                                <profile></profile>
                            </f7-tab>
                            <f7-tab id="settings">
                                <settings></settings>
                            </f7-tab>
                        </f7-tabs>

                        <f7-toolbar class="theme-blue" tabbar bottom>
                            <f7-link tab-link="#home">
                                <i class="material-icons">home<span class="badge bg-red">1</span></i>
                            </f7-link>
                            <f7-link tab-link="#alerts">
                                <i class="material-icons">warning<span class="badge bg-red">1</span></i>
                            </f7-link>
                            <f7-link tab-link="#profile">
                                <i class="material-icons">account_circle<span class="badge bg-red">1</span></i>
                            </f7-link>
                            <f7-link tab-link="#settings">
                                <i class="material-icons">settings<span class="badge bg-red">1</span></i>
                            </f7-link>
                        </f7-toolbar>

                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>

        <login></login>
    </div>
</template>

<script>
    import Login from './assets/vue/login.vue';
    import Home from './assets/vue/home.vue';
    import Alerts from './assets/vue/alerts.vue';
    import Profile from './assets/vue/profile.vue';
    import Settings from './assets/vue/settings.vue';

    export default {
        data() {
            return {}
        },
        methods: {
            checkUserData: function () {
                let username = localStorage.getItem('username');
                if (username === null || username === "")
                    this.$f7.loginScreen();
            },
            onF7Init: function () {
                this.checkUserData();
            }
        },
        components: {
            Login,
            Home,
            Alerts,
            Profile,
            Settings
        }
    }
</script>
