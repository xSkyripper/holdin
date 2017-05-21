<template>
    <div class="page-content">
        <h2>Settings Page Here</h2>

        <f7-block>
            <f7-grid>
                <f7-col width="50">
                    <f7-button @click="goToLogin">Login</f7-button>
                </f7-col>
            </f7-grid>

            <p>Username: Alex</p>
        </f7-block>

    </div>
</template>

<script>
    import Login from './login.vue';
    export default {
        props: {},
        data() {
            return {

            }
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
