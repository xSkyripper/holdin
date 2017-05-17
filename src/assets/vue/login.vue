<template>
    <f7-login-screen id="login-screen" :class="['theme-'+color, layout]">
        <f7-view>
            <f7-pages>
                <f7-page login-screen>
                    <f7-login-screen-title>
                        H.O.L.D.I.N. Info
                    </f7-login-screen-title>

                    <f7-list form>
                        <f7-list-item>
                            <f7-label>Username</f7-label>
                            <f7-input name="username" type="text" placeholder="Name here"></f7-input>
                        </f7-list-item>
                        <f7-list-item>
                            <f7-label>Password</f7-label>
                            <f7-input name="password" type="password" placeholder="Password"></f7-input>
                        </f7-list-item>
                    </f7-list>

                    <f7-button>
                        <f7-button :color="color" title="Start" close-login-screen fill>Start</f7-button>
                    </f7-button>

                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-login-screen>
    <!-- login-screen -->

</template>

<script>
    export default {
        props: [],
        data() {
            return {
                color: 'blue',
                layout: 'layout-dark'
            }
        },
        methods: {}
    }
</script>

<style lang="sass" scoped>

</style>
