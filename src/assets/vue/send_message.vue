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

                let h = d.getHours() < 10 ? "0" + String(d.getHours()) : String(d.getHours());
                let m = d.getMinutes() < 10 ? "0" + String(d.getMinutes()) : String(d.getMinutes());
                let s = d.getSeconds() < 10 ? "0" + String(d.getSeconds()) : String(d.getSeconds());

                let rawMessage = {
                    id: null,
                    from: self.sharedState.nodeId,
                    username: self.sharedState.username,
                    locationZone: self.sharedState.locationZone.zoneId,
                    locationExact: {
                        lon: self.sharedState.locationExact.lon,
                        lat: self.sharedState.locationExact.lat
                    },
                    time: h + ":" + m + ":" + s,
                    day: String(d.getDate()),
                    month: (d.getMonth() + 1) < 10 ? "0" + String(d.getMonth() + 1) : String(d.getMonth() + 1),
                    year: String(d.getFullYear()),
                    type: self.privateState.type,
                    details: self.privateState.details
                };


                this.$myIpfs.sendMessage(rawMessage);

                this.$f7.alert('Message will be sent ASAP !', 'Info', function () {
                    self.$router.back();
                });
            }
        }
    }
</script>
