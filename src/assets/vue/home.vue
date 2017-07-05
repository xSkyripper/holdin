<template>
    <div class="page-content">
        <f7-block-title>
            <h2>Welcome to H.O.L.D.I.N.</h2>
        </f7-block-title>
        <f7-block inner>
            Help Over Local Distributed Interconnected Networks is an application meant to help people communicate when there is no way to access the global Internetwork.
            You can visualize the list of messages (Alerts), send messages, view your profile (Profile) or set your own system properties (Settings).
        </f7-block>

        <f7-block-title>
            <h2>Alerts Page</h2>
        </f7-block-title>
        <f7-block inner>
            The Alerts Page is the main page of the H.O.L.D.I.N. App. It contains a timeline list of received and sent messages from and to the zone's network. Each element offers minimal information about the messages but you are also able to view all the details through the "View" button. The floating button placed in the lower-right corner lets you filter and send messages.
        </f7-block>

        <f7-block-title>
            <h2>Alerts Page</h2>
        </f7-block-title>
        <f7-block inner>
            The Alerts Page is the main page of the H.O.L.D.I.N. App. It contains a timeline list of received and sent messages from and to the zone's network. Each element offers minimal information about the messages but you are also able to view all the details through the "View" button. The floating button placed in the lower-right corner lets you filter and send messages.
        </f7-block>

        <f7-block-title>
            <h2>Profile Page</h2>
        </f7-block-title>
        <f7-block inner>
            This page renders the status of the app's modules. It also contains information about the User and System preferences. At the bottom of the page you can find the last 10 messages sent by the current user.
        </f7-block>

        <f7-block-title>
            <h2>Settings Page</h2>
        </f7-block-title>
        <f7-block inner>
            Settings Page offers a way to change some of the app's and personal settings.
        </f7-block>

        <f7-block-title>
            <h2>Tabbar</h2>
        </f7-block-title>
        <f7-block inner>
            The tabbar you can see at the bottom of the main view is the main method of navigation. Badge notifications will be displayed on each page's button if it is needed.
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
