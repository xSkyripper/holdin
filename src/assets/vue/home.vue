<template>
    <div class="page-content">
        <f7-block-title>
            <h2>Home Title</h2>
        </f7-block-title>

        <f7-block inner>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cumque dignissimos ducimus, perspiciatis sint voluptatum. Enim eum exercitationem, nihil nisi obcaecati optio quo ratione sapiente sequi voluptates. Quisquam, reprehenderit vero?

            <f7-button @click="ipfsId">IPFS ID</f7-button>
        </f7-block>
    </div>
    <!-- page-content -->
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: [],
        methods: {
            ipfsId() {
                console.log(this.$myIpfs.ipfsApi);
                this.$myIpfs.ipfsApi.id(function (err, iden) {
                    if (err)
                        throw err;
                    console.log(iden);
                });
            }
        }
    }
</script>

<style>

</style>
