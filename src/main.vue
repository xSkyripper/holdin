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
                                <f7-fab-speed-dial>
                                    <f7-fab-actions>
                                        <f7-fab-action color="purple" href="/send_message/">
                                            <i class="material-icons">send</i>
                                        </f7-fab-action>
                                        <f7-fab-action @click="changeAllFilter">
                                            <i class="material-icons">list</i>
                                        </f7-fab-action>
                                        <f7-fab-action color="red" @click="changeAlertFilter">
                                            <i class="material-icons">warning</i>
                                        </f7-fab-action>
                                        <f7-fab-action color="amber" @click="changeWarnFilter">
                                            <i class="material-icons">error</i>
                                        </f7-fab-action>
                                        <f7-fab-action color="green" @click="changeInfoFilter">
                                            <i class="material-icons">info</i>
                                        </f7-fab-action>
                                    </f7-fab-actions>
                                    <f7-fab>
                                        <f7-icon icon="icon-plus"></f7-icon>
                                        <f7-icon icon="icon-close"></f7-icon>
                                    </f7-fab>
                                </f7-fab-speed-dial>

                                <alerts :filter="msgsFilter"></alerts>
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
                                <i class="material-icons">home
                                    <!--<span class="badge bg-red">1</span>-->
                                </i>
                            </f7-link>
                            <f7-link tab-link="#alerts" @click="onAlertsLink">
                                <i class="material-icons">warning
                                    <span v-if="sharedState.notifsAlerts !== 0" class="badge bg-red">
                                        {{sharedState.notifsAlerts}}
                                    </span>
                                </i>
                            </f7-link>
                            <f7-link tab-link="#profile" @click="onProfileLink">
                                <i class="material-icons">account_circle
                                    <span v-if="sharedState.notifsProfile !== 0" class="badge bg-red">
                                        {{sharedState.notifsProfile}}
                                    </span>
                                </i>
                            </f7-link>
                            <f7-link tab-link="#settings">
                                <i class="material-icons">settings
                                    <!--<span class="badge bg-red">1</span>-->
                                </i>
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
            return {
                sharedState: this.$myStore.state,
                msgsFilter: 'all'
            }
        },
        methods: {
            changeAllFilter() {
                this.msgsFilter = 'all';
            },
            changeAlertFilter() {
                this.msgsFilter = 'alert';
            },
            changeWarnFilter() {
                this.msgsFilter = 'warn';
            },
            changeInfoFilter() {
                this.msgsFilter = 'info';
            },
            onAlertsLink() {
                console.log("CLICKED ALERTS LINK");
                this.$myStore.clearNotifsAlerts();
            },
            onProfileLink() {
                console.log("CLICKED PROFILE LINK");
                this.$myStore.clearNotifsProfile();
            },

            onF7Init: function () {
                this.$f7.loginScreen();
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
