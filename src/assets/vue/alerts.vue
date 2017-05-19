<template>
    <div class="page-content">
        <f7-timeline>
            <div v-for="msg in messages" class="timeline-item">
                <div class="timeline-item-date">{{ msg.day }}
                    <small>{{ msg.month }}</small>
                </div>
                <div class="timeline-item-divider"></div>
                <div class="timeline-item-content">
                    <div class="timeline-item-inner">
                        <div class="timeline-item-time">
                            <span class="time">{{ msg.time }}</span>
                            <i v-if="msg.type === 'alert'" class="material-icons msg-mark alert">warning</i>
                            <i v-else-if="msg.type === 'warn'" class="material-icons msg-mark warn">error</i>
                            <i v-else-if="msg.type === 'info'" class="material-icons msg-mark info">info</i>
                        </div>
                        <div class="timeline-item-title">{{ msg.name }}</div>
                        <div class="timeline-item-subtitle">{{ msg.location }}</div>
                        <div class="timeline-item-text">{{ msg.type }}</div>

                        <f7-button :href="'/message/'+msg.id"
                                   :color="msgTypeToColor(msg.type)">
                            View
                        </f7-button>
                    </div>
                </div>
            </div>
        </f7-timeline>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                messages: [
                    {
                        id: 1,
                        name: 'Cristea Alex',
                        location: 'Targusor C1',
                        type: 'alert',
                        time: '12:31',
                        day: '12',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 2,
                        name: 'Vasiliu Alexandru',
                        location: 'Targusor C1',
                        type: 'warn',
                        time: '12:03',
                        day: '12',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 3,
                        name: 'Lucian Dan',
                        location: 'Str. Pepenilor',
                        type: 'info',
                        time: '13:45',
                        day: '11',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 4,
                        name: 'Dan Cehan',
                        location: 'Str. Pepenilor nr 14',
                        type: 'alert',
                        time: '22:37',
                        day: '09',
                        month: '04',
                        year: '2017'
                    }
                ]
            }
        },
        computed: {},
        props: {},
        methods: {
            msgTypeToColor: function (type) {
                if (type === 'alert')
                    return 'red';
                else if (type === 'warn')
                    return 'amber';
                else if (type === 'info')
                    return 'white';
            }
        }
    }
</script>

<style scoped>
    .msg-mark.alert {
        float: right;
        color: rgba(244, 67, 54, 0.7);
    }

    .msg-mark.warn {
        float: right;
        color: rgba(255, 193, 7, 0.7);
    }

    .msg-mark.info {
        float: right;
        color: rgba(255, 255, 255, 0.7);
    }

    .time {
        vertical-align: super;
    }
</style>
