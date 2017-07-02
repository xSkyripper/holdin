<template>
    <div class="page-content">
        <f7-block-title>
            <h2>Welcome to H.O.L.D.I.N.</h2>
        </f7-block-title>
        <f7-block inner>
            Help Over Local Distributed Interconnected Networks is an application meant to help people communicate when there is no way to access the global Internetwork.
            You can visualize the list of messages (Alerts), send messages, view your profile (Profile) or set your own system properties (Settings).
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
//                console.log(this.$myIpfs.ipfsApi);
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
