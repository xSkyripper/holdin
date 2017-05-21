<template>
    <div class="page-content">
        <f7-button @click="addRand">Add Rand</f7-button>
        <f7-timeline class="virtual-list">
        </f7-timeline>
    </div>
</template>

<script>
    let timeout;
    export default {
        data() {
            return {
                vList: null,
                messages: this.msgGen(100),
                messages_old: [
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
                        day: '15',
                        month: '05',
                        year: '2017'
                    }
                ]
            }
        },
        watch: {
          messages_old: function(newMsg) {
              this.vList.update();
          }
        },
        computed: {
            sortedMsgs() {
                return this.messages_old.sort(function (obj1, obj2) {
                    let d1 = new Date(obj1.year, obj1.month, obj1.day, obj1.time.split(":")[0], obj1.time.split(":")[1]);
                    let d2 = new Date(obj2.year, obj2.month, obj2.day, obj2.time.split(":")[0], obj2.time.split(":")[1]);
                    return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
                });
            }
        },
        props: {},
        methods: {
            onF7Init() {
                this.vList = this.$f7.virtualList('.virtual-list', {
                    items: this.messages_old,
                    height: 170, // is this right ?
                    template: '<div class="timeline-item">' +
                    '<div class="timeline-item-date">' +
                    '{{day}} <small>{{month}}</small>' +
                    '</div>' +
                    '<div class="timeline-item-divider"></div>' +
                    '<div class="timeline-item-content">' +
                    '<div class="timeline-item-inner">' +
                    '<div class="timeline-item-time">' +
                    '<span class="time">{{time}}</span>' +
                    '{{#js_compare "this.type === \'alert\'"}}<i class="material-icons msg-mark alert">warning</i>{{/js_compare}}' +
                    '{{#js_compare "this.type === \'warn\'"}}<i class="material-icons msg-mark warn">error</i>{{/js_compare}}' +
                    '{{#js_compare "this.type === \'info\'"}}<i class="material-icons msg-mark info">info</i>{{/js_compare}}' +
                    '</div>' +
                    '<div class="timeline-item-title">{{name}}</div>' +
                    '<div class="timeline-item-subtitle">{{location}}</div>' +
                    '<div class="timeline-item-text">{{type}}</div>' +
                    '{{#js_compare "this.type === \'alert\'"}}' +
                    '<a href="/message/{{id}}" class="button color-red">View</a>' +
                    '{{/js_compare}}' +
                    '{{#js_compare "this.type === \'warn\'"}}' +
                    '<a href="/message/{{id}}" class="button color-amber">View</a>' +
                    '{{/js_compare}}' +
                    '{{#js_compare "this.type === \'info\'"}}' +
                    '<a href="/message/{{id}}" class="button color-white">View</a>' +
                    '{{/js_compare}}' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                });
            },
            msgTypeToColor(type) {
                if (type === 'alert')
                    return 'red';
                else if (type === 'warn')
                    return 'amber';
                else if (type === 'info')
                    return 'white';
            },
            randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            },
            msgGen(max) {
                let msgs = [];
                for (let i = 0; i < max; ++i) {
                    this.addRandomMsg(msgs, i);
                }
                return msgs;
            },
            addRandomMsg(msgs, i){
                let H = String(this.randomIntFromInterval(0, 23));
                let m = String(this.randomIntFromInterval(0, 59));
                let day = String(this.randomIntFromInterval(1, 15));
                H = H.length < 2 ? '0' + H : H;
                m = m.length < 2 ? '0' + m : m;
                day = day.length < 2 ? '0' + day : day;

                let types = ['alert', 'warn', 'info'];
                msgs.push({
                    id: i,
                    name: 'Username ' + i,
                    location: 'Location ' + i,
                    type: types[Math.floor(Math.random() * types.length)],
                    time: H + ':' + m,
                    day: day,
                    month: '05',
                    year: '2017'
                });
            },
            addRand() {
                console.log("msgs old len = " + this.messages_old.length);
                this.addRandomMsg(this.messages_old, this.messages_old.length + 1);
            }
        }
    }
</script>

<style>
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

    .timeline, .timeline > ul {
        padding: 0;
    }

    .timeline .timeline-item-content {
        width: calc(75% - 20px);
    }
</style>
