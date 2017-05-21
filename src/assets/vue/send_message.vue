<template>
    <f7-page>
        <f7-navbar title="Send Message" back-link="Back" sliding></f7-navbar>

        <f7-button @click="showLog">Log</f7-button>


        <f7-list form>
            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">account_circle</i></f7-icon>
                <f7-label floating>Username</f7-label>
                <f7-input disabled v-model="username" type="text" placeholder="Name"></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">location_city</i></f7-icon>
                <f7-label floating>Location area</f7-label>
                <f7-input disabled v-model="locationArea" type="text" placeholder="Name"></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">location_on</i></f7-icon>
                <f7-label floating>Exact location</f7-label>
                <f7-input disabled v-model="exactLocation" type="text" placeholder="Name"></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">label</i></f7-icon>
                <f7-label>Type</f7-label>
                <f7-input type="select" v-model="type">
                    <option value="alert">Alert</option>
                    <option value="warn">Warning</option>
                    <option value="info">Info</option>
                </f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-icon slot="media"><i class="material-icons">details</i></f7-icon>
                <f7-label>Details</f7-label>
                <f7-input v-model="details" type="textarea" placeholder="Other details ..."></f7-input>
            </f7-list-item>

            <f7-button class="list-button" color="red" text="Send" fill big @click="sendMsg"></f7-button>

        </f7-list>

    </f7-page>
</template>

<script>
    export default {
        data(){
            return {
                username: "Alex",
                locationArea: "Zone 1",
                exactLocation: "11, 22, 33",
                type: "alert",
                details: ""
            }
        },
        methods: {
            showLog(){
                console.log(this.$route);
            },
            sendMsg() {
                console.log(this.username);
                console.log(this.locationArea);
                console.log(this.exactLocation);
                console.log(this.type);
                console.log(this.details);
                // SEND MESSAGE OVER PUBSUB
                this.$router.back();
            }
        }
    }
</script>
