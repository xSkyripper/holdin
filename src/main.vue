<template>
    <!-- App --->
    <div id="app">

        <f7-views>
            <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
                <!-- Navbar -->
                <f7-navbar>
                    <f7-nav-left>
                        <f7-link icon="icon-bars" open-panel="left"></f7-link>
                    </f7-nav-left>
                    <f7-nav-center sliding>HOLDIN</f7-nav-center>
                </f7-navbar>
                <!-- Pages -->
                <f7-pages>
                    <f7-page>
                        <f7-block-title>Modalss</f7-block-title>
                        <f7-block>
                            <f7-grid>
                                <f7-col width="50">
                                    <f7-button open-login-screen="#login-screen">Login Screen</f7-button>
                                </f7-col>
                            </f7-grid>
                        </f7-block>
                        <f7-list>
                            <f7-list>
                                <f7-list-item link="/about/" title="About"></f7-list-item>
                                <f7-list-item link="/form/" title="Form"></f7-list-item>
                                <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                                              title="Dynamic Route"></f7-list-item>
                            </f7-list>
                        </f7-list>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>

        <login :class="{'modal-in': showLogin}"></login>
    </div>
</template>

<script>
    import Login from './assets/vue/login.vue';

    export default {
        mounted: function () {
            this.checkUserData();
        },
        data: function () {
            return {
                showLogin: false
            }
        },
        methods: {
            checkUserData: function () {
                this.showLogin = true;
            }
        },
        components: {
            Login
        }
    }
</script>
