<template>
    <div class="page-content">
        <f7-block-title>
            <h2>Settings</h2>
        </f7-block-title>

        <f7-list>
            <a href="#" class="item-link">
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">code</i></div>
                        <div class="item-title">IPFS Daemon</div>
                        <div class="item-after">Restart</div>
                    </div>
                </div>
            </a>
            <a href="#" @click="goToLogin" class="item-link">
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">account_box</i></div>
                        <div class="item-title">Profile</div>
                        <div class="item-after">Set personal data</div>
                    </div>
                </div>
            </a>
        </f7-list>

    </div>
</template>

<script>
    import Login from './login.vue';
    export default {
        props: {},
        data() {
            return {}
        },
        computed: {},
        methods: {
            goToLogin: function () {
                console.log("settings:goToLogin");
                this.$f7.loginScreen();
            }
        }
    }
</script>

<style>

</style>
