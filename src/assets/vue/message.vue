<template>
    <f7-page>
        <f7-navbar :title="'Message '+$route.params.id" back-link="Back" sliding></f7-navbar>

        <f7-button @click="showLog">Log</f7-button>

        <f7-block inner>
            Message {{ $route.params.id }}
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        methods: {
            showLog(){
                console.log(this.$route);
            }
        }
    }
</script>
