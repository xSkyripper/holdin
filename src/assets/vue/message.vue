<template>
    <f7-page>
        <f7-navbar :title="'Message '+timeStr"
                   back-link="Back"
                   sliding>
        </f7-navbar>

        <f7-block class="message-block">
            <f7-block-title class="message-title">
                <!--TODO: v-if type-->
                <i v-if="message.type === 'alert'" class="material-icons message-mark color-red">warning</i>
                <i v-else-if="message.type === 'warn'" class="material-icons message-mark color-amber">error</i>
                <i v-else="message.type === 'info'" class="material-icons message-mark color-white">info</i>
            </f7-block-title>

            <f7-list>
                <!--<li class="item-content">-->
                    <!--<div class="item-inner">-->
                        <!--<div class="item-media"><i class="material-icons">speaker_notes</i></div>-->
                        <!--<div class="item-title">Message ID</div>-->
                        <!--<div class="item-after">{{message.id}}</div>-->
                    <!--</div>-->
                <!--</li>-->

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">account_circle</i></div>
                        <div class="item-title">Username</div>
                        <div class="item-after">{{message.username}}</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">timer</i></div>
                        <div class="item-title">Time</div>
                        <div class="item-after">
                            {{timeStr}}
                        </div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_city</i></div>
                        <div class="item-title">Location zone</div>
                        <div class="item-after">{{message.locationZone}}</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_on</i></div>
                        <div class="item-title">Location exact - Lon</div>
                        <div class="item-after">{{message.locationExact.lon}}</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_on</i></div>
                        <div class="item-title">Location exact - Lat</div>
                        <div class="item-after">{{message.locationExact.lat}}</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media">
                            <i class="material-icons">details</i>
                        </div>
                        <div class="item-title"></div>
                        <div class="item-after"></div>
                        <div class="message-content">{{message.details}}</div>
                    </div>
                </li>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        data() {
            return {
                message: {
                    id: null,
                    from: null,
                    username: null,
                    locationZone: null,
                    locationExact: {
                        lon: null,
                        lat: null,
                    },
                    time: null,
                    day: null,
                    month: null,
                    year: null,
                    type: null,
                    details: null,
                }
            }
        },
        computed: {
            timeStr() {
                return this.message.time + " - " + this.message.day + "." + this.message.month + "." + this.message.year;
            }
        },
        methods: {
            showLog(){
                console.log(this.$route);
            },
            onF7Init() {
                this.message = this.$myStore.getMessage(this.$route.params.id);
                console.log(this.$myStore.getMessage(this.$route.params.id));
            }
        }
    }
</script>

<style>
    .message-block {
        margin-top: 56px;
    }

    .message-title {
        text-align: center;
    }

    .message-title .message-mark {
        font-size: 48px;
    }
</style>
