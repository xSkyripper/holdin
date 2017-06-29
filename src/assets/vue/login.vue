<template>
    <f7-login-screen class="layout-dark">
        <f7-view>
            <f7-pages>
                <f7-page login-screen>
                    <f7-login-screen-title>User Info</f7-login-screen-title>

                    <f7-list form>
                        <f7-list-item>
                            <f7-icon slot="media"><i class="material-icons">account_circle</i></f7-icon>
                            <f7-label>Username</f7-label>
                            <f7-input v-model="sharedState.username" name="username" type="text"
                                      placeholder="Username"></f7-input>
                        </f7-list-item>

                        <f7-list-item>
                            <f7-icon slot="media"><i class="material-icons">speaker_notes_off</i></f7-icon>
                            <f7-label>Delete old messages in ... (days)</f7-label>
                            <f7-input v-model="sharedState.messagesTTL" name="messagesTTL" type="number"
                                      placeholder="Messages Time To Live"></f7-input>
                        </f7-list-item>

                        <f7-list-item>
                            <f7-icon slot="media"><i class="material-icons">timer</i></f7-icon>
                            <f7-label>Update zone in ... (minutes)</f7-label>
                            <f7-input v-model="sharedState.zoneUpdaterDelay" name="zoneUpdaterDelay" type="number"
                                      placeholder="Zone Updater Delay"></f7-input>
                        </f7-list-item>

                        <f7-list-item>
                            <f7-icon slot="media"><i class="material-icons">location_on</i></f7-icon>
                            <f7-label>Location zone</f7-label>
                            <f7-input disabled v-model="sharedState.locationZone.zoneId" type="text"></f7-input>
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
            return {
                sharedState: this.$myStore.state,
                privateState: {}
            }
        },
        methods: {
            onStart() {
                console.log('login:onStart');

                this.$myStore.resetZoneUpdater();

                this.$f7.closeModal();
            }
        }
    }
</script>

<style>

</style>
