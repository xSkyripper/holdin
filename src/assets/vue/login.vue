<template>
    <f7-login-screen class="layout-dark">
        <f7-view>
            <f7-pages>
                <f7-page login-screen>
                    <f7-login-screen-title>H.O.L.D.I.N Info</f7-login-screen-title>

                    <f7-list form>
                        <f7-list-item>
                            <f7-label>Username</f7-label>
                            <f7-input name="username" type="text" placeholder="Username"></f7-input>
                        </f7-list-item>
                        <f7-list-item smart-select smart-select-searchbar title="Country">
                            <select name="fruits">
                                <option value="country1" selected>Country 1</option>
                                <option value="country2">Country 2</option>
                                <option value="country3">Country 3</option>
                                <option value="country4">Country 4</option>
                                <option value="country5">Country 5</option>
                            </select>
                        </f7-list-item>
                    </f7-list>

                    <f7-buttons>
                        <f7-button @click="onStart" color="blue" title="Start" fill>Start</f7-button>
                    </f7-buttons>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-login-screen>
    <!-- login-screen -->

</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            onStart() {
                console.log('login:onStart');
                this.$f7.closeModal();
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
