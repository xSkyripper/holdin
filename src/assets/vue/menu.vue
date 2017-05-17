<template>
    <!--<f7-toolbar :class="'theme-'+color" tabbar>-->
    <!--<f7-link href="#">-->
    <!--<i class="material-icons">-->
    <!--home-->
    <!--<span class="badge" :class="badgeBgColor">1</span>-->
    <!--</i>-->
    <!--</f7-link>-->
    <!--<f7-link href="#">-->
    <!--<i class="material-icons">-->
    <!--warning-->
    <!--<span class="badge" :class="badgeBgColor">1</span>-->
    <!--</i>-->
    <!--</f7-link>-->
    <!--<f7-link href="#">-->
    <!--<i class="material-icons">-->
    <!--account_circle-->
    <!--<span class="badge" :class="badgeBgColor">1</span>-->
    <!--</i>-->
    <!--</f7-link>-->
    <!--<f7-link href="#">-->
    <!--<i class="material-icons">-->
    <!--settings-->
    <!--<span class="badge" :class="badgeBgColor">1</span>-->
    <!--</i>-->
    <!--</f7-link>-->
    <!--</f7-toolbar>-->
    <f7-navbar :class="'theme-'+color">
        <f7-nav-left>
            <f7-link href="#">
                <i class="material-icons">
                    home
                    <span class="badge" :class="badgeBgColor">1</span>
                </i>
            </f7-link>
            <f7-link href="#">
                <i class="material-icons">
                    account_circle
                    <span class="badge" :class="badgeBgColor">1</span>
                </i>
            </f7-link>
        </f7-nav-left>
        <f7-nav-center>
            <f7-link href="#">
                <i class="material-icons">
                    warning
                    <span class="badge" :class="badgeBgColor">1</span>
                </i>
            </f7-link>
        </f7-nav-center>
        <f7-nav-right>
            <f7-link href="#">
                <i class="material-icons">
                    settings
                    <span class="badge" :class="badgeBgColor">1</span>
                </i>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>
</template>

<script>
    export default {
        props: {},
        data() {
            return {
                badgeBgColor: 'bg-red',
                color: 'blue'
            }
        },
        methods: {}
    }
</script>

<style>

</style>
