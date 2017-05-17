<template>
    <div class="page-content">

        <f7-block-title>Modals</f7-block-title>
        <f7-block>
            <f7-grid>
                <f7-col width="50">
                    <f7-button open-login-screen="#login-screen">Login Screen</f7-button>
                </f7-col>
            </f7-grid>
        </f7-block>

        <f7-list>
            <f7-list-item link="/about/" title="About"></f7-list-item>
            <f7-list-item link="/form/" title="Form"></f7-list-item>
            <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                          title="Dynamic Route"></f7-list-item>
        </f7-list>

    </div>
    <!-- page-content -->
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: [],
        methods: {}
    }
</script>

<style>

</style>
