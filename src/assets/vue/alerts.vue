<template>
    <div class="page-content">
        <!--<f7-button @click="addRand">Add Rand  {{myLength}}</f7-button>-->
        <f7-timeline class="virtual-list">
        </f7-timeline>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                vList: null,
                messages: this.$myStore.state.messages
            }
        },
        props: ['filter'],
        watch: {
            filter: function (newFilter) {
                let filterIndexes = [];

                if (newFilter === 'all')
                    this.vList.resetFilter();
                else {
                    this.vList.items.forEach(function (item, ind) {
                        item.type === newFilter ? filterIndexes.push(ind) : null
                    });
                    this.vList.filterItems(filterIndexes);
                }
            },
            messages: function (newMsg) {
//                this.messages.forEach(function (val) {
//                    console.log(val.id + "  " + val.day + "-" + val.month + "-" + val.year + "  " + val.time);
//                });
                this.vList.replaceAllItems(this.messages);
            }
        },
        computed: {
            myLength() {
                return this.messages.length;
            }
        },
        methods: {
            onF7Init() {
                let self = this;

//                '{{#js_compare "this.from === @global.myNodeId"}}' +
//                '<span class="color-green">{{username}}</span>' +
//                '{{else}}<span>{{username}}</span>' +
//                '{{/js_compare}}' +

                this.vList = this.$f7.virtualList('.virtual-list', {
                    items: self.messages,
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
                    '<div class="timeline-item-title">{{username}}</div>' +
                    '<div class="timeline-item-subtitle">{{locationZone}}</div>' +
                    '<div class="timeline-item-text">{{locationExact.lon}}, {{locationExact.lat}}</div>' +
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
            getRandomMsg(i){
                let H = String(this.randomIntFromInterval(0, 23));
                let m = String(this.randomIntFromInterval(0, 59));
                let day = String(this.randomIntFromInterval(1, 15));
                H = H.length < 2 ? '0' + H : H;
                m = m.length < 2 ? '0' + m : m;
                day = day.length < 2 ? '0' + day : day;

                let types = ['alert', 'warn', 'info'];

                return {
                    id: i,
                    name: 'Username ' + i,
                    location: 'Location ' + i,
                    type: types[Math.floor(Math.random() * types.length)],
                    time: H + ':' + m,
                    day: day,
                    month: '05',
                    year: '2017'
                };
            },
            addRand() {
                this.$myStore.addMessage(this.getRandomMsg(this.messages.length + 1));

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
