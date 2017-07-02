<template>
    <div class="page-content">
        <f7-block-title>
            <h2>Settings</h2>
        </f7-block-title>

        <f7-list>
            <a href="#" @click="deleteMessages" class="item-link">
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">delete</i></div>
                        <div class="item-title">Delete Messages</div>
                        <div class="item-after"></div>
                    </div>
                </div>
            </a>
            <a href="#" @click="resetZoneUpdater" class="item-link">
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_city</i></div>
                        <div class="item-title">Zone Updater</div>
                        <div class="item-after">Reset</div>
                    </div>
                </div>
            </a>
            <a href="#" class="item-link" @click="switchNotifications">
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">vibration</i></div>
                        <div class="item-title">Notification</div>
                        <div class="item-after">
                            <span v-if="sharedState.notifsLocal">Enabled</span>
                            <span v-else>Disabled</span>
                        </div>
                    </div>
                </div>
            </a>
            <a href="#" @click="goToLogin" class="item-link">
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">account_box</i></div>
                        <div class="item-title">Profile</div>
                        <div class="item-after">Set personal data</div>
                    </div>
                </div>
            </a>
        </f7-list>

    </div>
</template>

<script>
    import Login from './login.vue';
    export default {
        props: {},
        data() {
            return {
                sharedState: this.$myStore.state
            }
        },
        computed: {},
        methods: {
            goToLogin: function () {
                console.log("settings:goToLogin");
                this.$f7.loginScreen();
            },
            deleteMessages: function () {
                let self = this;

                window.f7.modal({
                    title: 'HOLDIN Confirm',
                    text: 'Are you sure you want to delete ALL messages ?',
                    buttons: [
                        {
                            text: 'Yes',
                            onClick: function () {
                                self.$myStore.remAllMessages();
                            }
                        },
                        {
                            text: 'No',
                            onClick: function () {
                            }
                        },
                    ]
                });

            },
            resetZoneUpdater: function () {
                let self = this;

                window.f7.modal({
                    title: 'HOLDIN Confirm',
                    text: 'Are you sure you want to reset zone updater ?',
                    buttons: [
                        {
                            text: 'Yes',
                            onClick: function () {
                                self.$myStore.resetZoneUpdater();
                            }
                        },
                        {
                            text: 'No',
                            onClick: function () {
                            }
                        },
                    ]
                });
            },

            switchNotifications: function () {
                this.sharedState.notifsLocal = !(this.sharedState.notifsLocal);
            }
        }
    }
</script>

<style>

</style>
