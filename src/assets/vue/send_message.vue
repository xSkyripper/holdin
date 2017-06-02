<template>
    <f7-page>
        <f7-navbar title="Send Message" back-link="Back" sliding></f7-navbar>

        <f7-button @click="showLog">Log</f7-button>


        <f7-list form>
            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">account_circle</i></f7-icon>
                <f7-label floating>Username</f7-label>
                <f7-input disabled v-model="sharedState.username" type="text" placeholder="Name"></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">location_city</i></f7-icon>
                <f7-label floating>Location zone</f7-label>
                <f7-input disabled v-model="sharedState.locationZone.zoneId" type="text" placeholder="zone"></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">location_on</i></f7-icon>
                <f7-label floating>Location exact - Longitude</f7-label>
                <f7-input disabled v-model="sharedState.locationExact.lon" type="text" placeholder="coords"></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">location_on</i></f7-icon>
                <f7-label floating>Location exact - Latitude</f7-label>
                <f7-input disabled v-model="sharedState.locationExact.lat" type="text" placeholder="coords"></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">label</i></f7-icon>
                <f7-label>Type</f7-label>
                <f7-input type="select" v-model="privateState.type">
                    <option value="alert">Alert</option>
                    <option value="warn">Warning</option>
                    <option value="info">Info</option>
                </f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">details</i></f7-icon>
                <f7-label>Details</f7-label>
                <f7-input v-model="privateState.details" type="textarea" placeholder="Message details"></f7-input>
            </f7-list-item>

            <f7-button class="list-button" color="red" text="Send" fill big @click="sendMsg"></f7-button>

        </f7-list>

    </f7-page>
</template>

<script>
    export default {
        data(){
            return {
                sharedState: this.$myStore.state,
                privateState: {
                    type: "alert",
                    details: ""
                }
            }
        },
        methods: {
            showLog(){
                console.log(this.$route);
            },
            sendMsg() {
                let self = this;

                let d = new Date();

                let rawMessage = {
                    id: "ipfsId",
                    username: self.sharedState.username,
                    locationZone: self.sharedState.locationZone.zoneId,
                    locationExact: {
                        lon: self.sharedState.locationExact.lon,
                        lat: self.sharedState.locationExact.lat
                    },
                    time: String(d.getHours()) + ":" + String(d.getMinutes()),
                    day: String(d.getDay()),
                    month: String(d.getMonth()),
                    year: String(d.getFullYear()),
                    type: self.privateState.type,
                    details: self.privateState.details
                };

                const obj = {
                    Data: new Buffer(JSON.stringify(rawMessage)),
                    Links: []
                };

                this.$myIpfs.ipfsApi.object.put(obj, function (err, node) {
                    if (err)
                        throw err;
                    console.log(node.toJSON().multihash);

                    self.$myIpfs.ipfsApi.pubsub.publish(
                        self.$myStore.state.locationZone.zoneHash,
                        new Buffer(node.toJSON().multihash),
                        function (err) {
                            if (err)
                                throw err;
                        });
                });

                console.log("send_message: sendMsg: ", rawMessage);


                this.$f7.alert('Message will be sent ASAP !', 'Info', function () {
                    self.$router.back();
                });
            }
        }
    }
</script>
